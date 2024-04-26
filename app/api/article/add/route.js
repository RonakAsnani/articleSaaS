import { connectToDB } from "@/lib/database";
import Article from "@/models/articles";
import User from "@/models/user";

export const POST = async (req, res) => {
  const { url, title, user } = await req.json();
  try {
    await connectToDB();
    const newArticle = new Article({
      url: url,
      title: title,
      creator: user.id,
    });
    const userExisting = await User.findById(user.id);

    await newArticle.save();
    userExisting.UrlIds.push(newArticle._id);
    await userExisting.save();
    return new Response(JSON.stringify({ newArticle }), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create user", { status: 500 });
  }
};
