// 'use server'

// import { Cart } from "@/sanity.types";

// export type Metadata = {
//     orderNumber: string;
//     customerName: string;
//     customerEmail: string;
//     clerkUserId: string;
// }

// export type GroupedBasketItem = {
//     product: Cart['product'],
//     quantity: number
// }

// export async function createCheckoutSession(
//     items: GroupedBasketItem[],
//     metadata: Metadata
// ) {
//     try {
//         const itemWithoutPrice = items.filter((item) => !item.product.price)
//         if (itemWithoutPrice.length > 0) {
//             throw new Error("Some items do not have a price")
//         }

//         // const customers = await stripe
//     } catch (error) {
//         console.error("Error creating checkout session ", error)
//         throw error
//     }
// }