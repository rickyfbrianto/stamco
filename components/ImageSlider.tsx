'use client'

import Image, { StaticImageData } from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import '@/app/custom.css';

function ImageSlider({ images }: { images: StaticImageData[] }) {
    const [imageIndex, setImageIndex] = useState(0)

    const handleSlide = (val: number) => {
        setImageIndex(prev => {
            let temp = prev + val
            if (temp === images.length) temp = 0
            else if (temp < 0) temp = images.length - 1
            return temp
        })
    }

    useEffect(() => {
        const intervalSlide = setInterval(() => {
            setImageIndex(prev => {
                let temp = prev + 1
                if (temp === images.length) temp = 0
                else if (temp < 0) temp = images.length - 1
                return temp
            })
        }, 5000)


        return () => clearInterval(intervalSlide)
    }, [imageIndex])

    return (
        <div className='relative flex flex-col w-full h-[70vh] select-none'>
            <span>index : {imageIndex}</span>
            <Image className='w-full object-cover' src={images[imageIndex]} alt={`Slide ${imageIndex}`} fill />
            <div className="flex absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] px-20 py-6 bg-white/[.5] font-urbanist">
                Expand your style
            </div>
            <div className="absolute w-full flex justify-between top-[50%] translate-y-[-50%]">
                <button className='customSliderButton' onClick={() => handleSlide(-1)}>
                    <ChevronLeft className='customSliderIcon' />
                </button>
                <button className='customSliderButton' onClick={() => handleSlide(1)}>
                    <ChevronRight className='customSliderIcon' />
                </button>
            </div>
            <div className="absolute flex justify-between bottom-[4rem] left-[50%] translate-x-[-50%] gap-x-5">
                {images.map((val, index) => (
                    <button key={"imgSlider" + index} onClick={() => setImageIndex(index)} className={`h-[1rem] w-[1rem] rounded-full ${index === imageIndex ? "bg-black" : "bg-slate-600/[.6]"}`}></button>
                ))}
            </div>

        </div>
    )
}

export default ImageSlider