import User from "@/models/User";
import { connection } from "@/utils/db";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      Credential: {},

      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connection();
          const user = await User.findOne({ email });

          if (!user) {
            throw new Error("User not exist");
            // return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            throw new Error("Password wrong");
            // return null;
          }

          return user;
        } catch (error) {
          console.error(error.message);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
      // console.log("jwt callback", { token, user, session });

      if (user) {
        return {
          ...token,
          id: user.id,
          dept: user.dept,
          scholar: user.scholar,
          scopus: user.scopus,
          orcid: user.orcid,
          imgUrl: user.imgUrl,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      // console.log("jwt callback", { session, token, user });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          dept: token.dept,
          scholar: token.scholar,
          scopus: token.scopus,
          orcid: token.orcid,
          imgUrl: token.imgUrl,
        },
      };
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
