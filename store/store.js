import { create } from 'zustand'

export const useStore = create(set => ({
    zusCart: [],
    setZusCart: val => {
        set(state => {
            const newData = [...state.zusCart, val].reduce((acc, curr) => {
                let exist = acc.find(item => item.id === curr.id);
                if (!exist) acc.push({...curr})
                else {
                    exist.qty += curr.qty;
                    exist.time = Math.max(exist.time, curr.time)
                }
            
                return acc;
            }, []);
            return {zusCart : newData}
        })
    },
    zusControl:{
        showCart:false,
    },
    setZusControl: val => set(state => ({ zusControl: {...state.zusControl, ...val} }))
}))