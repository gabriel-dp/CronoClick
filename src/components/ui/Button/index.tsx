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
			onClick={(event) => {
				handleClick();
				if (stopPropagation) event.stopPropagation();
			}}
			type={type ?? "button"}
			{...props}
		>
			{!state ? props.children : "loading"}
		</ButtonComponent>
	);
}
