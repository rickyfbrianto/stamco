'use client';

import { ClerkLoaded, ClerkLoading, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaSearch } from 'react-icons/fa';
import { FaOilWell } from 'react-icons/fa6';
import { useBasketStore } from '@/store/cartStore';
import { Box, ShoppingCart } from 'lucide-react';
import { LoaderBounce } from './Loader';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useProductFilterStore } from '@/store/productStore';
import { ALL_CATEGORIES_QUERYResult } from '@/sanity.types';

export default function Header({ categories }: { categories: ALL_CATEGORIES_QUERYResult }) {
    const [isClient, setIsClient] = useState(false);
    const { user } = useUser();
    const items = useBasketStore((state) => state.items);
    const getCarts = useBasketStore((state) => state.getCarts);

    const filter = useProductFilterStore((state) => state.filter);
    const setFilter = useProductFilterStore((state) => state.setFilter);
    const generateSearchParams = useProductFilterStore((state) => state.generateSearchParams);
    const clearFilter = useProductFilterStore((state) => state.clearFilter);

    const searchParams = useSearchParams();
    const path = usePathname();
    const router = useRouter();
    // const nextSearchParams = new URLSearchParams(searchParams.toString());

    const data = [{ id: '1', title: 'Product', link: '' }, ...Object.values(categories).map((v) => ({ id: v._id, title: v.title, link: v._id }))];

    const handleCategory = (link: string) => {
        setFilter({ category: link });
        router.push(`/product${link ? `?category=${link}` : ''}`);
    };

    const formSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const temp = generateSearchParams();
        router.push(path + '?' + temp);
    };

    useEffect(() => {
        getCarts()
    }, [])

    useEffect(() => {
        const { query } = filter;
        if (!['product', 'seller'].includes(path.split('/')[1])) {
            clearFilter();
            router.replace(`${path}/?${generateSearchParams()}`);
        }
        setFilter({ query });
    }, [path, searchParams]);

    useEffect(() => setIsClient(true), []);

    return (
        <div className="w-full min-h-[--tinggi10] bg-[--warna-mint] border-b sticky top-0 z-[10] py-2 px-4 sm:px-8">
            <div className="container mx-auto flex flex-col justify-center gap-2 w-full h-full">
                {/* part atas etc: seller center dan nama akun */}
                {(!isClient)
                    ? <span>Loading</span>
                    : <div className="flex items-center justify-between">
                        <Link className="text-[.8rem]" href={'/'}>
                            Seller Centre
                        </Link>
                        <ClerkLoaded>
                            {user ? (
                                <div className="flex justify-end space-x-4">
                                    <Link
                                        href={'/orders'}
                                        className="relative text-center flex justify-center items-center 
                                        text-white font-bold h-7 w-7 rounded-full border hover:bg-gray-300 transition-colors duration-500">
                                        <Box size={16} color="#2d4e3d" strokeWidth={1.5} />
                                    </Link>

                                    <div className="flex items-center space-x-2">
                                        <UserButton />
                                        <div className="hidden sm:block text-sm">
                                            {/* <p className="text-gray-400 text-[.7rem]">Welcome back</p> */}
                                            <p className="font-bold lowercase truncate text-[.8rem]">{user.fullName?.split(' ')[0]}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <SignInButton mode="modal" />
                            )}
                        </ClerkLoaded>
                        <ClerkLoading>
                            <LoaderBounce />
                        </ClerkLoading>
                    </div>
                }

                <div className="flex gap-4 ">
                    <Link href={'/'} className="relative font-urbanist">
                        <h1 className="font-bold text-xl">Stamco</h1>
                        <div className="flex gap-2 items-center mt-[-10px]">
                            <FaOilWell size={20} className="hover:text-green-500" />
                            <span className="font-bold text-3xl">oil</span>
                        </div>
                    </Link>

                    <div className="flex flex-col min-w-40 w-full">
                        <form onSubmit={formSubmit} className="flex border rounded-lg">
                            <Input value={filter.query} onChange={(e) => setFilter({ query: e.target.value })} className="border-none focus-visible:ring-0" type="search" placeholder="Search..." />
                            <Button variant={'outline'} type="submit" className="ring-0 border-none">
                                <FaSearch />
                            </Button>
                        </form>
                        <div className="hidden sm:flex p-1 gap-6 text-[.75rem] font-urbanist">
                            {data.map((v) => (
                                <button className="font-semibold" key={v.title} onClick={() => handleCategory(v.link)}>
                                    {v.title}
                                </button>
                                // <Link className="font-semibold" href={v.link} key={v.title}>{v.title}</Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex">
                        <Link
                            href={`/cart`}
                            className="relative text-center flex justify-center items-center transition-colors duration-500 
                        font-bold h-8 w-8 mt-1 rounded-full border hover:bg-gray-300 ">
                            <ShoppingCart size={16} color="#2d4e3d" strokeWidth={1.5} />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">{items.length}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
