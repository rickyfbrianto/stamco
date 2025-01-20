import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ProductFilterProps {
    minPrice: number;
    maxPrice: number;
    condition: string;
    query: string;
    category: string;
    sort: "asc" | "desc" | string;
};

const ProductFilterData = {
    minPrice: 0,
    maxPrice: 0,
    condition: "",
    category: "",
    query: "",
    sort: "asc"
}

interface ProductFilterStoreProps {
    filter: ProductFilterProps;
    setFilter: (data: Partial<ProductFilterStoreProps["filter"]>) => void;
    getFilter: () => ProductFilterProps;
    generateSearchParams: () => string;
    clearFilter: () => void;
}

const useProductFilterStore = create<ProductFilterStoreProps>()(
    persist((set, get) => ({
        filter: { ...ProductFilterData },
        setFilter: (data) => set((state) => ({ filter: { ...state.filter, ...data } })),
        getFilter: () => get().filter,
        generateSearchParams: () => {
            const temp = Object.entries(get().filter)
                .filter(val => val[1])
                .map(v => { return `${v[0]}=${v[1]}` })
                .join("&")
            return temp
        },
        clearFilter: () => set(() => ({ filter: { ...ProductFilterData } }))
    }),
        {
            name: "product-filter-store"
        }
    )
)

export { useProductFilterStore }