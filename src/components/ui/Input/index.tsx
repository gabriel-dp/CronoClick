import { forwardRef } from "react";

import { InputComponent, InputLabel, InputWrapper } from "./styles";

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
	name: string;
	label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function _(
	{ name, label, ...rest },
	ref
) {
	return (
		<InputWrapper>
			<InputLabel htmlFor={name}>{label}</InputLabel>
			<InputComponent ref={ref} name={name} {...rest} />
		</InputWrapper>
	);
});

export default Input;
