'use client'

import { useStore } from "@/store/store";
import { CiShoppingCart } from "react-icons/ci";
import Cart from './Cart';
import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { PiPackageThin } from "react-icons/pi";
import { FaOilWell } from "react-icons/fa6";

export default function Navbar() {
    const { user } = useUser();

    const zusCart = useStore(state => state.zusCart)
    const zusControl = useStore(state => state.zusControl)
    const setZusControl = useStore(state => state.setZusControl)

    return (
        <div>
            <div className='w-full h-[--tinggi8] bg-[--warna-mint] border-b sticky top-0 z-[10]'>
                <div className="container flex items-center gap-8 w-full h-full">
                    <Link href={'/'} className="font-urbanist relative">
                        <h1 className='font-bold text-xl'>Stamco</h1>
                        <div className="flex gap-2 items-center mt-[-10px]">
                            <FaOilWell size={20} className="hover:text-green-500" />
                            <span className="font-bold text-2xl">oil</span>
                        </div>
                    </Link>

                    <Form action={'/search'} className="flex flex-1 items-center border rounded-lg">
                        <Input className="flex-1 border-none focus-visible:ring-0" name="query" type="search" placeholder="Search..." />
                        <Button variant={"outline"} className="ring-0 border-none">
                            <FaSearch />
                        </Button>
                    </Form>
                    <div className="flex gap-4 items-center">
                        <ClerkLoaded>
                            {user && (
                                <>
                                    <button className='relative' onClick={() => setZusControl({ showCart: true })}>
                                        <CiShoppingCart size={26} />
                                        <span className='cart-item-qty'>{zusCart.length}</span>
                                    </button>
                                    <Link href={'/orders'}>
                                        <PiPackageThin size={26} />
                                        {/* <span>My Orders</span> */}
                                    </Link>
                                </>
                            )}
                            {user ?
                                <div className="flex items-center space-x-2">
                                    <UserButton />
                                    <div className="hiddern sm:block text-sm">
                                        <p className="text-gray-400">Welcome back</p>
                                        <p className="font-bold">{user.fullName}</p>
                                    </div>
                                </div>
                                : <SignInButton />
                            }
                        </ClerkLoaded>
                    </div>
                </div>
            </div>
            {zusControl.showCart && <Cart />}
        </div>
    )
}
