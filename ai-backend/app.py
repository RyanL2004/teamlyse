import warnings
from flask import Flask, request, jsonify
import whisper
import os
from werkzeug.utils import secure_filename
from transformers import pipeline 
from transformers import BartTokenizer, BartForConditionalGeneration
from dotenv import load_dotenv
from flask_caching import Cache

app = Flask(__name__)
cache = Cache(app, config={"CACHE_TYPE": "simple"})  # Simple in-memory cache
load_dotenv()

# Load Hugging Face model repo from .env or use default
MODEL_DIR = os.getenv("HF_MODEL_REPO", "RayanLouahche/MeetPet")

warnings.filterwarnings("ignore", category=FutureWarning)

# Load Whisper for transcription
whisper_model = whisper.load_model("base")

# Load the fine-tuned summarization model (Cached for efficiency)
@cache.cached(timeout=3600)
def load_model():
    tokenizer = BartTokenizer.from_pretrained(MODEL_DIR)
    model = BartForConditionalGeneration.from_pretrained(MODEL_DIR)
    summarizer = pipeline("summarization", model=model, tokenizer=tokenizer)
    return model, tokenizer, summarizer

model, tokenizer, summarizer = load_model()

def chunk_text(text, chunk_size=512):
    """Splits large transcriptions into smaller chunks for summarization."""
    words = text.split()
    return [" ".join(words[i:i + chunk_size]) for i in range(0, len(words), chunk_size)]

@app.route('/transcription', methods=['POST'])
def transcribe():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    audio_file = request.files['file']

    try:
        # Save the audio file temporarily
        filename = secure_filename(audio_file.filename)
        audio_path = os.path.join("./", filename)
        audio_file.save(audio_path)

        print(f"File saved to: {audio_path}")  # Debugging

        # Transcribe the audio using Whisper
        result = whisper_model.transcribe(audio_path)
        transcription_text = result['text']

        # Clean up the temporary file
        os.remove(audio_path)

        # Summarize large transcriptions in chunks
        text_chunks = chunk_text(transcription_text)
        summaries = [summarizer(chunk, max_length=200, min_length=100, do_sample=False)[0]['summary_text'] for chunk in text_chunks]
        
        # Combine summaries
        final_summary = " ".join(summaries)

        return jsonify({
            "transcription": transcription_text,
            "summary": final_summary
        })
    except Exception as e:
        import traceback
        traceback.print_exc()  # Print the full stack trace for debugging
        return jsonify({"error": str(e)}), 500

@app.route('/summarization', methods=['POST'])
def summarize():
    if not request.json or 'text' not in request.json:
        return jsonify({"error": "No text provided"}), 400
    
    #Extract and format the conversation
    if isinstance(request.json['text'], list): #if its a structured list for ex
        text = "\n".join([f"{item['speaker']}: {item['dialogue']}" for item in request.json['text']])
    else:
        text = request.json['text']

    try:
        # Chunk large transcriptions
        text_chunks = chunk_text(text)

        # Generate structured summaries for each chunk 
        summaries = [summarizer(chunk, max_length=200, min_length=100, do_sample=False)[0]['summary_text'] for chunk in text_chunks]
        final_summary = "\n- ".join(summaries)

        return jsonify({
            "summary": final_summary
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)


