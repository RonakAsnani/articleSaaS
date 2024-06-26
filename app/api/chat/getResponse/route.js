import { connectToDB } from "@/lib/database";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const POST = async (req, res) => {
  const { message, context } = await req.json();
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `${message}. Answer the above question with text reference on : ${context}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return new Response(text, { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch response", { status: 500 });
  }
};
