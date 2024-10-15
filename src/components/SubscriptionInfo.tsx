import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "@/config/tw";
import { formatCardNumber } from "@/utils/helpers";
import { Ionicons } from "@expo/vector-icons";
import { Subscription } from "@/utils/types";

export default function SubscriptionInfo({
	subscriptions,
}: { subscriptions: Subscription }) {
	return (
	
		<View style={tw`flex flex-row  w-10/12 bg-primary rounded-b-lg p-4 shadow-lg gap-2`}>
		<Text style={tw`text-white text-lg`}>tus puntos:</Text>
		<Text style={tw`text-white text-3xl font-black`}>{subscriptions.credits}</Text>
		<Text style={tw`text-white text-lg`}>créditos</Text>
  		</View>
		
	);
}

const styles = StyleSheet.create({});
