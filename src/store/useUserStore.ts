import { Business, Product } from "@/utils/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

export interface User {
	first_name: string;
	last_name: string;
	email: string;
	id: number;
	phone_number: string;
	birth_date: string;
	access_token: string;
}

interface UserState {
	user: User | null;
	setUser: (user: User) => void;
	clearUser: () => void;
}

const useUserStore = create<UserState>()(
	devtools(
		persist(
			(set) => ({
				user: null,
				setUser: (user: User) => set(() => ({ user })),
				clearUser: () => set(() => ({ user: null })),
			}),
			{
				name: "user-storage",
				storage: createJSONStorage(() => AsyncStorage),
			},
		),
	),
);

export default useUserStore;
