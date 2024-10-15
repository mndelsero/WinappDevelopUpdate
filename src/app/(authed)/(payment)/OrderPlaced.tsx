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

export default function OrderPlaced() {
  const router = useRouter();
  const { location, setSelectedBusiness } = useGlobalStore();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView>
        <View style={tw`bg-white h-full relative`}>
          <ScrollView style={tw`mt-10 px-4`}>
            <View style={tw`flex flex-row justify-between items-center `}>
              <Text style={tw`text-gray-800 text-xl font-bold`}>
                Orden Realizada
              </Text>
              <Ionicons name="checkmark" style={tw`text-xl text-primary`} />
            </View>
            <Text style={tw`text-gray-800 text-lg mt-2`}>
                Disfruta tu pedido!
            </Text>
            <Text style={tw`text-gray-500 text-lg mt-2 w-10/12 mx-auto`}>
                10 pizzas mozzarella doble
            </Text>
            <Text style={tw`text-gray-800 text-lg mt-2`}>
                Pasa a buscar tu comida a 
            </Text>
            <View style={tw`flex flex-row   mt-2  w-10/12 mx-auto`}>
                <Ionicons name="location" style={tw`text-xl text-primary`} />
                <Text
                    style={tw.style(
                    "text-sm  text-gray-600 tablet:text-3xl tablet:mt-4  pb-4 w-11/12 mx-auto mt-2 text-center",
                    location.displayName.length > 40 && "text-xs"
                    )}
                >
                    {location?.displayName}
                </Text>
            
            </View>
       
           

            <Animated.View
              entering={FadeIn}
              style={tw`flex justify-center items-center my-10`}
            >
              <Animated.View entering={FadeIn.duration(1000)}>
                <Image
                  source={require("../../../../assets/images/finalizada.png")}
                  style={tw`w-32 h-32`}
                />
              </Animated.View>
            </Animated.View>

            <TouchableOpacity
              style={tw`bg-gray-100 w-8/12 mx-auto h-14 rounded-full justify-center items-center shadow-md my-4`}
              onPress={() => {
                router.push("/(authed)/(home)");
              }}
            >
                <Text style={tw`text-black text-lg`}>Cerrar</Text>
            </TouchableOpacity>
           
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
