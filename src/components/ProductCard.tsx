import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { Product } from "@/utils/types";
import tw from "@/config/tw";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import useGlobalStore from "@/store/useGlobalStore";

interface ProductCardProps {
	product: Product;
	count: number;
}
export default function ProductCard({ product, count = 0 }: ProductCardProps) {
	const router = useRouter();
	const { setSelectedProduct } = useGlobalStore();
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				setSelectedProduct(product);
				router.push("/(authed)/(product)/details");
			}}
		>
			<View
				style={tw.style(
					"w-[95%] bg-white mx-auto rounded-xl shadow-primary shadow-opacity-20 border-2 border-transparent mb-5 pb-2 tablet:pb-4",
					count > 0 ? "border-2 border-primary" : "",
				)}
				// style={tw.style(
				// 	"w-full relative tablet:w-1.75/6 h-65 tablet:h-96 bg-white   mb-5 smallphone:mx-4 phone:mx-5 rounded-xl shadow-primary shadow-opacity-20 border-2 border-transparent",
				// 	count > 0 ? "border-2 border-primary" : "",
				// )}
			>
				{count > 0 && (
					<View
						style={tw`bg-primary absolute right-0 w-5 h-5 text-center flex items-center justify-center rounded-xl bottom--2 tablet:w-8 tablet:h-8 tablet:rounded-full`}
					>
						<Text style={tw`text-white text-xs tablet:text-base`}>{count}</Text>
					</View>
				)}
				<Text
					style={tw`text-center mt-3 tablet:mt-5 text-primary text-lg tablet:text-3xl font-OpenSansBold h-10 overflow-hidden w-5/6 mx-auto`}
				>
					{product.name}
				</Text>
				<Image
					source={{ uri: product.image }}
					style={tw`w-5/6 h-20  mx-auto  rounded-xl mt-3 tablet:h-40  `}
				/>
				<Text
					style={tw`w-5/6 h-12 tablet:h-20 mx-auto text-xs tablet:text-lg mt-3 mb-1 overflow-hidden`}
				>
					{product.description}
				</Text>
				<Text
					style={tw`text-left ml-5 text-primary text-lg tablet:text-3xl  font-bold`}
				>
					${product.price}
				</Text>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({});
