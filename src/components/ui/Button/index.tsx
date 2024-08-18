"use client";

import { useState } from "react";
import { ButtonComponent } from "./styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	onClick?: () => Promise<void> | void;
	loading?: boolean;
	type?: "submit";
}

export default function Button({
	onClick,
	loading,
	type,
	...props
}: ButtonProps) {
	const [loadingState, setLoadingState] = useState<boolean>(false);

	async function handleClick() {
		if (onClick) {
			setLoadingState(true);
			await onClick();
			setLoadingState(false);
		}
	}

	// Selects which loading will be used
	const state = loading ?? loadingState;

	return (
		<ButtonComponent
			onClick={handleClick}
			type={type ?? "button"}
			{...props}
		>
			{!state ? props.children : "loading"}
		</ButtonComponent>
	);
}
