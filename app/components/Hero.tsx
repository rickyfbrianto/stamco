import Image from 'next/image'
import React from 'react'


export default function Hero() {
    return (
        <div className='flex w-full h-[600px]'>
            <div className="h-full max-w-[600px] md:max-w-[1024px] m-auto">
                <div className="object-cover">
                    {/* <Image src={}/> */}
                </div>
            </div>
        </div>
    )
}
