import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"
import { ProductFilterProps } from "@/store/productStore"

export const searchProductsByName = async (search: Partial<ProductFilterProps>) => {
    const { query: name, minPrice, maxPrice, category } = search
    const nameFilter = (name ? ` && name match $name` : "")
    const priceFilter = (minPrice || maxPrice
        ? (minPrice ? ` && $minPrice <= price` : "") + (maxPrice ? ` && $maxPrice >= price` : "")
        : ""
    )
    const categoryFilter = category ? ` && $category in categories[]._ref`:""

    const PRODUCT_SEARCH_QUERY = defineQuery(`*[_type == "product"  ${priceFilter} ${categoryFilter}] | order(name asc)`)

    try {
        const products = await sanityFetch({
            query: PRODUCT_SEARCH_QUERY,
            params: {
                // name: `${name}*`,
                minPrice: Number(minPrice),
                maxPrice: Number(maxPrice),
                category: `${category}`,
            },
        })
        return products.data || []
    } catch (error) {
        console.log(error)
        return []
    }
}