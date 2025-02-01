from datasets import load_dataset
from transformers import BartTokenizer, BartForConditionalGeneration, TrainingArguments, Trainer
import torch

# Load SAMSum dataset
dataset = load_dataset("samsum", trust_remote_code=True)

# Set device
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"🔥 Using device: {device}")

# Optimize GPU settings
torch.backends.cudnn.benchmark = True
torch.backends.cuda.matmul.allow_tf32 = True

# Load BART tokenizer
tokenizer = BartTokenizer.from_pretrained("facebook/bart-large-cnn")

# Define max input & output length
MAX_INPUT = 1024
MAX_TARGET = 128

# Tokenization function
def preprocess_data(data):
    model_inputs = tokenizer(data["dialogue"], max_length=MAX_INPUT, truncation=True, padding="max_length")
    with tokenizer.as_target_tokenizer():
        labels = tokenizer(data["summary"], max_length=MAX_TARGET, truncation=True, padding="max_length")
    
    model_inputs["labels"] = labels["input_ids"]
    return model_inputs

# Apply tokenization
tokenized_dataset = dataset.map(preprocess_data, batched=True)

# Load pre-trained BART model
model = BartForConditionalGeneration.from_pretrained("facebook/bart-large-cnn")
model.to(device)

# Define training arguments (Optimized)
training_args = TrainingArguments(
    output_dir="./output",
    eval_strategy="epoch",
    save_strategy="epoch",
    per_device_train_batch_size=16,  # 🚀 Increase for GPU acceleration
    per_device_eval_batch_size=16,
    auto_find_batch_size=True,  # 🚀 Automatically detects best batch size
    num_train_epochs=3,  # 🚀 Reduce for speed
    gradient_accumulation_steps=2,  # 🚀 Simulates larger batch sizes
    learning_rate=5e-5,
    weight_decay=0.01,
    logging_dir="./logs",
    logging_steps=50,  # 🚀 More frequent logging
    fp16=True,  # 🚀 Mixed precision for speed
    gradient_checkpointing=True,  # 🚀 Reduce VRAM usage
)

# Define trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset["train"],
    eval_dataset=tokenized_dataset["validation"],
)

# Start fine-tuning
trainer.train()
