"use client";

import { ThemeProvider as StyledComponentsProvider } from "styled-components";

import StyledComponentsRegistry from "@/lib/styled-components";
import Global from "@/styles/global";
import { LightTheme } from "@/styles/themes/themeLight";

export function ThemeProvider(props: { children: React.ReactNode }) {
	const theme = LightTheme;

	return (
		<StyledComponentsRegistry>
			<StyledComponentsProvider theme={theme}>
				<Global theme={theme} />
				{props.children}
			</StyledComponentsProvider>
		</StyledComponentsRegistry>
	);
}
