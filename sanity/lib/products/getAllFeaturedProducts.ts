import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllFeaturedProducts = async () => {
    const ALL_FEATURE_PRODUCTS_QUERY = defineQuery(`*[_type == "product" && featured == true] | order(name asc)`)

    try {
        const products = await sanityFetch({ query: ALL_FEATURE_PRODUCTS_QUERY })
        return products.data || []
    } catch (error) {
        console.log(error)
        return []
    }
}