import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

const getProductsByCategory = async (categorySlug: string) => {

    const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
        *[_type == "product" 
        && references(*[_type == 'category' && slug.current == $categorySlug]._id)
        ] | order(name asc)
    `)

    try {
        const products = await sanityFetch({
            query: PRODUCTS_BY_CATEGORY_QUERY,
            params: { categorySlug }
        })
        return products.data || []
    } catch (error) {
        console.log(error)
        return []
    }
}

export { getProductsByCategory }