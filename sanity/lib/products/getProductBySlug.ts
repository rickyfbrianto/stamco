import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const GetProductBySlug = async (slug: string) => {
    const PRODUCTS_BY_SLUG = defineQuery(`
        *[_type == "product" && slug.current == $slug]{
            ..., 
            categories[]->{
                title, _id
            },
            seller->{ name, image}
        } | order(name asc)[0]
    `)

    try {
        const product = await sanityFetch({
            query: PRODUCTS_BY_SLUG,
            params: { slug }
        })
        return product.data || null
    } catch (error) {
        console.log(error)
        return null
    }

}