import NextAuth from "next-auth";
import bcryptjs from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "../../../mongodb/connection";
import User from "../../../mongodb/schema";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      id: "credentials",
      name: "Credentials",
      authorize: async (credentials) => {
        // Connect to database
        await db.connect();

        //check db for email address
        const user = await User.findOne({
          email: credentials.email,
        });
        await db.disconnect();

        if (user && bcryptjs.compareSync(credentials.password, user.password)) {
          return {
            // Get all the needed information
            id: user._id,
            email: user.email,
            image: "",
            name: user.fisrtName,
          };
        }
        throw new Error("Invalid Email or Password");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token.id = user._id;
      if (user?.firstName) token.name = user.firstName;
      if (user?.email) token.email = user.email;
      return token;
    },

    async session({ session, token }) {
      if (token?.id) session.user.id = token.id;
      if (token?.name) session.user.name = token.name;
      if (token?.email) session.user.email = token.email;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  secret: "3GccdBDyURscmdRUD1iarM2sHK3y12+nqE6GA1tfCGk=$",
});
