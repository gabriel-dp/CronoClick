import { DefaultTheme } from "styled-components";

export type HexColor = `#${string}`;

export interface AppTheme extends DefaultTheme {
	primary: HexColor;
	primaryText: HexColor;
	primaryHighlight: HexColor;
	text: HexColor;
	background: HexColor;
	light: HexColor;
	dark: HexColor;
}
