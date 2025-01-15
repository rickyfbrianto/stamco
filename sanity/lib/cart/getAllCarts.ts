import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllCarts = async () => {
    const ALL_CARTS_QUERY = defineQuery(`*[_type == "cart"] | order(product.name asc)`)

    try {
        const carts = await sanityFetch({ query: ALL_CARTS_QUERY })
        return carts.data || []
    } catch (error) {
        console.log(error)
        return []
    }
}