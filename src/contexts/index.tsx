import { NextAuthSessionProvider } from "./session";
import { ThemeProvider } from "./theme";

export function AppProvider(props: { children: React.ReactNode }) {
	return (
		<NextAuthSessionProvider>
			<ThemeProvider>{props.children}</ThemeProvider>
		</NextAuthSessionProvider>
	);
}
