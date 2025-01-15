import CartView from '@/components/CartView';
import { getAllCarts } from '@/sanity/lib/cart/getAllCarts';

async function CartPage() {
    const cart = await getAllCarts();

    return <CartView cart={cart} />;
}

export default CartPage;
