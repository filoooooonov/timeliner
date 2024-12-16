import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
import User from "@/models/user";
import { connectMongoDB } from "@/lib/mongo";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import { OAuth2Client } from "google-auth-library";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
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
        token.id = user.id; // Use MongoDB user ID
      }
      return token;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        await connectMongoDB();
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          const newUser = await User.create({
            name: user.name,
            email: user.email,
          });
          user.id = newUser._id; // Assign new user's MongoDB ID to user object
        } else {
          user.id = existingUser._id; // Assign existing user's MongoDB ID to user object
          user.name = existingUser.name;
        }
      }
      return true;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
