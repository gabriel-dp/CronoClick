/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";

declare module "next-auth" {
	interface Session {
		id: string;
		username: string;
		email: string;
	}
}
