import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const getSellerByName = async (slug: string) => {
    const SELLER_BY_NAME = defineQuery(`
        *[_type == "seller" && name == $slug] | order(name asc)[0]
    `)

    try {
        const seller = await sanityFetch({
            query: SELLER_BY_NAME,
            params: { slug }
        })
        return seller.data || null
    } catch (error) {
        console.log(error)
        return null
    }

}