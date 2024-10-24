import Input from "@/components/Input";
import tw from "@/config/tw";
import ApiService from "@/services/ApiService";
import useGlobalStore from "@/store/useGlobalStore";
import { useAuth } from "@clerk/clerk-expo";
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
const {waitingOrderNow, setWaitingOrderNow}=useGlobalStore()
  const [status, setStatus] = useState("Payment pending");
  const { getToken } = useAuth();
const verificarStatus=async()=>{

  const token = await getToken();
  if (token === null) {
    throw new Error("No token");
  }

  const orderId=waitingOrderNow.id

  const service=new ApiService()
  const result = await service.getClientOrderById(token,orderId)

setStatus(result.status)


  



}

let timer:any;

  useEffect(() => {
     // Declarar la variable fuera para acceder a ella en diferentes partes

    if (status === "Payment pending"||"In progress" ) {
      // Iniciar el intervalo cuando el status sea "Payment pending"
      timer = setInterval(() => {
        verificarStatus(); // Ejecuta la función cada 10 segundos
      }, 10000);
    }
    if (status === "Done") {
       setWaitingOrderNow(null)
      setStatus("")
      clearInterval(timer);
        router.push("/(authed)/(payment)/OrderPlaced")
    }
    if(waitingOrderNow==null){
      clearInterval(timer)
    }
   
  
    // Limpieza del intervalo al desmontar el componente
    return () => clearInterval(timer);
  }, [router,status]);
 
  

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
              Finalizara a en 15-25 minutos
            </Text>
            {/* Custom progress */}
            <View
              style={tw`flex flex-row justify-between items-center mt-4 gap-4`}
            >
              <View style={tw`flex flex-col items-center w-1/3 h-1`}>
                <View style={tw`w-1/1 h-1 bg-primary `} />
              </View>
              <View style={tw`flex flex-col items-center w-1/3 h-1`}>
                {status === "Payment pending" ? (
                  <View style={tw`w-1/1 h-1 bg-gray-300 `} />
                ) : status === "In progress" ? (
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
              {status === "Payment pending" ? (
                <Animated.View entering={FadeIn.duration(1000)}>
                  <Image
                    source={require("../../../../assets/images/regalo.png")}
                    style={tw`w-32 h-32`}
                  />
                </Animated.View>
              ) : status === "In progress" ? (
                <Animated.View entering={FadeIn.duration(1000)}>
                  <View style={tw`flex flex-col items-center`}>
                    <Image
                      source={require("../../../../assets/images/olla.png")}
                      style={tw`w-32 h-32`}
                    />
                     <Text
                      style={tw`text-gray-800 text-sm mt-2 bg-[#ffbf66] shadow-sm p-2 rounded-full`}
                    >
                      ¡Tu pedido esta siendo preparado!
                    </Text>
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
