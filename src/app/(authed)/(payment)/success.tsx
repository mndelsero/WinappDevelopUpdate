import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import tw from "@/config/tw";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import useCartStore from "@/store/useCartStore";

export default function success() {
	const router = useRouter();
	const { clear } = useCartStore();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// clear();
	}, []);
	return (
		<SafeAreaView style={tw.style("h-full bg-white")}>
			<Image
				style={tw`w-30 h-30 tablet:w-16 tablet:h-16 mx-auto`}
				source={{
					uri: "https://media.tenor.com/bm8Q6yAlsPsAAAAi/verified.gif",
				}}
			/>
			<Text style={tw`text-primary text-4xl font-bold text-center mt-10`}>
				Orden Generada
			</Text>
			<Text style={tw`text-primary text-xl font-light text-center mt-10`}>
				Podras ver el estado de tu orden en la seccion de historial
			</Text>
			{/* <Text style={tw`text-primary text-xl font-light text-center mt-10`}>
				Acuerdate que deberas abonar el total de la orden en el comercio
			</Text> */}
			<View
				style={tw`mx-auto w-full justify-center items-center absolute bottom-10`}
			>
				<Button
					title="Volver al inicio"
					onPress={() => {
						clear();
						router.push("/(authed)/(drawer)/(tabs)/(business)/?clear=true");
					}}
				/>
			</View>
		</SafeAreaView>
	);
}
