import Input from "@/components/Input";
import tw from "@/config/tw";
import useGlobalStore from "@/store/useGlobalStore";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ShowOrder() {
  const router = useRouter();
  const { location, setSelectedBusiness } = useGlobalStore();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView>
        <View style={tw`bg-white h-full relative`}>
          <TouchableOpacity
            style={tw`absolute top-4 right-4 bg-gray-200 rounded-full w-8 h-8 flex justify-center items-center z-50`}
            onPress={() => router.back()}
          >
            <Ionicons name="close" style={tw`text-xl`} />
          </TouchableOpacity>
          <ScrollView style={tw`mt-10 px-4`}>
            <Text style={tw`text-gray-800 text-xl font-bold`}>
              Detalles del pedido
            </Text>
            <Text style={tw`text-gray-800 text-lg mt-4`}>
              Direction del local
            </Text>
            <View style={tw`flex flex-row items-center mt-2`}>
              <Ionicons name="location" style={tw`text-lg text-primary`} />
              <Text
                style={tw.style(
                  "text-sm  text-gray-600 tablet:text-3xl tablet:mt-4 border-b border-gray-300 pb-4 w-11/12 mx-auto mt-2",
                  location.displayName.length > 40 && "text-xs"
                )}
              >
                {location?.displayName}
              </Text>
            </View>

            <View style={tw`flex flex-row justify-between items-center my-4`}>
              <Text style={tw`text-gray-800 text-lg`}>Tiempo de preparado</Text>
              <Text style={tw`text-gray-800 text-lg`}>15 a 25 min</Text>
            </View>

            <View style={tw`flex flex-col  items-center my-4 mx-1`}>
              <View
                style={tw`h-10 tablet:h-20 my-4 w-full bg-gray-100  rounded-lg shadow-md flex-row justify-between px-2 items-center opacity-50`}
              >
                <Text style={tw`text-gray-800 text-lg`}>Prioridad</Text>
                <Text style={tw`text-gray-600 text-xs font-bold`}>
                  + 0.50 $
                </Text>
              </View>
              <Input placeholder="Prioridad standar" />
            </View>
            <View style={tw`flex flex-col  my-4 mx-1`}>
              <Text style={tw`text-gray-800 text-lg`}>Usar un regalo</Text>
              <Input placeholder="código" />
              <Text style={tw`text-gray-800 text-lg`}>Tus  Productos</Text>
              <Text style={tw`text-gray-800 text-sm mx-2 mt-4`}>10  Pizzas mozzarella grande</Text>
              <Text style={tw`text-gray-800 text-sm mx-2 underline mt-2`}>Agregar más productos</Text>

            </View>
            <View style={tw`flex flex-row justify-between items-center my-4`}>
              <Text style={tw`text-gray-500 text-lg`}>SubTotal</Text>
              <Text style={tw`text-gray-500 text-lg`}>10 $</Text>
            </View>
            <View style={tw`flex flex-row justify-between items-center `}>
              <Text style={tw`text-gray-500 text-lg`}>Servicios</Text>
              <Text style={tw`text-gray-500 text-lg`}>5 $</Text>
            </View>
            <View style={tw`flex flex-row justify-between items-center my-4`}>
              <Text style={tw`text-gray-800 text-lg`}>Total</Text>
              <Text style={tw`text-gray-800 text-lg`}>15 $</Text>
            </View>
            
              <Text style={tw`text-gray-500 text-lg mt-5`}>Método de pago</Text>
            <View style={tw`flex flex-row justify-between items-center my-4 border-b border-gray-300`}>
              <View style={tw`flex flex-row items-center gap-2`}>
                <Ionicons name="card" style={tw`text-lg text-primary`} />
                <Text style={tw`text-gray-500 text-lg`}>...645</Text>
              </View>
              <Ionicons name="checkmark" style={tw`text-lg text-primary font-bold`} />

            </View>
            <TouchableOpacity>

            <Text style={tw`text-gray-500 text-lg mt-5 underline`}>Agregar otro método de pago</Text>
            </TouchableOpacity>

           
            <TouchableOpacity
              onPress={() => router.push("/(authed)/(payment)/LoadingOrder")}
              style={tw`bg-primary w-10/12 p-3 my-6 rounded-full flex justify-center items-center mx-auto shadow-lg`}
            >
              <Text style={tw`text-white text-lg`}>Realizar pedido</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
