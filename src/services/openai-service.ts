import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: "sk-proj-VldoAeNclNF7sENxEFg0T3BlbkFJvlQBk0YYYKYYIs6J7wYe", dangerouslyAllowBrowser: true});

export async function generateVariations(originalPhrase: string) {
  try {
    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct", 
      prompt: `Original phrase: ${originalPhrase}\n\nVariations:\n- `,
      max_tokens: 50,
      n: 5,
      stop: ["-\n"],
    });

    return completion.choices[0].text
      .split("\n")
      .filter(variation => variation !== "-")
      .map(variation => variation.trim());
  } catch (error) {
    console.error("Error generating variations:", error);
    return [];
  }
}



