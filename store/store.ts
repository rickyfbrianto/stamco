import { Cart, Product } from '@/sanity.types';
import { client } from '@/sanity/lib/client';
import { Item } from '@radix-ui/react-accordion';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BasketState {
    items: Cart[];
    // addItemFromProduct: (product: Product, qty: number) => void;
    addItem: (product: Product, user: string, quantity: number) => void;
    removeItem: (productId: string) => void;
    clearBasket: () => void;
    getItemCount: (productId: string) => number;
    getGroupedItems: () => Cart[];
    refreshServerCart: (cart: Cart[]) => void;

    // new
    getCarts: () => void,
    addCart: (product: Product, user: string, quantity: number) => void;
    minusCart: (id: string) => void
    getCartCount: () => number;
    updateQtyCart: (id: string, qty: number) => void;
    removeFromCart: (id: string) => Promise<{success: boolean, msg: string}>;
}

const useBasketStore = create<BasketState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product, user, quantity) =>
                set((state) => {
                    const existingItem = state.items.find((item) => item.product?._ref === product._id);
                    let temp = null;
                    if (existingItem) {
                        temp = {
                            items: state.items.map((item) => (item.product?._ref === product._id ? { ...item, quantity: item.quantity + quantity, user } : item)),
                        };
                    } else temp = { items: [...state.items, { product, quantity, user }] };
                    return temp;
                }),
            removeItem: (productId) =>
                set((state) => ({
                    items: state.items.reduce((acc, item) => {
                        if (item.product?._ref === productId) {
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
            refreshServerCart: (cart) => set(() => ({items: [...cart]})),
            
            // new
            getCarts: async () => {
                const temp = await client.fetch('*[_type == "cart"]{..., product->}')
                set(() => ({items: [...temp]}))
            },
            addCart: (product, user, quantity)=> set((state) => {
                const existingItem = state.items.find(item => {
                    const v = item?.product as unknown as Product
                    return (v._id == product._id) ? true : false
                })
                let temp = {}

                if(existingItem){
                    temp = { 
                        items: [...state.items.map((item) => {
                            const temp = item?.product as unknown as Product
                            return temp._id === product._id ? { ...item, product, quantity: (item.quantity ?? 0) + quantity, user } : item
                        })]
                    }
                } else {
                    temp = { 
                        items: [...state.items, { 
                            _id: user + '-' + product._id, product, quantity, user,
                            _createdAt: new Date(),
                            _type:"cart",
                        }]
                    }
                }

                if(existingItem){             
                    client.patch(user + '-' + product._id)
                    .inc({quantity: quantity})
                    .commit()
                    .then((val) => console.log('status', val))
                    .catch((err) => console.error('suksess', err));
                }else{
                    client.createOrReplace({
                        _type: 'cart',
                        _id: user + '-' + product._id,
                        product: { _type:"reference", _ref: product._id },
                        quantity,
                        user,
                    })
                    .then((val) => console.log('status', val))
                    .catch((err) => console.error('suksess', err));
                    // client.patch(user + '-' + product._id)
                    // .set({
                    //     product: { _type:"reference", _ref: product._id },
                    //     quantity: quantity + , user,  
                    // }).commit()
                    // .then((val) => console.log('status', val))
                    // .catch((err) => console.error('suksess', err));
                }
                return temp
            }),
            minusCart: (id: string) => {
                set(state => {
                    return {items: [...state.items.map(item => item._id === id ? {...item, quantity: item.quantity! - 1}: item)]}
                })
            },
            getCartCount: () => get().items.length,
            updateQtyCart: (id: string, qty: number) => {
                client.patch(id)
                    .set({quantity: qty})
                    .commit()
                    .then((val) => console.log('status', val))
                    .catch((err) => console.error('suksess', err));                
            },
            removeFromCart: async (id: string) => {
                return new Promise((res, rej)=> {
                    try {
                        client.delete(id)
                        res({success:true, msg: "ok"})
                    } catch (error) {
                        rej({success: false, msg: error})
                    }
                })
            }

            //     set((state) => {
            //     const existingItem = state.items.find(item => {
            //         const v = item.product as unknown as Product
            //         return (v._id == product._id) ? true : false
            //     })
            //     let temp = null
            //     if(existingItem){
            //         return {
            //             items: [...state.items,]
            //         }
            //     }else {
            //         return {
            //             items: [...state.items,]
            //         }
            //     }
            // })
        }),
        {
            name: 'basket-store',
        }
    )
);

export { useBasketStore };
