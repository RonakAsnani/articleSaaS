import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;

        // const user = await User.findOne({
        //   email: email,
        //   passowrd: password,
        // });
        console.log(email, password);

        if (email == "ronak@gmail.com" && password == "1234") {
          // Any object returned will be saved in `user` property of the JWT
          return {
            user: "user",
          };
        } else {
          return Response.json("User does not exist", { status: 400 });
        }
      },
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/authuser",
  },
  secret: process.env.NEXTAUTH_SECRET,
  // callbacks: {
  //   // jwt: async ({ token, user }) => {
  //   //   if (user) {
  //   //     token.id = user.id;
  //   //   }
  //   //   return token;
  //   // },
  //   // session: async ({ session, token }) => {
  //   //   session.user = token.user;
  //   //   return session;
  //   // },
  // },
});

export { handler as GET, handler as POST };
