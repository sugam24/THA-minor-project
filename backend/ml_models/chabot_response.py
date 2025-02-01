from transformers import pipeline, AutoTokenizer


def get_model_response(user_input):
    print(type(user_input))
    print(len(user_input))

    # Load the tokenizer and model
    model_name = "Pranilllllll/finetuned-gpt2-model-124M"
    tokenizer = AutoTokenizer.from_pretrained(model_name)

    # Create a text generation pipeline
    text_generator = pipeline(
        "text-generation",
        model=model_name,
        tokenizer=tokenizer,
    )

    while True:
        if user_input.lower() in ["bye"]:
            print("Bot: Goodbye!")
            break

        response = text_generator(
            user_input,
            max_length=100,  # Generate enough text to capture two full stops
            num_return_sequences=1,
            do_sample=True,
            temperature=0.7,
            truncation=True,
        )

        # Extract generated text
        suggestion = response[0]["generated_text"]

        # Remove user input from generated text
        if suggestion.startswith(user_input):
            suggestion = suggestion[len(user_input) :].strip()

        # Stop at the second full stop
        dot_count = 0
        stop_index = -1
        for i, char in enumerate(suggestion):
            if char == ".":
                dot_count += 1
                if dot_count == 2:
                    stop_index = i + 1  # Include the second full stop
                    break

        if stop_index != -1:
            suggestion = suggestion[:stop_index]  # Keep text up to the second full stop

        print(f"Bot: {suggestion}")
        return suggestion


# Example usage
get_model_response("Tell me about AI")


# from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
# from transformers import AutoConfig

# def get_model_response(user_input):

#     model_name = "Pranilllllll/finetuned-gpt2-model-124M"

#     tokenizer = AutoTokenizer.from_pretrained(model_name)

#     config = AutoConfig.from_pretrained(model_name)

#     # Create a text generation pipeline
#     text_generator = pipeline("text-generation", model=model_name, tokenizer=tokenizer)

#     while True:
#         user_input = input("You: ")
#         if user_input.lower() in ["exit", "quit"]:
#             print("Bot: Goodbye!")
#             break

#         inputs = tokenizer(user_input, return_tensors='pt', padding=True, truncation=True)

#         attention_mask = inputs['attention_mask']

#         response = text_generator(
#             user_input,
#             max_length=200,
#             num_return_sequences=1,
#             do_sample=True,
#             temperature=0.7,
#             truncation=False,
#         )

#         suggestion = response[0]['generated_text']
#         suggestion = suggestion[len(user_input):].strip()
#         print(f"Bot: {suggestion}")
#         return suggestion
