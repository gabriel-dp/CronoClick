"use client";

import { useState } from "react";
import { ButtonComponent } from "./styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	onClick?: () => Promise<void> | void;
	loading?: boolean;
	type?: "submit";
}

export default function Button(props: ButtonProps) {
	const [loading, setLoading] = useState<boolean>(false);

	async function handleClick() {
		if (props.onClick) {
			setLoading(true);
			await props.onClick();
			setLoading(false);
		}
	}

	// Selects which loading will be used
	const state = props.loading ?? loading;

	return (
		<ButtonComponent
			onClick={handleClick}
			type={props.type ?? "button"}
			{...props}
		>
			{!state ? props.children : "loading"}
		</ButtonComponent>
	);
}
