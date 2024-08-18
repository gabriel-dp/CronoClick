"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { AuthContainer } from "./styles";
import { useEffect } from "react";

export default function AuthLayout({ children }: React.PropsWithChildren) {
	const session = useSession();
	const { push } = useRouter();

	useEffect(() => {
		if (session.status == "authenticated") {
			push("/");
		}
	}, [session.status, push]);

	return <AuthContainer>{children}</AuthContainer>;
}
