/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { compare } from "bcrypt";
import { JWT } from "next-auth/jwt";

interface CustomJWT extends JWT {
  id?: string;
}

interface CustomSession extends Session {
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const authOptions: any = {
  adapter: MongoDBAdapter(clientPromise),
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
        };
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
    // async jwt({ token, user }) {
    //   if (user) {
    //     token.id = user.id
    //   }
    //   return token
    // },
    async jwt({ token, user }: { token: CustomJWT; user?: any }) {
      if (user) {
        token.id = user.id; // Add the user id to the token
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: CustomSession;
      token: CustomJWT;
    }) {
      if (session.user) {
        session.user.id = token.id as string; // Add the token id to the session
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
