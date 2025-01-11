'use client'

import { useAuth } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'

function CheckoutButton({ disabled }: { disabled: boolean }) {
    const { isSignedIn, userId } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => setIsClient(true), [])

    if (!isClient) return null

    const handleCheckout = async () => {
        if (!isSignedIn) return
        setIsLoading(true)

        try {
            // const metadata: Metadata = {
            //     orderNumber: crypto.randomUUID(),
            //     customerName: user?.fullName ?? "Unknown",
            //     customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
            //     clerkUserId: user!.id
            // }

            // const checkoutUrl = await createCheckoutSession(groupedItems, metadata)
            // if (checkoutUrl) {
            //     window.location.href = checkoutUrl
            // }
        } catch (error) {
            console.log("Error checkout : ", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <button onClick={handleCheckout} disabled={!disabled || isLoading}
            className={`${!disabled && "cursor-not-allowed"} mt-4 w-full min-w-[4rem] text-ellipsis bg-[--warna-green] text-white px-4 py-2 rounded hover:bg-[--warna-green] disabled:bg-gray-400`}>
            {isLoading ? "Processing" : "Checkout"}
        </button>
    )
}

export default CheckoutButton