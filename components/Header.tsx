'use client'

import { CiShoppingCart } from "react-icons/ci";
import { ClerkLoaded, ClerkLoading, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { PiPackageThin } from "react-icons/pi";
import { FaOilWell } from "react-icons/fa6";
import { useBasketStore } from "@/store/store";
import { Box, ShoppingCart } from "lucide-react";
import Loader, { LoaderBounce } from "./Loader";

export default function Header() {
    const { user } = useUser();
    const item = useBasketStore(state => state.items)
    const itemCount = useBasketStore((state) => state.items.reduce((total, item) => total + item.quantity, 0))

    const data = [
        { id: "1", title: "Product", link: "/product" },
        { id: "2", title: "Sepatu", link: "/categories/sepatu" },
        { id: "3", title: "Short", link: "/categories/shorts" },
    ]

    return (
        <div className='w-full h-[--tinggi10] bg-[--warna-mint] border-b sticky top-0 z-[10]'>
            <div className="container mx-auto flex flex-col justify-center gap-1 w-full h-full">
                <div className="flex items-center py-1 justify-between">
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
                <div className="flex space-x-5 items-start pt-1">
                    <Link href={'/'} className="font-urbanist relative">
                        <h1 className='font-bold text-xl'>Stamco</h1>
                        <div className="flex gap-2 items-center mt-[-10px]">
                            <FaOilWell size={20} className="hover:text-green-500" />
                            <span className="font-bold text-2xl">oil</span>
                        </div>
                    </Link>

                    <Form action={'/search'} className="flex flex-col flex-1 self-end">
                        <div className="flex border rounded-lg">
                            <Input className="border-none focus-visible:ring-0" name="query" type="search" placeholder="Search..." />
                            <Button variant={"outline"} className="ring-0 border-none">
                                <FaSearch />
                            </Button>
                        </div>
                        <div className="flex p-2 gap-8 text-[.75rem] font-roboto">
                            <span>Category</span>
                            {data.map((v) => (
                                <Link className="" href={v.link} key={v.title}>{v.title}</Link>
                            ))}
                        </div>
                    </Form>
                    {/* <div className={`flex gap-4 items-center justify-end ${user?.username ? "max-w-[250px] min-w-[250px]" : ""} bg-slate-200`}> */}
                    <Link href={`/cart`} className="relative text-center flex justify-center items-center 
                                    text-white font-bold h-8 w-8 rounded-full border hover:bg-gray-300 transition-colors duration-500">
                        <ShoppingCart size={16} color="#2d4e3d" strokeWidth={1.5} />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            {item.length}
                        </span>
                    </Link>
                    {/* <div className={`flex flex-col ${user?.username ? "" : ""} `}>
                    </div> */}
                </div>
            </div>
        </div>
    )
}