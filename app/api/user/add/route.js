import { connectToDB } from "@/lib/database";
import User from "@/models/user";
import jwt from "jsonwebtoken";

export const POST = async (req, res) => {
  const { username, email, password } = await req.json();
  try {
    await connectToDB();
    const findUser = await User.findOne({ email: email });
    if (findUser) {
      console.log("found");
      return new Response("User already exists", { status: 400 });
    }
    const newUser = new User({
      username: username.toLowerCase().replace(" ", ""),
      email: email,
      password: password,
    });
    // console.log("uygviuyviuyiv");
    await newUser.save();
    const token = jwt.sign(
      {
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          url_id: newUser.UrlIds,
        },
      },
      process.env.JWT_SECRET,
      { algorithm: "HS256", expiresIn: "24h" }
    );
    return new Response(JSON.stringify({ token: token }), { status: 201 });
    // return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create user/User already exist", {
      status: 500,
    });
  }
};
