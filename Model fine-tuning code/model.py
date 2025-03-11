from datasets import load_dataset
from transformers import AutoTokenizer, Trainer, TrainingArguments, GPT2LMHeadModel
from datasets import concatenate_datasets
import os
import torch

# Clear GPU cache to free up memory and improve performance
torch.cuda.empty_cache()
torch.cuda.ipc_collect()

# Load various mental health-related datasets from Hugging Face
dataset_1 = load_dataset("marmikpandya/mental-health")
dataset_2 = load_dataset("fadodr/mental_health_therapy")
dataset_3 = load_dataset("Amod/mental_health_counseling_conversations")
dataset_4 = load_dataset("jkhedri/psychology-dataset")
dataset_5 = load_dataset("samhog/psychology-6k")
dataset_6 = load_dataset("RAJJ18/mental_health_dataset")

# Shuffle and select a subset of dataset_6 for training (3000 samples)
dataset_6_selected = dataset_6["train"].shuffle(seed=42).select(range(3000))

# Standardize column names across datasets for consistency
dataset_1 = dataset_1.rename_columns({"input": "input", "output": "output"})
dataset_2 = dataset_2.rename_columns({"input": "input", "output": "output"})
dataset_3 = dataset_3.rename_columns({"Context": "input", "Response": "output"})
dataset_4 = dataset_4.rename_columns({"question": "input", "response_j": "output"})
dataset_5 = dataset_5.rename_columns({"input": "input", "output": "output"})
dataset_6_selected = dataset_6_selected.rename_columns({"input": "input", "output": "output"})

# Keep only relevant columns (input and output) for model training
dataset_1 = dataset_1.select_columns(["input", "output"])
dataset_2 = dataset_2.select_columns(["input", "output"])
dataset_3 = dataset_3.select_columns(["input", "output"])
dataset_4 = dataset_4.select_columns(["input", "output"])
dataset_5 = dataset_5.select_columns(["input", "output"])
dataset_6_selected = dataset_6_selected.select_columns(["input", "output"])

# Check for GPU availability and display device details
for i in range(torch.cuda.device_count()):
    print(f"GPU {i}: {torch.cuda.get_device_name(i)}")
print("Current CUDA Device:", torch.cuda.current_device())

cuda_available = torch.cuda.is_available()
print(f"CUDA Available: {cuda_available}")

# Set the device to GPU if available; otherwise, use CPU
device = torch.device("cuda" if cuda_available else "cpu")
print(f"Using device: {device}")

# Additional GPU information
if cuda_available:
    current_device = torch.cuda.current_device()
    device_name = torch.cuda.get_device_name(current_device)
    print(f"Current CUDA device: {device_name}")
else:
    print("Using CPU instead.")

# Load the GPT-2 tokenizer
tokenizer = AutoTokenizer.from_pretrained('gpt2')
tokenizer.pad_token = tokenizer.eos_token  # Set padding token to EOS token for compatibility

# Define a function to tokenize input-output pairs
def tokenize_function(examples):
    text = [f"{input} {output}" for input, output in zip(examples['input'], examples['output'])]
    inputs = tokenizer(text, truncation=True, padding='max_length', max_length=128)
    inputs['labels'] = inputs['input_ids'].copy()  # Use input tokens as labels for training
    return inputs

# Apply tokenization to all datasets
tokenized_dataset_1 = dataset_1.map(tokenize_function, batched=True)
tokenized_dataset_2 = dataset_2.map(tokenize_function, batched=True)
tokenized_dataset_3 = dataset_3.map(tokenize_function, batched=True)
tokenized_dataset_4 = dataset_4.map(tokenize_function, batched=True)
tokenized_dataset_5 = dataset_5.map(tokenize_function, batched=True)
tokenized_dataset_6 = dataset_6_selected.map(tokenize_function, batched=True)

# Combine all tokenized datasets into a single dataset
combined_tokenized_dataset = concatenate_datasets([
    tokenized_dataset_1["train"],
    tokenized_dataset_2["train"],
    tokenized_dataset_3["train"],
    tokenized_dataset_4["train"],
    tokenized_dataset_5["train"],
    tokenized_dataset_6
])

# Display the total number of training samples
print(len(combined_tokenized_dataset))

# Load the GPT-2 language model
model = GPT2LMHeadModel.from_pretrained('gpt2')
model.to(device)  # Move the model to the selected device (GPU/CPU)

# Define training parameters
training_args = TrainingArguments(
    output_dir="/home/nil/python_projects/gpt2_finetuned_45k_10epochs/results",  # Directory for saving models
    eval_strategy="steps",  # Perform evaluation at specific steps
    save_steps=2500,        # Save model checkpoint every 2500 steps
    eval_steps=2500,        # Evaluate model every 2500 steps
    num_train_epochs=12,    # Train for 12 epochs
    per_device_train_batch_size=4,  # Training batch size per device
    per_device_eval_batch_size=4,  # Evaluation batch size per device
    warmup_steps=10000,     # Number of warmup steps for learning rate scheduling
    weight_decay=0.01,      # Regularization parameter to prevent overfitting
    logging_dir="/home/nil/python_projects/gpt2_finetuned_45k_10epochs/logs",  # Directory for logging
    logging_strategy="steps",  # Log progress every 'logging_steps'
    logging_steps=50,  # Log every 50 steps
    learning_rate=3e-5,  # Initial learning rate
    report_to=["tensorboard"],  # Log training metrics to TensorBoard
    fp16=True,  # Enable mixed precision training for efficiency
    save_total_limit=8,  # Keep only the latest 8 saved checkpoints
    load_best_model_at_end=True,  # Load the best model after training completes
    metric_for_best_model="loss",  # Use loss to determine the best model
    greater_is_better=False,  # Lower loss is considered better
    log_level="info"  # Logging level
)

# Initialize the Trainer with the model, training arguments, datasets, and tokenizer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=combined_tokenized_dataset,  # Use combined dataset for training
    eval_dataset=tokenized_dataset_2["test"],  # Use dataset_2's test set for evaluation
    tokenizer=tokenizer,  # Provide the tokenizer
)

# Start training, resuming from a saved checkpoint
trainer.train(resume_from_checkpoint='/home/nil/python_projects/gpt2_finetuned_45k_10epochs/results/checkpoint-20000')

# Save the trained model and tokenizer
model_output_dir = '/home/nil/python_projects/gpt2_finetuned_45k_10epochs/results/model'
os.makedirs(model_output_dir, exist_ok=True)  # Create the directory if it doesn't exist
model.save_pretrained(model_output_dir)  # Save the fine-tuned model
tokenizer.save_pretrained(model_output_dir)  # Save the tokenizer
