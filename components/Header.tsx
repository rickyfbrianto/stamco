'use client'

import { ClerkLoaded, ClerkLoading, SignInButton, useAuth, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { FaOilWell } from "react-icons/fa6";
import { useBasketStore } from "@/store/store";
import { Box, ShoppingCart } from "lucide-react";
import { LoaderBounce } from "./Loader";

export default function Header() {
    const { user } = useUser();
    const item = useBasketStore(state => state.items)
    const itemCount = useBasketStore((state) => state.items.reduce((total, item) => total + item.quantity, 0))

    const data = [
        { id: "1", title: "Product", link: "/product" },
        { id: "2", title: "Sepatu", link: "/categories/sepatu" },
        { id: "3", title: "Short", link: "/categories/shorts" },
    ]

    const CartButton = () => (
        <Link href={`/cart`} className="relative text-center flex justify-center items-center transition-colors duration-500
                                    text-white font-bold h-8 w-8 rounded-full border hover:bg-gray-300 order-2 md:order-3">
            <ShoppingCart size={16} color="#2d4e3d" strokeWidth={1.5} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {item.length}
            </span>
        </Link>
    )

    return (
        <div className='w-full min-h-[--tinggi10] bg-[--warna-mint] border-b sticky top-0 z-[10] py-2 px-8'>
            <div className="container mx-auto flex flex-col justify-center gap-1 w-full h-full">
                <div className="flex items-center justify-between">
                    <Link className="text-[.8rem]" href={'/'}>Seller Centre</Link>
                    <ClerkLoaded>
                        {user ?
                            <div className="flex justify-end space-x-4">
                                <Link href={'/orders'} className="relative text-center flex justify-center items-center 
                                        text-white font-bold h-7 w-7 rounded-full border hover:bg-gray-300 transition-colors duration-500">
                                    <Box size={16} color="#2d4e3d" strokeWidth={1.5} />
                                </Link>

                                <div className="flex items-center space-x-2">
                                    <UserButton />
                                    <div className="hidden sm:block text-sm">
                                        {/* <p className="text-gray-400 text-[.7rem]">Welcome back</p> */}
                                        <p className="font-bold lowercase truncate text-[.8rem]">{user.fullName?.split(" ")[0]}</p>
                                    </div>
                                </div>
                            </div>
                            : <SignInButton mode='modal' />
                        }
                    </ClerkLoaded>
                    <ClerkLoading>
                        <LoaderBounce />
                    </ClerkLoading>
                </div>
                {/* <div className="flex gap-4 flex-col md:flex-row md:items-start mt-3">
                    <Link href={'/'} className="font-urbanist relative order-1">
                        <h1 className='font-bold text-xl'>Stamco</h1>
                        <div className="flex gap-2 items-center mt-[-10px]">
                            <FaOilWell size={20} className="hover:text-green-500" />
                            <span className="font-bold text-2xl">oil</span>
                        </div>
                    </Link>

                    <Form action={'/search'} className="flex flex-col flex-1 md:self-end order-3 md:order-2">
                        <div className="flex border rounded-lg">
                            <Input className="border-none focus-visible:ring-0" name="query" type="search" placeholder="Search..." />
                            <Button variant={"outline"} className="ring-0 border-none">
                                <FaSearch />
                            </Button>
                        </div>
                        <div className="flex p-2 gap-8 text-[.75rem] font-roboto">
                            {data.map((v) => (
                                <Link className="" href={v.link} key={v.title}>{v.title}</Link>
                            ))}
                        </div>
                    </Form>

                    <Link href={`/cart`} className="relative text-center flex justify-center items-center transition-colors duration-500
                                    text-white font-bold h-8 w-8 rounded-full border hover:bg-gray-300 order-1 md:order-3">
                        <ShoppingCart size={16} color="#2d4e3d" strokeWidth={1.5} />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            {item.length}
                        </span>
                    </Link>
                </div> */}
                <div className="grid gap-4 mt-2 grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto]">
                    <Link href={'/'} className="font-urbanist relative order-1 ">
                        <h1 className='font-bold text-xl'>Stamco</h1>
                        <div className="flex gap-2 items-center mt-[-10px]">
                            <FaOilWell size={20} className="hover:text-green-500" />
                            <span className="font-bold text-2xl">oil</span>
                        </div>
                    </Link>

                    <Form action={'/search'} className="flex flex-col flex-1 col-span-2 md:col-span-1 order-2">
                        <div className="flex border rounded-lg">
                            <Input className="border-none focus-visible:ring-0" name="query" type="search" placeholder="Search..." />
                            <Button variant={"outline"} className="ring-0 border-none">
                                <FaSearch />
                            </Button>
                        </div>
                        <div className="hidden sm:flex p-2 gap-8 text-[.75rem] font-roboto">
                            {data.map((v) => (
                                <Link className="" href={v.link} key={v.title}>{v.title}</Link>
                            ))}
                        </div>
                    </Form>

                    <div className="flex justify-end order-1 md:order-3">
                        <Link href={`/cart`} className="relative text-center flex justify-center items-center transition-colors duration-500 self-center md:self-start
                                    font-bold h-8 w-8 rounded-full border hover:bg-gray-300 ">
                            <ShoppingCart size={16} color="#2d4e3d" strokeWidth={1.5} />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                {item.length}
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}