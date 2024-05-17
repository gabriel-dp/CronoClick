import { forwardRef } from "react";

import { CheckboxLabel, InputCheckbox } from "./styles";

interface CheckboxProps extends React.ComponentPropsWithoutRef<"input"> {
	label: string;
	alignment?: "vertical" | "horizontal";
	small?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function _(
	{ alignment, label, small, ...rest },
	ref
) {
	return (
		<CheckboxLabel $alignment={alignment ?? "horizontal"} $small={!!small}>
			{label}
			<InputCheckbox id={label + ""} ref={ref} {...rest} />
		</CheckboxLabel>
	);
});

export default Checkbox;
