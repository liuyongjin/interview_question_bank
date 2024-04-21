import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PermissionProvider } from "@/component/allowed-access";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Interview Question Bank",
	description: "Created by lyj",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html className="dark">
			<body className={inter.className}>
				<PermissionProvider>{children}</PermissionProvider>
			</body>
		</html>
	);
}
