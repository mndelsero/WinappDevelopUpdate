import { Business, Product } from "@/utils/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

export interface CartItem {
	product: Product;
	count: number;
	selectedTasksPersonalizaciones:Object;
}
interface CartState {
	items: CartItem[];
	addItem: (item: Product, count: number,selectedTasksPersonalizaciones:any, personalizaciones:any) => void;
	removeItem: (item: Product, count: number) => void;
	count: number;
	changes?: number;
	clear: () => void;
}

const useCartStore = create<CartState>()(
	devtools(
		persist(
			(set) => ({
				items: [],
				changes: 0,
				addItem: (item, count,selectedTasksPersonalizaciones) => {
					set((state) => {
						const index = state.items.findIndex(
							(i) => i.product.id === item.id,
						);
						if (index !== -1) {
							state.items[index].count += count;
						} else {
							state.items.push({ product: item, count,selectedTasksPersonalizaciones });
						}
						return {
							items: state.items,
							count: state.items.length,
							changes: state.changes ? state.changes + 1 : 1,
						};
					});
				},
				removeItem: (item, count) => {
					set((state) => {
						const index = state.items.findIndex(
							(i) => i.product.id === item.id,
						);
						if (index !== -1) {
							state.items[index].count -= count;
							if (state.items[index].count <= 0) {
								state.items.splice(index, 1);
							}
						}
						return {
							items: state.items,
							count: state.items.length,
							changes: 0,
						};
					});
				},
				count: 0,
				clear: () => {
					set((state) => {
						return {
							items: [],
							count: 0,
							changes: state.changes ? state.changes + 1 : 1,
						};
					});
				},
			}),
			{
				name: "cart-storage",
				storage: createJSONStorage(() => AsyncStorage),
			},
		),
	),
);

export default useCartStore;
