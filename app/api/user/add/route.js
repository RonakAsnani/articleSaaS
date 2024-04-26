import { connectToDB } from "@/lib/database";
import User from "@/models/user";

export const POST = async (req, res) => {
  const { username, email, password } = await req.json();
  try {
    await connectToDB();
    // const findUser = User.findOne({ email: email });
    // if (findUser) {
    //   return new Response("User already exists", { status: 201 });
    // }
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
    return new Response({ token }, { status: 201 });
    // return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create user", { status: 500 });
  }
};
