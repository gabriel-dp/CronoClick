"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { DashboardContainer } from "./styles";

export default function DashboardPage() {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/sign-in");
		}
	}, [status, router]);

	if (status === "loading") {
		return <DashboardContainer>Carregando...</DashboardContainer>;
	}

	if (!session) {
		return null;
	}

	return (
		<DashboardContainer>
			<h1>Bem-vindo ao CronoClick!</h1>
			<p>Seu login foi realizado com sucesso.</p>
		</DashboardContainer>
	);
}
