'use server'

import { BasketItem } from "@/store/store";

export type Metadata = {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    clerkUserId: string;
}

export type GroupedBasketItem = {
    product: BasketItem['product'],
    quantity: number
}

export async function createCheckoutSession(
    items: GroupedBasketItem[],
    metadata: Metadata
) {
    try {
        const itemWithoutPrice = items.filter((item) => !item.product.price)
        if (itemWithoutPrice.length > 0) {
            throw new Error("Some items do not have a price")
        }
    } catch (error) {
        console.error("Error creating checkout session ", error)
        throw error
    }
}