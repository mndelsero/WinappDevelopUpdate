import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import tw from "@/config/tw";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

interface CartIconProps {
	count: number;
}
export default function CartIcon({ count }: CartIconProps) {
	const router = useRouter();
	return (
		<View style={tw`relative`}>
			<TouchableOpacity onPress={() => router.push("/(authed)/(payment)/cart")}>
				<Ionicons name="cart-outline" style={tw`text-3xl tablet:text-5xl`} />
			</TouchableOpacity>
			<View
				style={tw`bg-primary justify-center items-center text-center w-5 h-5 tablet:w-8 tablet:h-8 rounded-full absolute top-5 tablet:top-7 right--1`}
			>
				<Text style={tw`text-white font-bold text-xs tablet:text-base`}>
					{count}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({});
