from huggingface_hub import upload_folder

# Define your Hugging Face model repository
repo_id = "RayanLouahche/MeetPet"  # Replace with your actual repo name

# Path to your fine-tuned model directory
model_path = "./model-training/fine_tuned_model"

# Upload the entire model folder to Hugging Face
upload_folder(
    folder_path=model_path,
    repo_id=repo_id,
    repo_type="model"
)

print("✅ Model successfully uploaded to Hugging Face Hub!")
