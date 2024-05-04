import { connectToDB } from "@/lib/database";
import AnalyzeText from "@/models/analyzedText";
import Article from "@/models/articles";
import mongoose from "mongoose";

export const POST = async (req, res) => {
  const { chatData, articleId } = await req.json();
  try {
    const article = await Article.findById(articleId);
    const chatId = chatData._id;
    // console.log(chatData, article);
    await AnalyzeText.findByIdAndDelete(chatId);
    await Article.updateOne(
      { _id: new mongoose.Types.ObjectId(articleId) },
      { $pull: { highlightedArea: new mongoose.Types.ObjectId(chatId) } }
    );

    return new Response("Chats deleted successfully", { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch response", { status: 500 });
  }
};
