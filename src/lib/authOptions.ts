import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { compare } from "bcrypt";
import { JWT } from "next-auth/jwt";
import { Session, Account, Profile } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

interface User {
  id: string;
  email: string;
  name: string;
  emailVerified?: Date | null;
}

interface CustomJWT extends JWT {
  id?: string;
}

interface CustomSession extends Session {
  user: {
    id: string;
    email: string;
    name: string;
    image?: string | null;
  };
}

const mongoAdapter = MongoDBAdapter(clientPromise) as Adapter;

export const authOptions: NextAuthOptions = {
  adapter: mongoAdapter,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const client = await clientPromise;
        const usersCollection = client
          .db("podcast_analytics")
          .collection("users");
        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        if (!user || !user.password) {
          return null;
        }
        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) {
          return null;
        }
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          emailVerified: null,
        } as AdapterUser;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Explicitly spread and add id
      session.user = {
        name: session.user?.name ?? undefined,
        email: session.user?.email ?? undefined,
        image: session.user?.image ?? undefined,
        id: token.id as string,
      };
      return session;
    },
  },
};
