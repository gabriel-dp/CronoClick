"use client";

import { useSession } from "next-auth/react";
//import { useRouter } from "next/navigation";

//import Button from "@/components/ui/Button";

import { HomeMainContainer } from "./styles";
import DashboardPage from "./dashboard/page";

export default function Home() {
	const session = useSession();
	//const { push } = useRouter();
	return (
		<HomeMainContainer>
			{session.status == "authenticated" && (
				// <Button onClick={() => push("/schedule")}>
				// 	Ver Cronogramas
				// </Button>
				<DashboardPage></DashboardPage>
			)}
		</HomeMainContainer>
	);
}
