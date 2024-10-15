import tw from "@/config/tw";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "./Button";
import { useRouter } from "expo-router";

interface Props {
  swiperRef: any;
}

export const Slider2 = ({ swiperRef }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator
          size="large"
          color={tw.color("primary")}
          style={styles.loader}
        />
      )}
      <ImageBackground
        style={tw`h-full  relative w-full`}
        source={require("../../assets/images/slider2.png")}
        onLoadEnd={() => setLoading(false)} // Actualiza el estado cuando la imagen termina de cargar
      >
        <SafeAreaView style={tw`flex-1 justify-start  pl-2  relative`}>
          <View style={tw`z-100 ml-auto my-6 mr-6`}>
            <TouchableOpacity
              style={tw` bg-gray-100 px-3 py-1 rounded-xl`}
              onPress={() => router.push("/(auth)/sign-in")}
            >
              <Text style={tw`text-gray-800`}>Skip</Text>
            </TouchableOpacity>
          </View>
          <View style={tw`flex justify-center items-start  pl-2 `}>
            <Text style={tw` text-white text-5xl font-black my-2`}>HAZ </Text>
            <Text style={tw` text-white text-5xl font-black my-2`}>
              TU PEDIDO{" "}
            </Text>
            <Text style={tw` text-white text-5xl font-black my-2`}>
              AHORA MISMO
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  loader: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
