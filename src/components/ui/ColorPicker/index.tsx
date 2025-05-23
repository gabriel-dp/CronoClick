import { useState } from "react";
import styled from "styled-components";

const PREDEFINED_COLORS = [
	"#54afff", // Azul padrão
	"#ff4d4d", // Vermelho
	"#4dff4d", // Verde
	"#ffd700", // Amarelo
	"#ff8c00", // Laranja
	"#9370db", // Roxo
	"#20b2aa", // Verde água
	"#ff69b4", // Rosa
	"#a52a2a", // Marrom
	"#808080" // Cinza
];

interface ColorPickerProps {
	value: string;
	onChange: (color: string) => void;
}

export default function ColorPicker({ value, onChange }: ColorPickerProps) {
	const [showCustomPicker, setShowCustomPicker] = useState(false);

	return (
		<ColorPickerContainer>
			<ColorGrid>
				{PREDEFINED_COLORS.map((color) => (
					<ColorOption
						key={color}
						style={{ backgroundColor: color }}
						selected={value === color}
						onClick={() => onChange(color)}
					/>
				))}
				<CustomColorOption
					selected={!PREDEFINED_COLORS.includes(value)}
					onClick={() => setShowCustomPicker(!showCustomPicker)}
				>
					+
				</CustomColorOption>
			</ColorGrid>
			{showCustomPicker && (
				<CustomColorInput
					type="color"
					value={value}
					onChange={(e) => onChange(e.target.value)}
				/>
			)}
		</ColorPickerContainer>
	);
}

const ColorPickerContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

const ColorGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 0.5rem;
`;

const ColorOption = styled.div<{ selected: boolean }>`
	width: 2rem;
	height: 2rem;
	border-radius: 0.5rem;
	cursor: pointer;
	transition: all 0.2s;
	border: 2px solid
		${(props) => (props.selected ? "var(--primary-color)" : "transparent")};

	&:hover {
		transform: scale(1.1);
	}
`;

const CustomColorOption = styled(ColorOption)`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f0f0f0;
	font-size: 1.5rem;
	font-weight: bold;
	color: #666;
`;

const CustomColorInput = styled.input`
	width: 100%;
	height: 2.5rem;
	padding: 0;
	border: none;
	border-radius: 0.5rem;
	cursor: pointer;

	&::-webkit-color-swatch-wrapper {
		padding: 0;
	}

	&::-webkit-color-swatch {
		border: none;
		border-radius: 0.5rem;
	}
`;
