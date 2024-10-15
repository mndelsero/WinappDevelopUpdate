import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "@/config/tw";
import { Ionicons } from "@expo/vector-icons";
import useCartStore, { CartItem } from "@/store/useCartStore";

export default function CounterProduct({ item }: { item: CartItem }) {
	const { addItem, removeItem } = useCartStore((state) => state);
	return (
		<View style={tw`h-20   w-30 tablet:w-40 justify-center items-center mr-2 `}>
			<View
				style={tw`flex-row items-center justify-around h-10 w-30 tablet:w-50 tablet:h-14 border-2 rounded-full border-primary`}
			>
				<TouchableOpacity
					onPress={() => {
						const count = item.count;
						if (count < item.product.stock) {
							addItem(item.product, 1);
						}
					}}
				>
					<Ionicons
						name="add-circle-outline"
						style={tw`text-primary text-3xl tablet:text-4xl`}
					/>
				</TouchableOpacity>
				<Text
					style={tw`text-base tablet:text-3xl text-primary font-OpenSansBold`}
				>
					{item.count}
				</Text>
				<TouchableOpacity
					onPress={() => {
						removeItem(item.product, 1);
					}}
				>
					<Ionicons
						name="remove-circle-outline"
						style={tw`text-primary text-3xl tablet:text-4xl`}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({});
