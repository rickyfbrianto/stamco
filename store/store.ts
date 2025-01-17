import { Cart, Product } from '@/sanity.types';
import { client } from '@/sanity/lib/client';
import { Item } from '@radix-ui/react-accordion';
import { CloudLightning } from 'lucide-react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BasketState {
    items: Cart[];
    isChanged: boolean,
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
    getCartCount: () => Promise<number>;
    updateIncQtyCart: (product: Product, user: string, quantity: number) => Promise<{success: boolean, msg:string}>;
    updateSetQtyCart: (id: string, qty: number) => void;
    removeFromCart: (id: string) => Promise<{success: boolean, msg: string}>;
    tes: ()=> void;
}

const useBasketStore = create<BasketState>()(
    persist(
        (set, get) => ({
            items: [],
            isChanged: false,
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
                return item ? item.quantity! : 0;
                // return 1;
            },
            getGroupedItems: () => get().items,
            refreshServerCart: (cart) => set(() => ({items: [...cart]})),
            
            // new
            getCarts: async () => {
                const temp = await client.fetch('*[_type == "cart"]{..., product->} | order(_updatedAt desc)')
                set(() => ({items: [...temp]}))
            },
            addCart: (product, user, quantity)=> set((state) => {
                let temp = {}
                const _id = user + "-" + product._id
                const existingItem = state.items.find(item => _id == item._id)
                
                if(existingItem){
                    console.log("sebelum", get().items)
                    temp = { 
                        items: [...state.items.map((item) => {
                            const temp = item?.product as unknown as Product
                            return temp._id === product._id ? { ...item, product, quantity: (item.quantity ?? 0) + quantity, user } : item
                        })],
                    }
                } else {
                    console.log('tidak ada')
                    client.createOrReplace({
                        _type: 'cart',
                        product: { _type:"reference", _ref: product._id },
                        _id, quantity, user,
                    }).then(() => {
                        temp = { 
                            items: [...state.items, { 
                                _id, product, quantity, user,
                                _createdAt: new Date(),
                                _type:"cart",
                            }]
                        }
                    })
                }
                return temp
            }),
            minusCart: (id: string) => {
                set(state => {
                    return {items: [...state.items.map(item => item._id === id ? {...item, quantity: item.quantity! - 1}: item)]}
                })
            },
            getCartCount: async () => await client.fetch('count(*[_type == "cart"])'),
            updateIncQtyCart: async (product, user, quantity) => {
                const _id = user + "-" + product._id
                return new Promise((res, rej)=>{
                    client.fetch(`count(*[_type == "cart" && _id == "${_id}"])`)
                    .then((exist)=>{
                        if(exist){
                            client.patch(_id)
                                .inc({quantity})
                                .commit()
                                .then(() => res({success:true, msg:"OK"}))
                                .catch((err) => rej({success:false, msg:err}));
                        }else{
                            client.createOrReplace({
                                    _type: 'cart',
                                    product: { _type:"reference", _ref: product._id },
                                    _id, quantity, user,
                                })
                                .then(() => res({success:true, msg:"OK"}))
                                .catch((err) => rej({success:false, msg:err}));
                        }
                    })
                })
            },
            updateSetQtyCart: (id: string, qty: number) => {
                client.patch(id)
                    .set({quantity: qty})
                    .commit()
                    .then(() => console.log('sukses'))
                    .catch((err) => console.error('sukses', err));
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
            },
            tes: () => console.log('tes')
        }),
        {
            name: 'basket-store',
        }
    )
);

export { useBasketStore };
