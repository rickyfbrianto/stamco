import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FilterProductProps {
    minPrice: number;
    maxPrice: number;
    condition: string;
    query: string;
};

interface ProductFilterProps {
    filter: FilterProductProps;
    setFilter: (data: Partial<ProductFilterProps["filter"]>) => void;
    getFilter: () => FilterProductProps;
}

const useProductFilterStore = create<ProductFilterProps>()(
    persist((set, get) => ({
        filter: {
            minPrice: 0,
            maxPrice: 0,
            condition: "",
            query: "tesda",
        },
        setFilter: (data) => set((state) => ({ ...state, ...data })),
        getFilter: () => get().filter
    }),
        {
            name: "product-filter-store"
        }
    )
)

export { useProductFilterStore }