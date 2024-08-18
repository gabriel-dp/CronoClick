"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { logout } from "@/utils/authActions";
import Button from "@/components/ui/Button";

export default function Home() {
	const { push } = useRouter();
	const session = useSession();

	return (
		<main>
			<h1>TecWeb</h1>
			{session.status == "authenticated" ? (
				<>
					<p>{JSON.stringify(session)}</p>
					<Button onClick={() => push("/schedule")}>schedule</Button>
					<Button onClick={logout}>logout</Button>
				</>
			) : (
				<>
					<Button onClick={() => push("/sign-up")}>Sign-up</Button>
					<Button onClick={() => push("/sign-in")}>Sign-in</Button>
				</>
			)}
		</main>
	);
}
