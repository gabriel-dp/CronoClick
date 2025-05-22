"use client";

import { useSession } from "next-auth/react";
//import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";

import { HomeMainContainer } from "./styles";
//import DashboardPage from "./dashboard/page";
import { DashboardContainer } from "./dashboard/styles";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';


export default function Home() {
	const { data: session, status} = useSession();
	const { push } = useRouter();
	const router = useRouter();

	useEffect(() => {
		if (status != "authenticated"){
			<DashboardContainer>
			<h1>Bem-vindo ao CronoClick!</h1>
			<p>Cadastre sua conta para acessar todos os conteúdos disponiveis no CronoClick!</p>
				<Button onClick={() => push("/sign-up")}>
				 	Crie sua conta
				</Button>
			</DashboardContainer>
		}
	}, [status, router]);

	if (status === "loading") {
		return <DashboardContainer>Carregando...</DashboardContainer>
	}

	if (!session) {
		return null;
	}
	
	return(
		<DashboardContainer>
			<h1>Bem-vindo ao CronoClick!</h1>
			<p>Se login foi realizado com sucesso.</p>
			<Button onClick={() => push("/schedule")}>
				Ver Cronogramas
			</Button>
		</DashboardContainer>
	);
}	