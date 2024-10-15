import {
	ActivityIndicator,
	StyleSheet,
	Text,
	View,
	SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "@/config/tw";
import ApiService from "@/services/ApiService";
import { useAuth } from "@clerk/clerk-expo";
import { initStripe, CardField, useStripe } from "@stripe/stripe-react-native";
import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { toast } from "@backpackapp-io/react-native-toast";

export default function payment() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [cardDetails, setCardDetails] = useState(null);
	useEffect(() => {
		initStripe({
			publishableKey:
				"pk_test_51Om7ulIl6fPIbMI74EKWHuoZc6Nrjz8yPrCHs0Aqtv1PY1s9yiVQREODrGpSOqdk89xYbDMowiwSB8yPtoFrJ0pG00FE9S9Eko",
		});
	}, []);

	const handlePay = () => {
		// if (!cardDetails) {
		// 	toast.error("Por favor ingrese los datos de la tarjeta");
		// 	return;
		// }
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			router.push("/(authed)/(payment)/success");
		}, 3000);
	};
	return (
		<SafeAreaView
			style={tw` w-full bg-background h-full flex flex-col justify-around  w-full items-center relative`}
		>
			<View
				style={tw`shadow-primary shadow-opacity-20 absolute phone:top-18 top-2/4 left-3 rounded-full bg-white w-9 h-9 justify-center items-center tablet:w-12 tablet:h-12`}
			>
				<Ionicons
					onPress={() => {
						router.back();
					}}
					name="arrow-back"
					color={tw.color("primary")}
					style={tw`text-3xl tablet:text-5xl`}
				/>
			</View>
			<Text
				style={tw`text-center text-4xl font-bold text-center mt-10  w-full`}
			>
				Realizar Pago
			</Text>
			<View style={tw.style("px-2  w-full")}>
				<CardField
					postalCodeEnabled={false}
					placeholder={{
						number: "4242 4242 4242 4242",
					}}
					onCardChange={(cardDetails) => {
						const { complete, error } = cardDetails;
						if (complete) {
							setCardDetails(cardDetails);
						}
					}}
					cardStyle={{
						borderColor: "black",
						borderWidth: 1,
						borderRadius: 8,
					}}
					style={{
						height: 50,
						marginBottom: 20,
						width: "100%",
					}}
				/>
			</View>
			<Button loading={loading} title="Pagar" onPress={handlePay} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({});
