from datasets import load_dataset

# load the SAMSum dataset ( which is best for conversational meeting summaries)

dataset = load_dataset("samsum", trust_remote_code=True)

#Test dataset
print(dataset)

#Print the first dataset
print("Sample data:", dataset["train"][0])

