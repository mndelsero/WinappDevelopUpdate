import { View, Image, Text } from "react-native";
import React from "react";
import tw from "@/config/tw";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { ParamListBase } from "@react-navigation/native";
import CartIcon from "./CartIcon";
import useGlobalStore from "@/store/useGlobalStore";
import useCartStore from "@/store/useCartStore";

interface LocationHeaderProps {
	navigation: DrawerNavigationProp<ParamListBase, string, undefined>;
}
export default function HomeHeader({ navigation }: LocationHeaderProps) {
	const selected = useGlobalStore((state) => state.selectedBusiness);
	const { count } = useCartStore((state) => state);
	return (
		<SafeAreaView
			style={tw`bg-background relative h-40 w-full flex flex-row justify-between  px-4 items-center`}
		>
			<View style={tw`flex flex-row items-center gap-3`}>
				<Ionicons
					onPress={() => navigation.toggleDrawer()}
					name="grid-outline"
					style={tw`text-3xl tablet:text-4xl`}
				/>
				<Text style={tw`text-lg text-primary font-OpenSansBold`}>
					{selected?.name}
				</Text>
			</View>

			<View style={tw`flex flex-row items-center`}>
				<Image
					source={require("../../assets/images/logo.png")}
					style={tw`w-18 h-18`}
				/>
				<CartIcon count={count} />
			</View>
		</SafeAreaView>
	);
}
