import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { DefaultSession, Session, User } from "next-auth";

declare module 'next-auth' {
  interface User {
    id: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<User | null> {
        console.log(credentials)
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        })
        console.log(user)
        if (!user) {
          return null;
        }
        const passwordMatch = await validatePassword(credentials.password, user?.password);
        console.log(passwordMatch)
        if (!passwordMatch) {
          return null;
        }
        console.log(user)
        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "",
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    signUp: "/signup",
  },
};

export const validatePassword = async (
  password: string,
  hashedPassword: string
) => {
  const comparePassword = await bcrypt.compare(password, hashedPassword);
  return comparePassword;
};
