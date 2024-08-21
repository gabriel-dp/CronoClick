import { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				username: { label: "username", type: "text" },
				password: { label: "password", type: "password" }
			},

			async authorize(credentials) {
				if (!credentials?.username || !credentials?.password)
					return null;

				const BASE_URL = process.env.NEXTAUTH_URL;
				const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
				const response = await fetch(`${BASE_URL}/api/login`, {
					method: "POST",
					headers: {
						"Content-type": "application/json",
						Authorization: `Bearer ${API_KEY}`
					},
					body: JSON.stringify({
						username: credentials.username,
						password: credentials.password
					})
				});
				const user = await response.json();

				if (user && response.ok) {
					return user;
				}
				return null;
			}
		})
	],
	pages: {
		signIn: "/sign-in"
	},
	session: {
		strategy: "jwt",
		maxAge: 60 * 60 * 24 * 30, // 30 days
		updateAge: 60 * 60 * 24 // 1 day
	},
	callbacks: {
		async jwt({ token, user }) {
			user && (token.user = user);
			return token;
		},
		async session({ session, token }) {
			session = token.user as Session;
			return session;
		}
	}
};
