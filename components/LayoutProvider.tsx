'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'

const queryClient = new QueryClient()

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ClerkProvider dynamic publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
                {children}
            </ClerkProvider>
        </QueryClientProvider>
    )
}