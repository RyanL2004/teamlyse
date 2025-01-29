import warnings
from flask import Flask, request, jsonify
import whisper
import os
from werkzeug.utils import secure_filename
from transformers import pipeline 


app = Flask(__name__)

warnings.filterwarnings("ignore", category=FutureWarning)

# Load the Whisper Model
model = whisper.load_model("base")
summarizer = pipeline("summarization", model = "Salesforce/bart-large-xsum-samsum")

def chunk_text(text,chunk_size=512):
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

        # Transcribe the audio
        result = model.transcribe(audio_path)
        transcription_text = result['text']

        # Clean up the temporary file
        os.remove(audio_path)

        #Summarise large trasncriptions in chunks
        text_chunks = chunk_text(transcription_text)
        summaries = [summarizer(chunk, max_length=200, min_length=60, do_sample=False)[0]['summary_text'] for chunk in text_chunks]
        #Combine summaries
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
    
    text = request.json['text']

    try:
        #Chunk large transcriptions
        text_chunks = chunk_text(text)

        #Generate structured summaries for each chunk 
        summaries = [summarizer(chunk, max_length=200, min_length=100, do_sample=False)[0]['summary_text'] for chunk in text_chunks]
        final_summary = " ".join(summaries)

        return jsonify({
            "summary": final_summary})
    except Exception as e:
        return jsonify({"error": str(e)}),500
    
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
