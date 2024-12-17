import { Facebook, Instagram, Twitter } from 'lucide-react'
import React from 'react'

async function Footer() {
    return (
        <div className='flex min-h-[30rem] w-full bg-[--warna-primary]'>
            <div className="container mx-auto !px-0 flex flex-col h-full sm:!px-10">
                <div className="flex flex-col md:flex-row md:items-end py-14 justify-between">
                    <div className="w-[60%] grid grid-cols-3 justify-start gap-x-4 gap-y-4">
                        <span>Websites</span>
                        <span>Academy</span>
                        <span>FAQs</span>
                        <span>Collections</span>
                        <span>Jobs</span>
                        <span>About Us</span>
                        <span>Elements</span>
                        <span>Market</span>
                        <span>Contact Us</span>
                    </div>
                    <div className="flex flex-col mt-10 md:0">
                        Have some idea?
                        <span className='text-[4rem]'>Let's talk</span>
                    </div>
                </div>
                <div className="flex flex-col border-t border-dashed gap-4 py-8">
                    <div className="flex justify-between">
                        <div className="flex gap-4 text-[.9rem]">
                            <span>Cookies Policy</span>
                            <span>Legal Terms</span>
                            <span>Privacy Policy</span>
                        </div>
                        <div className="flex gap-4">
                            <Facebook />
                            <Twitter />
                            <Instagram />
                        </div>
                    </div>
                    <div className="flex">
                        Stamco Mantappu
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer