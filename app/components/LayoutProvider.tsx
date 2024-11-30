'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'
import Navbar from './Navbar'

const queryClient = new QueryClient()

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ClerkProvider dynamic>
                {children}
            </ClerkProvider>
        </QueryClientProvider>
    )
}