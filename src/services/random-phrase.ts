

import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: "sk-proj-VldoAeNclNF7sENxEFg0T3BlbkFJvlQBk0YYYKYYIs6J7wYe",  dangerouslyAllowBrowser: true });

export async function generateRandomPhrases(count = 10) {
  try {
    const completion = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
      prompt: "Generate 10 random phrases:\n- ",
      max_tokens: 50,
      n: count,
      stop: ["-\n"],
    });

    return completion.choices[0].text
      .split("\n")
      .filter(phrase => phrase !== "-")
      .map(phrase => phrase.trim());
  } catch (error) {
    console.error("Error generating random phrases:", error);
    return [];
  }
}