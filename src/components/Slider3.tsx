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

export const Slider3 = () => {
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
        source={require("../../assets/images/slider3.png")}
        onLoadEnd={() => setLoading(false)} // Actualiza el estado cuando la imagen termina de cargar
      >
        <SafeAreaView style={tw`flex-1 justify-start  pl-2  relative`}>
          <View style={tw`flex justify-end items-start  mt-20 pl-2`}>
            <Text style={tw` text-white text-5xl font-black my-2`}>
              ORDENA{" "}
            </Text>
            <Text style={tw` text-white text-5xl font-black my-2`}>
              TU COMIDA{" "}
            </Text>
            <Text style={tw` text-white text-5xl font-black my-2`}>EN UN </Text>
            <Text style={tw` text-white text-5xl font-black my-2`}>
              INSTANTE
            </Text>
          </View>
          <View style={tw`flex justify-center items-center my-auto`}>
            <Button
              onPress={() => router.push("/(auth)/sign-in")}
              title="Siguiente"
              color={tw.color("white")}
              textColor={tw.color("black")}
            />
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
