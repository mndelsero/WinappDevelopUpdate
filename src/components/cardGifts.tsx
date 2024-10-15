import {
	Image,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import React, { useRef, useState } from "react";
import tw from "@/config/tw";
import { TouchableOpacity } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import { Award } from "@/utils/types";

interface IndividualImageProps {
	id: number;
	image: string;
	description: string;
	point_cost: number;
	type: number;
	discount: number | null;
	onPress: (selected: number) => void;
	name: string;
}

export enum DiscountType {
	Discount = 1,
	FreeProduct = 2,
	"2x1" = 3,
}
export const TypeText = {
	[DiscountType.Discount]: "Descuento de ",
	[DiscountType.FreeProduct]: "Gratis",
	[DiscountType["2x1"]]: "2x1",
};

export const IndividualImage = ({
	id,
	image,
	description,
	point_cost,
	discount,
	type,
	onPress,
	name,
}: IndividualImageProps) => {
	const ref = useRef<BottomSheet>(null);
	const [showText, setShowText] = useState(false);

	const handlePress = () => {
		setShowText(!showText);
	};

	return (
		<>
			<TouchableOpacity
				onPress={
					// @ts-ignore
					() => {
						onPress(id);
					}
				}
				activeOpacity={0.8}
				style={[
					tw`h-38 w-full flex-row items-center justify-between  rounded-2xl border-primary px-2  bg-white
				 `,
					{
						shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 4,
						},
						shadowOpacity: 0.25,
						shadowRadius: 3.84,

						elevation: 4,
					},
				]}
			>
				<View style={tw`w-2/6   h-full`}>
					<Image
						resizeMode="contain"
						source={{
							uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSzCqbkbbwQCYDSa7bZ5JVXSlel6FChVvrerLst7ld3w&s",
						}}
						style={tw`h-full w-full`}
					/>
				</View>
				<View
					style={tw`items-center w-4/6  h-full items-center justify-center pl-5`}
				>
					<Text style={tw`text-base mb-4 font-bold text-center`}>{name}</Text>
					<Text style={tw`text-base mb-4 font-bold text-center`}>
						{description}
					</Text>
					{/* @ts-ignore */}
					<View style={tw`flex-row w-4/6 items-center justify-center gap-4`}>
						<View style={tw`bg-primary px-3 rounded-full`}>
							{type === 1 ? (
								<Text style={tw`text-lg text-white`}>{discount}%</Text>
							) : (
								<Text style={tw`text-lg text-white`}>{TypeText[type]}</Text>
							)}
						</View>
						{point_cost !== 0 && (
							<View style={tw`bg-white px-3 rounded-full`}>
								<Text style={tw`text-lg text-primary`}>
									{point_cost} Puntos
								</Text>
							</View>
						)}
					</View>
				</View>
			</TouchableOpacity>
		</>
	);
};

const styles = StyleSheet.create({
	overlayText: {
		fontSize: 20,
		backgroundColor: "#ff4500",
	},
});
