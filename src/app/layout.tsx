import type { Metadata } from "next";

import { AppProvider } from "@/contexts";

export const metadata: Metadata = {
	title: "TecWeb",
	description: "Project in progress"
};

export default function RootLayout({ children }: React.PropsWithChildren) {
	return (
		<html lang="en">
			<body>
				<AppProvider>{children}</AppProvider>
			</body>
		</html>
	);
}
