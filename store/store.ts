import { Cart, Product } from '@/sanity.types';
import { client } from '@/sanity/lib/backend';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// export interface BasketItem {
//     product: Product;
//     quantity: number;
//     user: string;
//     tgl: Date;
// }

interface BasketState {
    items: Cart[];
    // addItemFromProduct: (product: Product, qty: number) => void;
    addItem: (product: Product, user: string, quantity: number) => void;
    removeItem: (productId: string) => void;
    clearBasket: () => void;
    getItemCount: (productId: string) => number;
    getGroupedItems: () => Cart[];
    removeFromCart: (product: string) => void;

    tambahData: (product: Product, user: string, quantity: number) => void;
    ambilData: (cart: Cart[]) => void;
}

const useBasketStore = create<BasketState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product, user, quantity) =>
                set((state) => {
                    const existingItem = state.items.find((item) => item.product._id === product._id);
                    let temp = null;
                    if (existingItem) {
                        temp = {
                            items: state.items.map((item) => (item.product._id === product._id ? { ...item, quantity: item.quantity + quantity, user, tgl: new Date() } : item)),
                        };
                    } else temp = { items: [...state.items, { product, quantity, user, tgl: new Date() }] };
                    return temp;
                }),
            removeItem: (productId) =>
                set((state) => ({
                    items: state.items.reduce((acc, item) => {
                        if (item.product._id === productId) {
                            if (item.quantity > 1) {
                                acc.push({ ...item, quantity: item.quantity - 1 });
                            }
                        } else {
                            acc.push(item);
                        }
                        return acc;
                    }, [] as BasketItem[]),
                })),
            clearBasket: () => set({ items: [] }),
            getItemCount: (productId) => {
                const item = get().items.find((item) => item.product?._ref === productId);
                return item ? item.quantity : 0;
            },
            getGroupedItems: () => get().items,
            removeFromCart: (id: string) => set((state) => ({ items: state.items.filter((item) => item.product._id !== id) })),

            ambilData: (cart) => {
                set(() => {
                    return {
                        items: [...cart],
                    };
                });
            },
            tambahData: async (product, user, quantity) => {
                client
                    .createOrReplace({
                        _type: 'cart',
                        _id: user + '-' + product._id,
                        product: { _ref: product._id },
                        quantity,
                        user,
                    })
                    .then((val) => {
                        console.log('status', val);
                    })
                    .catch((err) => console.error('suksess', err));
            },
        }),
        {
            name: 'basket-store',
        }
    )
);

export { useBasketStore };
