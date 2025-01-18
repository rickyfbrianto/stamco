import { Cart, Product } from '@/sanity.types';
import { client } from '@/sanity/lib/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BasketState {
    items: Cart[];
    isCartChanged: boolean,
    getCarts: () => void,
    addCart: (product: Product, user: string, quantity: number) => void;
    minusCart: (id: string) => void
    updateIncQtyCart: (product: Product, user: string, quantity: number) => Promise<{success: boolean, msg:string}>;
    updateSetQtyCart: (id: string, qty: number) => void;
    removeFromCart: (val: { delete: { id: string}}[]) => Promise<{success: boolean, msg: string}>
}

const useBasketStore = create<BasketState>()(
    persist(
        (set, get) => ({
            items: [],
            isCartChanged: false,
            getCarts: async () => {
                const temp = await client.fetch('*[_type == "cart"]{..., product->} | order(_updatedAt desc)')
                set(() => ({items: [...temp], isCartChanged: false}))
            },
            addCart: (product, user, quantity)=> set((state) => {
                let temp = {}
                const _id = user + "-" + product._id
                const existingItem = state.items.find(item => _id == item._id)
                
                if(existingItem){
                    temp = { 
                        items: [...state.items.map((item) => {
                            const temp = item?.product as unknown as Product
                            return temp._id === product._id ? { ...item, product, quantity: (item.quantity ?? 0) + quantity, user } : item
                        })],
                        isCartChanged: true
                    }
                } else {
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
                            }],
                            isCartChanged: true
                        }
                    })
                }
                return temp
            }),
            minusCart: (id) => {
                set(state => {
                    return {
                        items: [...state.items.map(item => item._id === id ? {...item, quantity: item.quantity! - 1}: item)],
                        isCartChanged: true
                    }
                })
            },
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
                                .then(() => {
                                    get().getCarts()
                                    res({success:true, msg:"OK"})
                                })
                                .catch((err) => rej({success:false, msg:err}));
                        }
                    })
                })
            },
            updateSetQtyCart: (id, qty) => {
                client.patch(id)
                    .set({quantity: qty})
                    .commit()
                    .then(() => console.log('sukses'))
                    .catch((err) => console.error('sukses', err))
                set(()=> ({isCartChanged: false}))
            },
            removeFromCart: (val) => {
                return new Promise( async (res)=>{
                    await client.mutate(val)
                    res({success: true, msg:"Ok"})
                })
            }
        }),
        {
            name: 'basket-store',
        }
    )
);

export { useBasketStore };
