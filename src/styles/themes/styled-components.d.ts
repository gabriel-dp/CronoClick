import "styled-components";

type HexColor = `#${string}`;

declare module "styled-components" {
	export interface DefaultTheme {
		primary: HexColor;
		primaryText: HexColor;
		primaryHighlight: HexColor;
		text: HexColor;
		background: HexColor;
		light: HexColor;
		dark: HexColor;
	}
}
