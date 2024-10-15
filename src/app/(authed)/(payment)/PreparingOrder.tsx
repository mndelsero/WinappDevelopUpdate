import Input from "@/components/Input";
import tw from "@/config/tw";
import useGlobalStore from "@/store/useGlobalStore";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PreparingOrder() {
  const router = useRouter();
  const { location, setSelectedBusiness } = useGlobalStore();

  const [status, setStatus] = useState("recibida");

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus("preparando");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status === "preparando") {
      const timer = setTimeout(() => {
        // Reemplaza 'DestinationScreen' con el nombre de tu pantalla de destino
        router.push("/(authed)/(payment)/OrderPlaced");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, router]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView>
        <View style={tw`bg-white h-full relative`}>
          <ScrollView style={tw`mt-10 px-4`}>
            <View style={tw`flex flex-row justify-between items-center `}>
              <Text style={tw`text-gray-800 text-xl font-bold`}>
                Orden recibida
              </Text>
              <Ionicons name="checkmark" style={tw`text-xl text-primary`} />
            </View>
            <Text style={tw`text-gray-500 text-lg mt-2`}>
              Finalizara a las 12:00 PM
            </Text>
            {/* Custom progress */}
            <View
              style={tw`flex flex-row justify-between items-center mt-4 gap-4`}
            >
              <View style={tw`flex flex-col items-center w-1/3 h-1`}>
                <View style={tw`w-1/1 h-1 bg-primary `} />
              </View>
              <View style={tw`flex flex-col items-center w-1/3 h-1`}>
                {status === "recibida" ? (
                  <View style={tw`w-1/1 h-1 bg-gray-300 `} />
                ) : status === "preparando" ? (
                  <View style={tw`w-1/1 h-1 bg-primary `} />
                ) : null}
              </View>
              <View style={tw`flex flex-col items-center w-1/3 h-1`}>
                <View style={tw`w-1/1 h-1 bg-gray-300 `} />
              </View>
            </View>

            <Animated.View
              entering={FadeIn}
              style={tw`flex justify-center items-center my-10`}
            >
              {status === "recibida" ? (
                <Animated.View entering={FadeIn.duration(1000)}>
                  <Image
                    source={require("../../../../assets/images/regalo.png")}
                    style={tw`w-32 h-32`}
                  />
                </Animated.View>
              ) : status === "preparando" ? (
                <Animated.View entering={FadeIn.duration(1000)}>
                  <View style={tw`flex flex-col items-center`}>
                    <Image
                      source={require("../../../../assets/images/olla.png")}
                      style={tw`w-32 h-32`}
                    />
                    <Text
                      style={tw`text-gray-800 text-sm mt-2 bg-[#ffbf66] shadow-sm p-2 rounded-full`}
                    >
                      ¡Te llegará una notificación cuando esté tu pedido!
                    </Text>
                  </View>
                </Animated.View>
              ) : null}
            </Animated.View>

            <View style={tw`flex flex-row items-center   `}>
              <Ionicons name="checkmark" style={tw`text-xl text-primary`} />
              <Text
                style={tw.style(
                  "text-sm  text-gray-600 tablet:text-3xl tablet:mt-4 border-b border-gray-300 pb-4 w-11/12 mx-auto mt-2 text-center",
                  location.displayName.length > 40 && "text-xs"
                )}
              >
                {location?.displayName}
              </Text>
            </View>
            <View style={tw`flex flex-row items-center  mt-2`}>
              <Ionicons name="checkmark" style={tw`text-xl text-primary`} />
              <Text
                style={tw.style(
                  "text-sm  text-gray-600 tablet:text-3xl tablet:mt-4 border-b border-gray-300 pb-4 w-11/12 mx-auto mt-2 text-center"
                )}
              >
                Preparación Standard 15 a 25 min
              </Text>
            </View>
            <View style={tw`flex flex-row items-center  mt-2`}>
              <Ionicons name="checkmark" style={tw`text-xl text-primary`} />
              <Text
                style={tw.style(
                  "text-sm  text-gray-600 tablet:text-3xl tablet:mt-4 border-b border-gray-300 pb-4 w-11/12 mx-auto mt-2 text-center"
                )}
              >
                Tu orden, santiago
              </Text>
            </View>

            <View
              style={tw`flex flex-row items-center justify-center gap-4 items-center my-6`}
            >
              <View style={tw`flex p-2 bg-white `}>
                <Text style={tw`text-gray-800 text-lg`}>10</Text>
              </View>
              <Text style={tw`text-gray-800 text-lg`}>
                Pizza mozzarella Doble
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
