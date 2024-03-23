"use client";

import { ThemeProvider as StyledComponentsProvider } from "styled-components";

import StyledComponentsRegistry from "@/lib/styled-components";
import Global from "@/styles/global";
import { LightTheme } from "@/styles/themes/themeLight";

export function ThemeProvider({ children }: React.PropsWithChildren) {
	const theme = LightTheme;

	return (
		<StyledComponentsRegistry>
			<StyledComponentsProvider theme={theme}>
				<Global theme={theme} />
				{children}
			</StyledComponentsProvider>
		</StyledComponentsRegistry>
	);
}
