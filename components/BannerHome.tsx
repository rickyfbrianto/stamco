import Image from 'next/image';

async function BannerHome() {
    return (
        <div className="block">
            <Image className="object-cover" src={"/pic1.jpg"} fill alt='Gambar' />
            <Image className="object-cover" src={"/pic2.jpg"} fill alt='Gambar' />
            {/* <Carousel>
            </Carousel> */}
        </div>
    )
}

export default BannerHome