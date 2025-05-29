import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import { AppProvider } from "@/contexts";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
	title: "CronoClick",
	description: "Project in progress"
};

export default function RootLayout({ children }: React.PropsWithChildren) {
	return (
		<html lang="en">
			<body>
				<AppProvider>
					<Navbar />
					{children}
					<Toaster position="top-right" />
				</AppProvider>
			</body>
		</html>
	);
}
