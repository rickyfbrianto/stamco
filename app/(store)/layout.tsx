import type { Metadata } from "next";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { SanityLive } from "@/sanity/lib/live";
import LayoutProvider from "@/components/LayoutProvider";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Stamco",
    description: "E Commerce gratis by Ricky",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <LayoutProvider>
            <html lang="en">
                <body>
                    <Toaster />
                    <Header />
                    {children}
                    <Footer />
                    <SanityLive />
                </body>
            </html>
        </LayoutProvider>
    )
}
