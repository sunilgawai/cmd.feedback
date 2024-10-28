import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { sendEmail } from "@/lib/emails";
import MagicLinkEmail from "@/emails/magic-link-email";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      stripeCustomerId?: string | null;
      subscriptionStatus?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    stripeCustomerId?: string | null;
    subscriptionStatus?: string | null;
  }
}

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
  ],
  pages: {
    signIn: "/login",
    verifyRequest: "/verify-request",
  },
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id;
        session.user.stripeCustomerId = user.stripeCustomerId;
        session.user.subscriptionStatus = user.subscriptionStatus;
      }
      return session;
    },
  },
};

export const auth = () => getServerSession(authOptions);

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
