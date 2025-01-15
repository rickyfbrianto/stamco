import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../live';
import { ProductFilterProps } from '@/store/productStore';

export const searchProductsByName = async (search: Partial<ProductFilterProps>) => {
    const { query: name, minPrice, maxPrice, category } = search;

    const filters = [];
    let query = '*[_type == "product"';
    if (name) filters.push(`name match $name`);
    if (minPrice) filters.push(`$minPrice <= price`);
    if (maxPrice) filters.push(`$maxPrice >= price`);
    if (category) filters.push(`$category in categories[]._ref`);

    if (filters.length > 0) query += ` && ${filters.join(' && ')}`;
    query += '] | order(name asc)';
    console.log(query);

    const PRODUCT_SEARCH_QUERY = defineQuery(query);

    try {
        const products = await sanityFetch({
            query: PRODUCT_SEARCH_QUERY,
            params: {
                name: `${name}*`,
                minPrice: Number(minPrice),
                maxPrice: Number(maxPrice),
                category: `${category}`,
            },
        });
        return products.data || [];
    } catch (error) {
        console.log(error);
        return [];
    }
};
