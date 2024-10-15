import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import React from "react";
import tw from "@/config/tw";

export default function LoadingScreen() {
	return (
		<View style={tw` h-full flex  items-center justify-center`}>
			<Image
				style={{
					height: 100,
					width: 300,
				}}
				resizeMode="cover"
				source={require("../../assets/images/logo.png")}
			/>
			<View>
				<ActivityIndicator size={40} color={tw.color("primary")} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({});
