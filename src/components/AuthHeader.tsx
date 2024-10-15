import { View, Image } from "react-native";
import React from "react";
import tw from "@/config/tw";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function AuthHeader() {
	const router = useRouter();
	return (
		<SafeAreaView
			style={tw`  phone:h-30 h-20 tablet:h-50 flex flex-row justify-between items-center px-3 relative bg-white`}
		>
		{/* 	<Ionicons
				onPress={() => {
					if (router.canGoBack()) {
						router.back();
					} else {
						router.push("/");
					}
				}}
				name="chevron-back"
				color="black"
				style={tw`text-4xl tablet:text-5xl absolute phone:top-18 top-2/4 left-3 rounded-full`}
			/> */}
		</SafeAreaView>
	);
}
