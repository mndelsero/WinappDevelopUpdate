import { View, Image } from "react-native";
import React from "react";
import tw from "@/config/tw";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import useGlobalStore from "@/store/useGlobalStore";

interface LocationHeaderProps {
	added: boolean;
}
export default function DetailsProductHeader({ added }: LocationHeaderProps) {
	const router = useRouter();
	const { setSelectedProduct } = useGlobalStore();
	return (
		<SafeAreaView
			style={tw`bg-transparent  phone:h-40 h-30 tablet:h-50 flex flex-row justify-between items-center px-3 relative`}
		>
			<View
				style={tw`shadow-primary shadow-opacity-20 absolute phone:top-18 top-2/4 left-3 rounded-full bg-white w-9 h-9 justify-center items-center tablet:w-12 tablet:h-12`}
			>
				<Ionicons
					onPress={() => {
						if (!added) {
							router.back();
							setSelectedProduct(null);
						}
					}}
					name="arrow-back"
					color={tw.color("primary")}
					style={tw`text-3xl tablet:text-5xl`}
				/>
			</View>
		</SafeAreaView>
	);
}
