import { View, Image } from "react-native";
import React from "react";
import tw from "@/config/tw";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { ParamListBase } from "@react-navigation/native";

interface LocationHeaderProps {
	navigation: DrawerNavigationProp<ParamListBase, string, undefined>;
}
export default function LocationHeader({ navigation }: LocationHeaderProps) {
	const router = useRouter();
	return (
		<SafeAreaView
			style={tw`bg-background  phone:h-40 h-30 tablet:h-50 flex flex-row justify-between items-center px-3 relative`}
		>
			<Ionicons
				onPress={() => navigation.toggleDrawer()}
				name="grid-outline"
				style={tw`text-2xl tablet:text-4xl absolute phone:top-18 top-2/4 left-3 rounded-full`}
			/>
		</SafeAreaView>
	);
}
