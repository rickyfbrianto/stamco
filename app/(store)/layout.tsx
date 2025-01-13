import type { Metadata } from "next";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { SanityLive } from "@/sanity/lib/live";
import LayoutProvider from "@/components/LayoutProvider";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Stamco",
	description: "E Commerce gratis by Ricky",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<LayoutProvider>
			<html lang="en">
				<body className="bg-slate-100">
					<Toaster />
					<Suspense>
						<Header />
					</Suspense>
					{children}
					<Footer />
					<SanityLive />
				</body>
			</html>
		</LayoutProvider>
	);
}
