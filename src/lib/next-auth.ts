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
				const response = await fetch(`${BASE_URL}/api/login`, {
					method: "POST",
					headers: {
						"Content-type": "application/json"
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
