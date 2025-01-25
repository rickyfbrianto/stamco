import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../live';

interface CategoryFilterProps{
    seller?: string;
}

export const searchCategoryByFilter = async (filter: CategoryFilterProps) => {
    const { seller } = filter;

    // const filters = [];
    // let query = '*[_type == "product"';
    // if (seller) filters.push(`seller._ref == $seller`);
    // if (filters.length > 0) query += ` && ${filters.join(` && `)}`;
    // query += "] {categories[]->{ _id, title }} ";

    // const filters = Object.entries(filter)
    // .reduce((result: string[], entry: string[]) => {
    //     const [key, value] = entry
    //     return [...result, `${key} == ${value}`]
    //   }, [])
    //   .join(' && ')
    //   const query = `*[_type == "product" && ${filters}]`;

    // const query = `*[_type == "product" && seller._ref == $seller] {categories[]->{ _id, title }}`
    const query = `array::unique(*[_type == "product" && seller._ref == $seller].categories[]->{...})`
    
    try {
        const CATEGORY_SEARCH_QUERY = defineQuery(query);
        const category = await sanityFetch({
            query: CATEGORY_SEARCH_QUERY,
            params: {
                "seller": `${seller}`,
            },
        });
        return category.data || [];
    } catch (error) {
        console.log(error);
        return [];
    }
};
