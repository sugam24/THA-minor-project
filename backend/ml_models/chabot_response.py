from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from transformers import AutoConfig


def get_model_response(user_input):

    model_name = "Pranilllllll/finetuned_gpt2_45krows_10epochs"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    config = AutoConfig.from_pretrained(model_name)

    text_generator = pipeline("text-generation", model=model_name, tokenizer=tokenizer)

    while True:
        # user_input = input("You: ") 
        if user_input.lower() in ["exit", "quit"]:
            print("Bot: Goodbye!")
            break

        inputs = tokenizer(user_input, return_tensors='pt', padding=True, truncation=True)

        attention_mask = inputs['attention_mask']

        response = text_generator(
            user_input,
            max_length=200,
            num_return_sequences=1,
            do_sample=True,
            temperature=0.7,
            truncation=False,
        )

        suggestion = response[0]['generated_text']
        suggestion = suggestion[len(user_input):].strip()
        for i, char in enumerate(suggestion):
            if char == ".":
                final_suggestion = suggestion[i+1:].strip()
                break
        print(f"Bot: {final_suggestion}")
        return final_suggestion
