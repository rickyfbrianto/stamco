import { Cart, Product } from '@/sanity.types';
import { client } from '@/sanity/lib/client';
import { Item } from '@radix-ui/react-accordion';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BasketState {
    items: Partial<Cart>[];
    // addItemFromProduct: (product: Product, qty: number) => void;
    addItem: (product: Product, user: string, quantity: number) => void;
    removeItem: (productId: string) => void;
    clearBasket: () => void;
    getItemCount: (productId: string) => number;
    getGroupedItems: () => Cart[];
    removeFromCart: (product: string) => void;

    // getCarts: () => Promise<Cart[]>,
    getCarts: () => void,
    refreshServerCart: (cart: Cart[]) => void;
    addCart: (product: Product, user: string, quantity: number) => void;
    getCartCount: () => number;
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
            removeFromCart: (id: string) => set((state) => ({ items: state.items.filter((item) => item.product?._ref !== id) })),

            // new
            refreshServerCart: (cart) => set(() => ({items: [...cart]})),
            // getCarts: () => get().items,
            // addCart: async (product, user, quantity) => {
            //     const existingItem = get().items.find(item => {
            //         const v = item.product as unknown as Product
            //         return (v._id == product._id) ? true : false
            //     })
                
            //     if(existingItem){             
            //         client.patch(user + '-' + product._id)
            //         .inc({quantity: quantity})
            //         .commit()
            //         .then((val) => console.log('status', val))
            //         .catch((err) => console.error('suksess', err));
            //     }else{
            //         client.createOrReplace({
            //             _type: 'cart',
            //             _id: user + '-' + product._id,
            //             product: { _type:"reference", _ref: product._id },
            //             quantity,
            //             user,
            //         })
            //         .then((val) => console.log('status', val))
            //         .catch((err) => console.error('suksess', err));
            //         // client.patch(user + '-' + product._id)
            //         // .set({
            //         //     product: { _type:"reference", _ref: product._id },
            //         //     quantity: quantity + , user,  
            //         // }).commit()
            //         // .then((val) => console.log('status', val))
            //         // .catch((err) => console.error('suksess', err));
            //     }
                
            //     // if(existingItem){
            //     //     console.log("ada")
            //     //     return {
            //     //         items: [...get().items.map((item) => {
            //     //             const temp = item.product as unknown as Product
            //     //             return temp._id === product._id ? { ...item, product, quantity: item.quantity! + quantity, user } : item
            //     //         })]
            //     //     }
            //     // }else {
            //     //     console.log({
            //     //         items: [...get().items.map((item) => {
            //     //             const temp = item.product as unknown as Product
            //     //             return  temp._id === product._id ? [{ ...item, product, quantity: item.quantity!, user }] : item
            //     //         })]
            //     //     })
            //     //     return {
            //     //         items: [...get().items.map((item) => {
            //     //             const temp = item.product as unknown as Product
            //     //             return  temp._id === product._id ? [{ ...item, product, quantity: item.quantity!, user }] : item
            //     //         })]
            //     //     }
            //     // }
            // },
            getCarts: async () => {
                const temp = await client.fetch('*[_type == "cart"]{..., product->}')
                // console.log(temp)
                set((state) => ({items: [...temp]}))
            },
            addCart: (product, user, quantity)=> set((state)=>{

                const existingItem = state.items.find(item => {
                    const v = item?.product as unknown as Product
                    return (v._id == product._id) ? true : false
                })

                if(existingItem){
                    return { 
                        items: [...state.items.map((item) => {
                            const temp = item?.product as unknown as Product
                            return temp._id === product._id ? { ...item, product, quantity: item?.quantity! + quantity, user } : item
                        })]
                    }
                }else{
                    return { 
                        items: [...state.items, { 
                            _id: user + '-' + product._id, product, quantity, user,
                            _createdAt: new Date(),
                            _type:"cart",
                            _rev:"1",
                        }]
                    }
                }

                // if(existingItem){             
                //     client.patch(user + '-' + product._id)
                //     .inc({quantity: quantity})
                //     .commit()
                //     .then((val) => console.log('status', val))
                //     .catch((err) => console.error('suksess', err));
                // }else{
                //     client.createOrReplace({
                //         _type: 'cart',
                //         _id: user + '-' + product._id,
                //         product: { _type:"reference", _ref: product._id },
                //         quantity,
                //         user,
                //     })
                //     .then((val) => console.log('status', val))
                //     .catch((err) => console.error('suksess', err));
                //     // client.patch(user + '-' + product._id)
                //     // .set({
                //     //     product: { _type:"reference", _ref: product._id },
                //     //     quantity: quantity + , user,  
                //     // }).commit()
                //     // .then((val) => console.log('status', val))
                //     // .catch((err) => console.error('suksess', err));
                // }
                
                return {

                }
            }),
            getCartCount: () => get().items.length

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

            ,
        }),
        {
            name: 'basket-store',
        }
    )
);

export { useBasketStore };
