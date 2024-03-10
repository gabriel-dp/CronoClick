"use client";

import { ButtonComponent } from "./styles";

interface ButtonProps {
	text: string;
	onClick?: () => Promise<void> | void;
}

export default function Button(props: ButtonProps) {
	async function handleClick() {
		if (props.onClick) await props.onClick();
	}

	return (
		<ButtonComponent onClick={handleClick}>{props.text}</ButtonComponent>
	);
}
