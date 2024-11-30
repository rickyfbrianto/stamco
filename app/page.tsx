import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Products from "./components/Products";

export default async function Home() {
    return (
        <div className="flex flex-col">
            <Hero />
            <Products />
        </div>
    );
}
