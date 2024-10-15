import Input from "@/components/Input";
import tw from "@/config/tw";
import useGlobalStore from "@/store/useGlobalStore";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoadingOrder() {
  const router = useRouter();
  const { location, setSelectedBusiness } = useGlobalStore();

    
  useEffect(() => { // Paso 2
    const timer = setTimeout(() => { // Paso 3
        router.push("/(authed)/(payment)/PreparingOrder");

    }, 5000);

    return () => clearTimeout(timer); // Paso 5
  }, []);


  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView>
        <View style={tw`bg-white h-full relative`}>
          
          <ScrollView style={tw`mt-10 px-4`}>
            <View style={tw`flex flex-row justify-between items-center `}>
                <Text style={tw`text-gray-800 text-xl font-bold`}>
                    Cargando tu pedido
                </Text>
                <ActivityIndicator color={tw.color("primary")} size="large" />
            </View>
            
            <View style={tw`flex flex-row items-center  mt-20 ` }>
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
                  "text-sm  text-gray-600 tablet:text-3xl tablet:mt-4 border-b border-gray-300 pb-4 w-11/12 mx-auto mt-2 text-center",
                )}
              >
                Preparación Standard 15 a 25 min
              </Text>
            </View>
            <View style={tw`flex flex-row items-center  mt-2`}>
              <Ionicons name="checkmark" style={tw`text-xl text-primary`} />
              <Text
                style={tw.style(
                  "text-sm  text-gray-600 tablet:text-3xl tablet:mt-4 border-b border-gray-300 pb-4 w-11/12 mx-auto mt-2 text-center",
                )}
              >
                Tu orden, santiago
              </Text>
            </View>

            <View style={tw`flex flex-row items-center justify-center gap-4 items-center my-6`}>
              <View style={tw`flex p-2 bg-white `}>
                <Text style={tw`text-gray-800 text-lg`}>10</Text>

              </View>
                <Text style={tw`text-gray-800 text-lg`}>Pizza mozzarella Doble</Text>
            </View>
           
            <TouchableOpacity
                onPress={() => {
                    router.push("/(authed)/(payment)/ShowOrder");
                }}
              style={tw`bg-[#e10101] w-10/12 p-3 my-6 rounded-full flex justify-center items-center mx-auto shadow-lg`}
            >
              <Text style={tw`text-white text-lg`}>Cancelar pedido</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
