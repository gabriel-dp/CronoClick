import { forwardRef } from "react";

import {
	DropdownLabel,
	DropdownWrapper,
	OptionComponent,
	SelectComponent
} from "./styles";

interface DropdownProps extends React.ComponentPropsWithoutRef<"select"> {
	name: string;
	label: string;
	options: { [key: string]: string };
}

const Dropdown = forwardRef<HTMLSelectElement, DropdownProps>(function _(
	{ name, label, options, ...rest },
	ref
) {
	return (
		<DropdownWrapper>
			<DropdownLabel htmlFor={name}>{label}</DropdownLabel>
			<SelectComponent ref={ref} name={name} {...rest}>
				<OptionComponent value="">-- Selecione --</OptionComponent>
				{Object.entries(options).map((option) => (
					<OptionComponent key={option[0]} value={option[0]}>
						{option[1]}
					</OptionComponent>
				))}
			</SelectComponent>
		</DropdownWrapper>
	);
});

export default Dropdown;
