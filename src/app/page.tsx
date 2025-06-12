"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Logo from "@/assets/logo.svg";

import Image from "next/image";

import Button from "@/components/ui/Button";

import { HomeMainContainer } from "./styles";

export default function Home() {
	const { status } = useSession();
	const { push } = useRouter();

	if (status === "loading") {
		return <HomeMainContainer>Carregando...</HomeMainContainer>;
	}

	if (status !== "authenticated") {
		return (
			<HomeMainContainer>
				<Image src={Logo} alt="Logo" />
				<h1>Bem-vindo ao CronoClick!</h1>
				<p>
					Cadastre sua conta para acessar todos os conteúdos
					disponíveis no CronoClick!
				</p>
				<Button onClick={() => push("/sign-up")}>Crie sua conta</Button>
			</HomeMainContainer>
		);
	}

	return (
		<HomeMainContainer>
			<Image src={Logo} alt="Logo" />
			<h1>Bem-vindo ao CronoClick!</h1>
			<p>Seu login foi realizado com sucesso.</p>
			<Button onClick={() => push("/schedule")}>Ver Cronogramas</Button>
		</HomeMainContainer>
	);
}
