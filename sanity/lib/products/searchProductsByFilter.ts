import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../live';
import { ProductFilterProps } from '@/store/productStore';

export const searchProductsByFilter = async (search: Partial<ProductFilterProps>) => {
    const { query: name, minPrice, maxPrice, category, sort = "asc", featured, seller } = search;

    const filters = [];
    let query = '*[_type == "product"';
    if (name) filters.push(`name match $name`);
    if (minPrice) filters.push(`$minPrice <= price`);
    if (maxPrice) filters.push(`$maxPrice >= price`);
    if (category) filters.push(`$category in categories[]._ref`);
    if (featured) filters.push(`featured == $featured`);
    if (seller) filters.push(`seller._ref == $seller`);

    if (filters.length > 0) query += ` && ${filters.join(' && ')}`;
    query += `] | order(price ${sort}) `;

    const PRODUCT_SEARCH_QUERY = defineQuery(query);

    try {
        const products = await sanityFetch({
            query: PRODUCT_SEARCH_QUERY,
            params: {
                name: `${name}*`,
                minPrice: Number(minPrice),
                maxPrice: Number(maxPrice),
                category: `${category}`,
                featured: Boolean(featured),
                seller: `${seller}`,
            },
        });
        return products.data || [];
    } catch (error) {
        console.log(error);
        return [];
    }
};
