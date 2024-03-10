import { redirect } from "next/navigation";

import { useSession } from "@/contexts/session/useSession";

import { AuthContainer } from "./styles";

export default async function AuthLayout({
	children
}: React.PropsWithChildren) {
	const session = await useSession();

	if (session) {
		redirect("/");
	}

	return <AuthContainer>{children}</AuthContainer>;
}
