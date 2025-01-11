import { Product } from '@/sanity.types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface BasketItem {
    product: Product;
    quantity: number;
    user: string;
    tgl: Date;
}

interface BasketState {
    items: BasketItem[],
    // addItemFromProduct: (product: Product, qty: number) => void;
    addItem: (product: Product, user: string, qty: number) => void;
    removeItem: (productId: string) => void;
    clearBasket: () => void;
    getTotalPrice: () => number;
    getItemCount: (productId: string) => number;
    getGroupedItems: () => BasketItem[];
    removeFromCart: (product: string) => void
}

const useBasketStore = create<BasketState>()(
    persist((set, get) => ({
        items: [],
        // addItem: (product, qty) => set((state) => {
        //     const existingItem = state.items.find((item) => item.product._id === product._id)
        //     if (existingItem) {
        //         return {
        //             items: state.items.map(item =>
        //                 item.product._id === product._id
        //                     ? { ...item, quantity: item.quantity + qty }
        //                     : item
        //             )
        //         }
        //     } else return { items: [...state.items, { product, quantity: qty }] }
        // }),
        addItem: (product, user, qty) => set((state) => {
            const existingItem = state.items.find((item) => item.product._id === product._id)
            let temp = null
            if (existingItem) {
                temp = {
                    items: state.items.map(item =>
                        item.product._id === product._id
                            ? { ...item, quantity: item.quantity + qty, user, tgl: new Date() }
                            : item
                    )
                }
            } else temp = { items: [...state.items, { product, quantity: qty, user, tgl: new Date() }] }
            return temp
        }),
        removeItem: productId => set((state) => ({
            items: state.items.reduce((acc, item) => {
                if (item.product._id === productId) {
                    if (item.quantity > 1) {
                        acc.push({ ...item, quantity: item.quantity - 1 })
                    }
                } else {
                    acc.push(item)
                }
                return acc
            }, [] as BasketItem[])
        })),
        clearBasket: () => set({ items: [] }),
        getTotalPrice: () => {
            return get().items.reduce((total, item) => total + (item.product.price ?? 0) * item.quantity, 0)
        },
        getItemCount: (productId) => {
            const item = get().items.find(item => item.product._id === productId)
            return item ? item.quantity : 0
        },
        getGroupedItems: () => get().items,
        removeFromCart: (id: string) => set((state) =>
            ({ items: state.items.filter((item) => item.product._id !== id) })
        )
    }),
        {
            name: "basket-store"
        }
    )
)

export { useBasketStore }

// export const useStore = create(set => ({
//     zusCart: [],
//     setZusCart: val => {
//         set(state => {
//             const newData = [...state.zusCart, val].reduce((acc, curr) => {
//                 let exist = acc.find(item => item.id === curr.id);
//                 if (!exist) acc.push({ ...curr })
//                 else {
//                     exist.qty += curr.qty;
//                     exist.time = Math.max(exist.time, curr.time)
//                 }

//                 return acc;
//             }, []);
//             return { zusCart: newData }
//         })
//     },
//     zusControl: {
//         showCart: false,
//     },
//     setZusControl: val => set(state => ({ zusControl: { ...state.zusControl, ...val } }))
// }))