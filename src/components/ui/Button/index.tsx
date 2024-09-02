"use client";

import { forwardRef, useState } from "react";

import { ButtonComponent } from "./styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	onClick?: () => Promise<void> | void;
	loading?: boolean;
	type?: "submit";
	stopPropagation?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function _(
	{ onClick, loading, type, stopPropagation, ...rest },
	ref
) {
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
			ref={ref}
			{...rest}
		>
			{!state ? rest.children : "loading"}
		</ButtonComponent>
	);
});

export default Button;
