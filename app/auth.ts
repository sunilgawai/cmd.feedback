import NextAuth, {
  NextAuthOptions,
  DefaultSession,
  getServerSession,
} from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/emails";
import MagicLinkEmail from "@/emails/magic-link-email";
import { login } from "@/app/actions/auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      role?: string;
      phoneNumber?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
    phoneNumber?: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        try {
          const user = await login({
            email: credentials.email,
            password: credentials.password,
          });
          return user;
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error("Wrong Credentials");
          return null;
        }
      },
    }),
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
    signIn: "/auth",
    verifyRequest: "/verify-request",
    signOut: "/app/logout",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.phoneNumber = user.phoneNumber;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
        session.user.phoneNumber = token.phoneNumber as string | undefined;
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
