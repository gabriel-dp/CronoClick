import { forwardRef } from "react";

import { TextareaComponent, TextareaLabel, TextareaWrapper } from "./styles";

interface TextareaProps extends React.ComponentPropsWithoutRef<"textarea"> {
	name: string;
	label: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function _(
	{ name, label, ...rest },
	ref
) {
	return (
		<TextareaWrapper>
			<TextareaLabel htmlFor={name}>{label}</TextareaLabel>
			<TextareaComponent ref={ref} name={name} {...rest} />
		</TextareaWrapper>
	);
});

export default Textarea;
