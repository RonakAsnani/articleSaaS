import { connectToDB } from "@/lib/database";
import Article from "@/models/articles";
import User from "@/models/user";

export const POST = async (req, res) => {
  const { id } = await req.json();
  try {
    await connectToDB();
    const article = await Article.findById(id).populate("highlightedArea");
    return new Response(JSON.stringify({ article }), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch article", { status: 500 });
  }
};
