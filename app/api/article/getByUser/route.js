import { connectToDB } from "@/lib/database";
import Article from "@/models/articles";
import User from "@/models/user";

export const POST = async (req, res) => {
  const { id } = await req.json();
  try {
    await connectToDB();
    const user = await User.findById(id).populate("UrlIds");
    return new Response(JSON.stringify({ user }), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch article", { status: 500 });
  }
};
