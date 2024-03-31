import { forwardRef } from "react";

import { CheckboxLabel, CheckboxWrapper, InputCheckbox } from "./styles";

interface CheckboxProps extends React.ComponentPropsWithoutRef<"input"> {
	label: string;
	alignment: "vertical" | "horizontal";
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function _(
	{ alignment, label, ...rest },
	ref
) {
	return (
		<CheckboxWrapper $alignment={alignment}>
			<CheckboxLabel>{label}</CheckboxLabel>
			<InputCheckbox ref={ref} {...rest} />
		</CheckboxWrapper>
	);
});

export default Checkbox;
