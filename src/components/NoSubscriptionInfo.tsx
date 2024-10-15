import {
	ActivityIndicator,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Business } from "@/utils/types";
import tw from "@/config/tw";
import Button from "./Button";
import { SafeAreaView } from "react-native-safe-area-context";
import Dialog from "react-native-dialog";
import { router } from "expo-router";

interface Props {
  selectedBusiness: Business | null;
  loading: boolean;
  handleSubscribe: () => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export default function NoSubscriptionInfo({
  selectedBusiness,
  loading,
  handleSubscribe,
  visible,
  setVisible,
}: Props) {
  

  const handleCancel = () => {
    router.push("/(authed)/(drawer)/(tabs)/(home)");
    setVisible(false);
  };


  return (
   
        <Dialog.Container visible={visible} blurStyle={
          {backgroundColor:"#fff"}
        }
		contentStyle={tw`bg-white rounded-xl`}
		>
          <Dialog.Title>
            <Text style={tw`text-center font-bold text-xl tablet:text-3xl`}>
              ¿Te gustaría realizar un pedido en {selectedBusiness?.name}?
            </Text>
          </Dialog.Title>
          <Dialog.Description>
            <Text style={tw`text-center tablet:text-xl text-gray-400`}>
              Solo tenes que suscribirte al comercio y empezar a pedir tu comida
              favorita
            </Text>
          </Dialog.Description>
          <View
            style={tw`w-full mx-auto flex flex-row justify-center items-center mt-5 gap-2`}
          >
            <TouchableOpacity
              style={tw`rounded-full py-2 tablet:py-5 w-3/6 bg-gray-300 shadow-lg`}
              onPress={handleCancel}
            >
             <Text
					style={tw.style(
						`text-center text-gray-600 text-lg tablet:text-4xl`,
					
					)}
				>
					Cerrar
				</Text>
            </TouchableOpacity>
           
			<TouchableOpacity
			activeOpacity={1}
			disabled={loading}
			onPress={handleSubscribe}
			style={tw.style(
				`  rounded-full py-2 tablet:py-5 w-3/6 bg-primary shadow-lg `,
				loading && "opacity-50",
				
			)}
		>
			{loading ? (
				<ActivityIndicator color="white" />
			) : (
				<Text
					style={tw.style(
						`text-center text-white text-lg tablet:text-4xl`,
					
					)}
				>
					Subscribirse
				</Text>
			)}
		</TouchableOpacity>
          </View>
        </Dialog.Container>
  );
}

const styles = StyleSheet.create({});
