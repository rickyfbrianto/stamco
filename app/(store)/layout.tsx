import type { Metadata } from 'next';
import '../globals.css';
import { Toaster } from 'sonner';
import { SanityLive } from '@/sanity/lib/live';
import LayoutProvider from '@/components/LayoutProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Suspense } from 'react';
import { getAllCategories } from '@/sanity/lib/products/getAllCategories';

export const metadata: Metadata = {
    title: 'Stamco',
    description: 'E Commerce gratis by Ricky',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const categories = await getAllCategories();

    return (
        <LayoutProvider>
            <html lang="en">
                <body className="bg-slate-100">
                    <Toaster />
                    <Suspense>
                        <Header categories={categories} />
                    </Suspense>
                    {children}
                    <Footer />
                    <SanityLive />
                </body>
            </html>
        </LayoutProvider>
    );
}
