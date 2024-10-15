import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import tw from "@/config/tw";
import { useUser } from "@clerk/clerk-expo";

export default function DrawerHeader() {
	const { user } = useUser();
	return (
		<View
			style={tw`h-20 tablet:h-30 flex flex-row justify-start items-center px-5 gap-4`}
		>
			{/*  */}
			<View
				style={tw`flex flex-row items-center bg-transparent  rounded-full  `}
			>
				<Image
					style={tw`w-12 h-12 tablet:w-16 tablet:h-16 bg-gray-300 rounded-full`}
					source={{
						uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
					}}
				/>
			</View>
			<View>
				<Text style={tw`text-sm tablet:text-lg font-OpenSans text-white`}>
					{user?.firstName} {user?.lastName}
				</Text>
				<Text style={tw`text-xs tablet:text-sm font-OpenSans text-white`}>
					{user?.emailAddresses[0].emailAddress}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({});
