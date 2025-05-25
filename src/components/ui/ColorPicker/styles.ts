import styled from "styled-components";

export const ColorPickerContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	label {
		width: min-content;
	}
`;

export const ColorGrid = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

export const ColorOption = styled.div<{ selected: boolean }>`
	width: 1.5rem;
	height: 1.5rem;
	border-radius: 0.5rem;
	cursor: pointer;
	transition: all 0.2s;
	border: 2px solid
		${(props) => (props.selected ? props.theme.dark + "AA" : "transparent")};

	&:hover {
		transform: scale(1.1);
	}
`;

export const CustomColorOption = styled(ColorOption)`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f0f0f0;
	font-size: 1.5rem;
	font-weight: bold;
	color: #666;
`;

export const CustomColorInput = styled.input.attrs<{ selected: boolean }>({
	type: "color"
})`
	width: 1.5rem;
	height: 1.5rem;

	cursor: pointer;

	outline: 2px solid
		${(props) => (props.selected ? props.theme.dark + "AA" : "transparent")};

	border: none;
	border-radius: 0.5rem;
	appearance: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	background-color: transparent;

	&::-webkit-color-swatch {
		border: none;
		border-radius: 0.5rem;
	}
	&::-moz-color-swatch {
		border: none;
		border-radius: 0.5rem;
	}

	padding: 0;
	&::-webkit-color-swatch-wrapper {
		padding: 0;
	}
`;
