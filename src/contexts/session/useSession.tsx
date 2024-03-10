import { getServerSession } from "next-auth";

import { nextAuthOptions } from "@/lib/next-auth";

export async function useSession() {
	const session = await getServerSession(nextAuthOptions);
	return session;
}
