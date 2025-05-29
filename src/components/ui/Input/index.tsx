import { forwardRef } from "react";

import {
	InputComponent,
	InputLabel,
	InputWrapper,
	ErrorMessage
} from "./styles";

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
	name: string;
	label: string;
	error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function _(
	{ name, label, error, ...rest },
	ref
) {
	return (
		<InputWrapper>
			<InputLabel htmlFor={name}>{label}</InputLabel>
			<InputComponent ref={ref} name={name} {...rest} />
			{error && <ErrorMessage>{error}</ErrorMessage>}
		</InputWrapper>
	);
});

export default Input;
