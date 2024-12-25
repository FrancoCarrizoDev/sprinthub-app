import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { oAuthUserDto } from "@/app/types/oAuthUserDto";

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const loginResponse = await fetch(
          "http://localhost:8080/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        if (!loginResponse.ok) {
          return null;
        }

        const user = await loginResponse.json();

        if (!user) {
          return null;
        }

        console.log({ user });

        return {
          token: user.token,
          email: credentials.email,
          id: "1",
          image: "",
          name: "John Doe",
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.SECRET,
  pages: {
    signIn: "/auth/login",
    signOut: "/logout",
    error: "/error",
  },
  events: {},
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log({ user, account, profile, email, credentials });

      if (credentials) {
        return true;
      }

      if (!user.email || !user.id || !user.name || !account?.id_token) {
        return false;
      }

      console.log({ user, account });

      const oauthUser: oAuthUserDto = {
        email: user.email,
        externalId: user.id,
        firstName: user.name,
        lastName: undefined,
      };

      const userRequest = await fetch(
        "http://localhost:8080/api/auth/signing",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${account.id_token}`,
          },
          body: JSON.stringify(oauthUser),
        }
      );

      if (!userRequest.ok) {
        return false;
      }

      return true;
    },
    async session({ session, user, token }) {
      // console.log({ session, user, token });
      if (token?.id_token) {
        session.user.id_token = token.id_token as string;
      }

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log({ token, user, account, profile, isNewUser });
      if (account?.id_token) {
        token.id_token = account.id_token;
        token.sub = account.sub as string;
      }
      return { ...token, ...user };
    },
  },
};
