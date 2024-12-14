import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "email",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log({ credentials, req });
        if (!credentials) {
          throw new Error("Missing credentials");
        }
        if (!credentials.email) {
          throw new Error("Missing email");
        }

        if (!credentials.password) {
          throw new Error("Missing password");
        }

        return { id: 1, name: "Jhon Doe" };

        const userRequest = await fetch("http://localhost:8080/api/auth/login");

        if (!userRequest.ok) {
          return null;
        }

        return userRequest.json();
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 30, // 30 seconds
  },
  session: {
    strategy: "jwt",
    maxAge: 30, // 30 segundos
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/error",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      if (token?.id_token) {
        session.user.id_token = token.id_token as string;
      }

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account?.id_token) {
        token.id_token = account.id_token;
      }
      return token;
    },
  },
};
