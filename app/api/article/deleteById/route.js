import { connectToDB } from "@/lib/database";
import Article from "@/models/articles";
import User from "@/models/user";
import mongoose from "mongoose";

export const POST = async (req, res) => {
  const { articleId, userId } = await req.json();
  try {
    await connectToDB();
    await User.updateOne(
      { _id: new mongoose.Types.ObjectId(userId) },
      { $pull: { UrlIds: new mongoose.Types.ObjectId(articleId) } }
    );
    await Article.findByIdAndDelete(articleId);
    return new Response("Session deleted successfully", { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to delete session", { status: 500 });
  }
};
