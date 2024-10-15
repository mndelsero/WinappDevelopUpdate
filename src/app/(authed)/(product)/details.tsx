import {
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Image,
} from "react-native";
import React from "react";
import { useGlobalSearchParams, useRouter } from "expo-router";
import tw from "@/config/tw";
import DetailsProductHeader from "@/components/DetailsProductoHeader";
import useGlobalStore from "@/store/useGlobalStore";
import { Ionicons } from "@expo/vector-icons";
import useCartStore from "@/store/useCartStore";
import { usePathname } from "expo-router/src/hooks";
import { useRoute } from '@react-navigation/native';


export default function Details() {
	const { id } = useGlobalSearchParams();
	const { selectProduct } = useGlobalStore();
	const { addItem } = useCartStore();
	const [count, setCount] = React.useState(1);
	const [added, setAdded] = React.useState(false);
	const router = useRouter();
	const pathname = useRoute();
	return (
		<View style={tw`h-full justify-between`}>
			<View style={tw`h-4/6`}>
				<ImageBackground
					imageStyle={tw`h-6/6`}
					style={tw`flex h-2.5/6`}
					source={{
						uri: selectProduct?.image,
					}}
				>
					<DetailsProductHeader added={added} />
				</ImageBackground>
				<View style={tw` mt-8 px-8`}>
					<Text
						style={tw`text-primary font-OpenSansBold text-2xl tablet:text-4xl`}
					>
						{selectProduct?.name} {id}
					</Text>
					<Text
						style={tw`text-gray-500 font-OpenSans text-base tablet:text-2xl mt-3`}
					>
						{selectProduct?.description}
					</Text>
				</View>
			</View>
			<View
				style={tw`bg-primary h-1.8/6 tablet:h-1.4/6 rounded-t-2xl  items-center pt-3 gap-6`}
			>
				<Text
					style={tw`text-white text-center font-OpenSansBold text-3xl tablet:text-5xl mt-3`}
				>
					${selectProduct?.price}
				</Text>
				<View style={tw`flex-row items-center justify-around  w-full`}>
					<TouchableOpacity
						style={tw`bg-white  w-38 h-14 tablet:w-50 tablet:h-20 rounded-full flex justify-center items-center`}
						onPress={() => {
							if (!selectProduct) {
								return;
							}
							setAdded(true);
							addItem(selectProduct, count);
							setTimeout(() => {
								router.back();
								setAdded(false);
							}, 2000);
						}}
					>
						{added ? (
							<Image
								style={tw`w-10 h-10 tablet:w-16 tablet:h-16`}
								source={{
									uri: "https://media.tenor.com/bm8Q6yAlsPsAAAAi/verified.gif",
								}}
							/>
						) : (
							<Text style={tw`text-xl tablet:text-2xl font-OpenSans`}>
								Agregar
							</Text>
						)}
					</TouchableOpacity>
					<View
						style={tw`flex-row items-center gap-4 bg-white rounded-full px-6 py-2 tablet:py-3`}
					>
						<TouchableOpacity
							onPress={() => {
								if (!selectProduct) {
									return;
								}
								if (count < selectProduct?.stock) {
									setCount(count + 1);
								}
							}}
						>
							<Ionicons
								name="add-circle-outline"
								style={tw`text-primary text-4xl tablet:text-6xl`}
							/>
						</TouchableOpacity>
						<Text
							style={tw`text-xl tablet:text-4xl text-primary font-OpenSansBold`}
						>
							{count}
						</Text>
						<TouchableOpacity
							onPress={() => {
								if (count > 1) {
									setCount(count - 1);
								}
							}}
						>
							<Ionicons
								name="remove-circle-outline"
								style={tw`text-primary text-4xl tablet:text-6xl`}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({});
