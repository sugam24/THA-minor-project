from transformers import pipeline, AutoTokenizer

def get_model_response(user_input):
    # Load the tokenizer and model
    model_name = "pranilllllll/result"
    tokenizer = AutoTokenizer.from_pretrained(model_name, subfolder="model")

    # Create a text generation pipeline
    text_generator = pipeline(
        "text-generation",
        model=model_name,
        tokenizer=tokenizer,
        model_kwargs={"subfolder": "model"}
    )


    while True:
        if user_input.lower() in ["bye"]:
            print("Bot: Goodbye!")
            break

        response = text_generator(
            user_input,
            max_length=200,  # Adjust max_length for longer responses
            num_return_sequences=1,
            do_sample=True,
            temperature=0.7,
            truncation = True,
        )

        # Extract and print the response text
        suggestion = response[0]['generated_text']
        suggestion = suggestion[len(user_input):].strip()
        print(f"Bot: {suggestion}")
        return suggestion