// @ts-nocheck
import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { sendEmail } from "@/lib/emails";
import MagicLinkEmail from "@/emails/magic-link-email";
import { User } from "next-auth";
import { agent } from "@prisma/client";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string | number;
      username: string;
      phone: string;
      role: string;
      stripeCustomerId?: string | null;
      subscriptionStatus?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    username: string;
    phone: string;
    role: string;
    stripeCustomerId?: string | null;
    subscriptionStatus?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    username: string;
    phone: string;
    role: string;
  }
}

const authorize = async (
  credentials: Record<string, string> | undefined,
  _: unknown
): Promise<agent | null> => {
  if (!credentials) return null;

  const { phone, password } = credentials;
  if (!phone || !password) return null;

  // Fetch the user from the database
  const userFromDB = await prisma.agent.findUnique({
    where: {
      phone: phone,
    },
  }); // Replace with your DB logic

  if (!userFromDB) return null;

  // Validate password (add your password-checking logic here)
  if (userFromDB.password !== password) return null;

  return userFromDB;
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({ identifier: email, url }) => {
        await sendEmail({
          to: email,
          subject: "Sign in to Your Account",
          template: MagicLinkEmail,
          props: {
            loginUrl: url,
            email,
          },
        });
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {
        phone: {
          label: "phone",
          type: "text",
          placeholder: "phone",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: {
            phoneNumber: credentials?.phone,
          },
        });

        if (!user) {
          return null;
        }
        // if (email === user.email && password === user?.password) {
        //   return user;
        // } else {
        //   return null;
        // }

        // const hashedPassword = user.password;

        // Compare the plain-text password with the hashed password
        // const passwordMatch = await bcrypt.compare(password, hashedPassword);

        return user;
        // if (user?.password === credentials?.password) {
        //   return user;
        // } else {
        //   return null;
        // }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    verifyRequest: "/verify-request",
  },
  callbacks: {
    // session: async ({ session, user, token }) => {
    //   console.table({ session, user });
    //   if (session?.user && user?.id) {
    //     session.user.id = user.id;
    //     session.user.phone = user.phone;
    //     session.user.role = user.role;
    //     session.user.stripeCustomerId = user?.stripeCustomerId;
    //     session.user.subscriptionStatus = user?.subscriptionStatus;
    //   }
    //   return session;
    // },
    jwt: async ({ token, user }) => {
      if (user) {
        token.userId = user.id;
        token.username = user.username;
        token.phone = user.phone;
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.userId;
        session.user.username = token.username; // Map correctly from JWT
        session.user.phone = token.phone;
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export const auth = () => getServerSession(authOptions);

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
