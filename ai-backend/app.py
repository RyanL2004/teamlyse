import warnings
from flask import Flask, request, jsonify
import whisper
import os
from werkzeug.utils import secure_filename


app = Flask(__name__)

warnings.filterwarnings("ignore", category=FutureWarning)

# Load the Whisper Model
model = whisper.load_model("base")

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

        # Clean up the temporary file
        os.remove(audio_path)

        return jsonify({"transcription": result['text']})
    except Exception as e:
        import traceback
        traceback.print_exc()  # Print the full stack trace for debugging
        return jsonify({"error": str(e)}), 500

    
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
