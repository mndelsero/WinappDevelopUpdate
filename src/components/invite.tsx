import { View, Text, Dimensions } from "react-native";
import React from "react";
import tw from "@/config/tw";
import { Ionicons } from "@expo/vector-icons";

export default function invite() {
	return (
		<View style={tw`bg-background h-full`}>
			<Text style={tw`text-center text-black mt-10 tablet:text-3xl`}>
				Comparte tu ID y recibe créditos por cada amigo que se registre{" "}
			</Text>
			<View
				style={tw` mx-4 rounded-xl justify-evenly items-center flex mt-10 flex-row border-2 border-primary`}
			>
				<Text
					style={tw`text-center text-2xl py-4 text-primary flex flex-row justify-center items-center  tablet:text-3xl`}
				>
					Tus puntos:
				</Text>
				<Text
					style={tw`text-center text-2xl py-4 text-primary flex justify-center items-center tablet:text-3xl`}
				>
					5000
				</Text>
			</View>

			<View style={tw`mt-10 mx-4 bg-primary rounded-xl py-4 px-4`}>
				<View style={tw`flex flex-row justify-between px-4 pb-4`}>
					<Text style={tw`text-white text-sm tablet:text-xl`}>Tu ID:</Text>
					<Text style={tw`text-white text-sm tablet:text-xl`}>
						<Ionicons
							name="copy"
							size={Dimensions.get("window").width >= 1024 ? 25 : 20}
							color="white"
						/>
					</Text>
				</View>
				<Text
					style={tw`text-white text-center text-xl tablet:text-2xl font-bold`}
				>
					juaniseijas00@gmail.com
				</Text>
			</View>

			<View style={tw`px-4 mt-5`}>
				<Text
					style={tw`text-primary text-bold mb-2 text-xl font-bold tablet:text-2xl`}
				>
					¿Cómo se hace?
				</Text>
				<Text style={tw`text-black tablet:text-xl`}>
					Tus amigos ponen tu ID cuando se registran. Ellos ganan 25 créditos,
					vos 50.
				</Text>
			</View>

			<View style={tw`mt-4 px-4`}>
				<Text
					style={tw`text-primary text-bold mt-2 font-bold text-xl text-center tablet:text-2xl`}
				>
					Amigos Referidos:
				</Text>
			</View>
		</View>
	);
}
