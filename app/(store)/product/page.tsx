import ProductsView from '@/components/ProductsView';
import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import { getAllProducts } from '@/sanity/lib/products/getAllProducts';
import React from 'react';
import { searchProductsByName } from '@/sanity/lib/products/searchProductsByName';
import Image from 'next/image';
import imgNotFound from '@/public/notfound.png';
import ProductFilter from '../../../components/ProductFilter';

interface ParamsProps {
    query: string;
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<ParamsProps> }) {
    const { query } = await searchParams;

    return {
        title: query ? `Search ${query}` : 'Product List',
        description: `Ini adalah deskripsi untuk halaman ${query}`,
    };
}

async function page({ searchParams }: { searchParams: Promise<ParamsProps> }) {
    const searchParam = await searchParams;
    const filterCheck = Object.values(searchParam).filter((v) => v);
    const { query } = searchParam;
    const products = await (filterCheck.length > 0 ? searchProductsByName(searchParam) : getAllProducts());
    const categories = await getAllCategories();

    return (
        <div className="p-4 pb-10">
            <div className="relative container mx-auto sm:flex min-h-[50vh] gap-4">
                {/* <div className="flex gap-x-4"> */}
                <div className="sticky top-[--tinggi10] self-start sm:top-[--tinggi12] flex flex-col bg-white rounded-lg min-w-[15rem] px-3 pb-4">
                    <ProductFilter categories={categories} />
                </div>
                <div className="flex flex-1 flex-col font-urbanist mt-4 sm:mt-0 overflow-x-hidden">
                    {query && (
                        <div className="flex w-full py-2 px-4 bg-white rounded-lg mb-4">
                            <span className="text-gray-500 text-[1rem]">Search result for &quot;{query}&quot;</span>
                        </div>
                    )}
                    {products.length == 0 ? (
                        <NoFound query={query} />
                    ) : (
                        <div className="container mx-auto py-5">
                            <span className="font-bold text-xl">Product</span>
                            <ProductsView products={products} />
                        </div>
                    )}
                </div>
                {/* </div> */}
            </div>
        </div>
    );
}

const NoFound = ({ query }: { query: string }) => (
    <div className="flex flex-col gap-y-4 bg-white rounded-lg shadow-md w-full pb-8">
        <div className="flex container mx-auto bg-[--warna-primary] rounded-lg">
            <Image
                className="w-full max-h-[60vh] object-contain transition-transform duration-300 group-hover:scale-105"
                src={imgNotFound}
                alt="Product Not Found"
                sizes="(max-width: 768px) 50%, (max-width: 1200px) 100%, 100%"
            //  width={100} height={100}
            />
        </div>
        <h1 className="text-xl md:text-3xl font-bold mb-2 text-center">No product found {query ? `for "${query}"` : ''}</h1>
        <p className="text-gray-500 text-center">Try searching with different keywords and filters</p>
    </div>
);

export default page;
