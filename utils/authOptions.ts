import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
import { User as AuthUser, Account } from "next-auth";
import User from "@/models/user";
import { connectMongoDB } from "@/lib/mongo";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await connectMongoDB();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      console.log("TOKEN:", token);
      session.user.id = token.id as string; // Cast token.id to string
      return session;
    },
    async jwt({ token, user }) {
      // Attach user ID to token object
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
