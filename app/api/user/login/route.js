import { connectToDB } from "@/lib/database";
import User from "@/models/user";
import jwt from "jsonwebtoken";

export const POST = async (req, res) => {
  const { email, password } = await req.json();
  try {
    await connectToDB();
    // const findUser = User.findOne({ email: email });
    // if (findUser) {
    //   return new Response("User already exists", { status: 201 });
    // }
    const user = await User.findOne({
      email: email,
      password: password,
    });

    if (!user) {
      return new Response("Incorrect username/password", { status: 400 });
    }
    const token = jwt.sign(
      {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          url_id: user.UrlIds,
        },
      },
      process.env.JWT_SECRET,
      { algorithm: "HS256", expiresIn: "24h" }
    );
    console.log(token);
    return new Response(JSON.stringify({ token: token }), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to login", { status: 500 });
  }
};
