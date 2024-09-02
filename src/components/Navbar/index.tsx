"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
	FaArrowRightFromBracket as LogoutIcon,
	FaCircleUser as UserIcon
} from "react-icons/fa6";

import { logout } from "@/utils/authActions";
import Button from "@/components/ui/Button";

import { HeaderContainer, OptionsContainer } from "./styles";

export default function Navbar() {
	const { push } = useRouter();
	const session = useSession();

	const Options = useMemo(() => {
		switch (session.status) {
			case "authenticated":
				return (
					<div>
						<div className="user">
							<UserIcon className="icon" />
							<p>{session.data.username}</p>
						</div>
						<Button onClick={logout} className="button-transparent">
							<LogoutIcon />
						</Button>
					</div>
				);
			case "loading":
				return <div>Carregando...</div>;
			case "unauthenticated":
				return (
					<div>
						<Button onClick={() => push("/sign-up")}>
							Cadastrar
						</Button>
						<Button onClick={() => push("/sign-in")}>Entrar</Button>
					</div>
				);
			default:
				return null;
		}
	}, [session, push]);

	return (
		<HeaderContainer>
			<h1>CronoClick</h1>
			<OptionsContainer>{Options}</OptionsContainer>
		</HeaderContainer>
	);
}
