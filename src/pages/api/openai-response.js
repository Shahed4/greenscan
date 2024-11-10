import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { prompt } = req.body;

  try {
    // Use the chat model with the chat/completions endpoint
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // or "gpt-4" if you have access
      messages: [
        { role: "user", content: prompt },
      ],
      max_tokens: 2000,
    });
    res.status(200).json({ text: completion.choices[0].message.content.trim() });
  } catch (error) {
    console.error("Error with OpenAI API:", error.message || error);
    res.status(500).json({
      message: "Error with OpenAI API",
      error: error.message || "Unknown error",
    });
  }
}
