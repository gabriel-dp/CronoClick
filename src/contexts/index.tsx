import { NextAuthSessionProvider } from "./session";
import { ThemeProvider } from "./theme";

export function AppProvider({ children }: React.PropsWithChildren) {
	return (
		<NextAuthSessionProvider>
			<ThemeProvider>{children}</ThemeProvider>
		</NextAuthSessionProvider>
	);
}
