import { forwardRef } from "react";

import {
	MultiOptionContainer,
	OptionsContainer,
	Option,
	OptionLabel,
	OptionsContainerLabel
} from "./styles";

interface MultiOptionProps extends React.ComponentPropsWithoutRef<"input"> {
	name: string;
	label: string;
	options: [string, string | number][];
}

const MultiOption = forwardRef<HTMLInputElement, MultiOptionProps>(function _(
	{ label, options, ...rest },
	ref
) {
	return (
		<MultiOptionContainer>
			<OptionsContainerLabel>{label}</OptionsContainerLabel>
			<OptionsContainer>
				{options.map((option, i) => (
					<OptionLabel key={option[0]} htmlFor={`${rest.name}-${i}`}>
						{option[0]}
						<Option
							ref={ref}
							id={`${rest.name}-${i}`}
							value={option[1]}
							{...rest}
						/>
					</OptionLabel>
				))}
			</OptionsContainer>
		</MultiOptionContainer>
	);
});

export default MultiOption;
