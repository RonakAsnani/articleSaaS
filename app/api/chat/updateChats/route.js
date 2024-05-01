import { connectToDB } from "@/lib/database";
import AnalyzeText from "@/models/analyzedText";
import Article from "@/models/articles";

export const POST = async (req, res) => {
  const { chatData, articleId } = await req.json();
  try {
    const article = await Article.findById(articleId);
    const chatId = chatData.id;
    console.log(chatData.chats, article);
    if (chatId == -1) {
      const newAnalyzedText = new AnalyzeText({
        text: chatData.text,
        xpath: chatData.xpath,
        chats: chatData.chats,
      });
      await newAnalyzedText.save();
      article.highlightedArea.push(newAnalyzedText._id);
      article.save();
    }

    return new Response("Chats saved successfully", { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch response", { status: 500 });
  }
};
