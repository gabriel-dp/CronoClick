import { useState } from "react";

import {
	ColorGrid,
	ColorOption,
	ColorPickerContainer,
	CustomColorInput
} from "./styles";

const PREDEFINED_COLORS = [
	"#71A6D2",
	"#77DDC1",
	"#FFE066",
	"#FFB347",
	"#FF6B6B",
	"#FF8FA3",
	"#B07FCF"
];

interface ColorPickerProps {
	label: string;
	value: string;
	onChange: (color: string) => void;
}

export default function ColorPicker(props: ColorPickerProps) {
	const [customColor, setCustomColor] = useState("#000000");

	function handleCustomColor(color: string) {
		setCustomColor(color);
		props.onChange(color);
	}

	return (
		<ColorPickerContainer>
			<label>Cor</label>
			<ColorGrid>
				{PREDEFINED_COLORS.map((color) => (
					<ColorOption
						key={color}
						style={{ backgroundColor: color }}
						selected={props.value === color}
						onClick={() => props.onChange(color)}
					/>
				))}
				<CustomColorInput
					selected={props.value === customColor}
					onClick={(e) =>
						handleCustomColor((e.target as HTMLInputElement).value)
					}
					onChange={(e) =>
						handleCustomColor((e.target as HTMLInputElement).value)
					}
				/>
			</ColorGrid>
		</ColorPickerContainer>
	);
}
