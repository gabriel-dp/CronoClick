import type { Metadata } from "next";

import { AppProvider } from "@/contexts";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
	title: "TecWeb",
	description: "Project in progress"
};

export default function RootLayout({ children }: React.PropsWithChildren) {
	return (
		<html lang="en">
			<body>
				<AppProvider>
					<Navbar />
					{children}
				</AppProvider>
			</body>
		</html>
	);
}
