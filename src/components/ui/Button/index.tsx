"use client";

import { useState } from "react";
import { ButtonComponent } from "./styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	onClick?: () => Promise<void> | void;
	loading?: boolean;
	type?: "submit";
	stopPropagation?: boolean;
}

export default function Button({
	onClick,
	loading,
	type,
	stopPropagation,
	...props
}: ButtonProps) {
	const [loadingState, setLoadingState] = useState<boolean>(false);

	async function handleClick(event: React.MouseEvent<HTMLElement>) {
		if (onClick) {
			setLoadingState(true);
			await onClick();
			setLoadingState(false);
		}
		if (stopPropagation) event.stopPropagation();
	}

	// Selects which loading will be used
	const state = loading ?? loadingState;

	return (
		<ButtonComponent
			onClick={(event) => handleClick(event)}
			type={type ?? "button"}
			{...props}
		>
			{!state ? props.children : "loading"}
		</ButtonComponent>
	);
}
