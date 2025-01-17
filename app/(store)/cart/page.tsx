import CartView from '@/components/CartView';

export async function generateMetadata() {
    return {
        title: "Cart list",
        description: "Cart Stamco"
    }
}

async function CartPage() {
    return <CartView />;
}

export default CartPage;
