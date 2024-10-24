import { Business, Product } from "@/utils/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

interface GlobalState {
	location: {
		lat: number;
		lng: number;
		displayName: string;
	};
	categoria: {
		id: string;
		name: string;
	};

	
	
	setCategoria: (categoria: { id: string; name: string }) => void;
	setLocation: (location: Partial<GlobalState["location"]>) => void;
	clearStorage: () => void;
	selectedBusiness: Business | null;
	setSelectedBusiness: (business: Business | null) => void;
	selectProductItem: Product | null;
	setSelectedProduct: (product: Product | null) => void;
	waitingOrderNow: string|any;
	setWaitingOrderNow: (order: string | null) => void;
}

const useGlobalStore = create<GlobalState>()(
	devtools(
		persist(
			(set) => ({
				location: {
					lat: 0,
					lng: 0,
					displayName: "",
				},
				categoria: {
					id: "",
					name: "",
				},
				setCategoria: (categoria) =>
					set((state) => ({ categoria: { ...state.categoria, ...categoria } })),
				setLocation: (location) =>
					set((state) => ({ location: { ...state.location, ...location } })),
				clearStorage: () =>
					set(() => ({ location: { lat: 0, lng: 0, displayName: "" } })),
				selectedBusiness: null,
				setSelectedBusiness: (business) =>
					set(() => ({ selectedBusiness: business })),
				selectProductItem: null,
				setSelectedProduct: (product) =>
					set(() => ({ selectProductItem: product })),
				waitingOrderNow: null,
				setWaitingOrderNow: (order) =>
					set(() => ({ waitingOrderNow: order })),
				
			}),
			{
				name: "global-storage",
				storage: createJSONStorage(() => AsyncStorage),
			},
		),
	),
);

export default useGlobalStore;
