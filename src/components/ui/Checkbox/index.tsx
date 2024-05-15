import { forwardRef } from "react";

import { CheckboxLabel, CheckboxWrapper, InputCheckbox } from "./styles";

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
		<CheckboxWrapper
			$alignment={alignment ?? "horizontal"}
			$small={!!small}
		>
			<CheckboxLabel $small={!!small}>{label}</CheckboxLabel>
			<InputCheckbox ref={ref} {...rest} />
		</CheckboxWrapper>
	);
});

export default Checkbox;
