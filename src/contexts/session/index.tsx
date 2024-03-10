"use client";

import { SessionProvider } from "next-auth/react";

export function NextAuthSessionProvider({ children }: React.PropsWithChildren) {
	return <SessionProvider>{children}</SessionProvider>;
}
