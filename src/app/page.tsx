"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { logout } from "@/utils/authActions";
import Button from "@/components/ui/Button";
import { useMemo } from "react";

export default function Home() {
	const { push } = useRouter();
	const session = useSession();
	session.update();

	const Options = useMemo(() => {
		switch (session.status) {
			case "authenticated":
				return (
					<>
						<p>{JSON.stringify(session)}</p>
						<Button onClick={() => push("/schedule")}>
							Schedule
						</Button>
						<Button onClick={logout}>Logout</Button>
					</>
				);
			case "loading":
				return <>Loading...</>;
			case "unauthenticated":
				return (
					<>
						<Button onClick={() => push("/sign-up")}>
							Sign-up
						</Button>
						<Button onClick={() => push("/sign-in")}>
							Sign-in
						</Button>
					</>
				);
			default:
				return null;
		}
	}, [session, push]);

	return (
		<main>
			<h1>TecWeb</h1>
			{Options}
		</main>
	);
}
