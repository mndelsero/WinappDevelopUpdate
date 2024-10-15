import tw from "@/config/tw";
import { FontAwesome } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useState , useRef} from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const categorias = [
  {
    id: 1,
    nombre: "McDonald's",
    imagen: require("../../../../../../assets/images/slider2.png"),
    cantidad : 1,
    fecha : "26 junio 9:30 am",
    precio : "26,13"
  },
  {
    id: 2,
    nombre: "Pizza Hut",
    imagen: require("../../../../../../assets/images/slider3.png"),
    cantidad : 2,
    fecha : "28 junio 10:30 am",
    precio : "5,32"
  },
  {
    id: 3,
    nombre: "Sushi max",
    imagen: require("../../../../../../assets/images/sushi.png"),
    cantidad : 3,
    fecha : "29 junio 11:30 am",
    precio : "10,32"
  },
  {
    id: 4,
    nombre: "Tacos mexicanos",
    imagen: require("../../../../../../assets/images/tacos.png"),
    cantidad : 4,
    fecha : "30 junio 12:30 am",
    precio : "15,32"
  },
  {
    id: 5,
    nombre: "Cafeterias Celeste",
    imagen: require("../../../../../../assets/images/desayunos.jpg"),
    cantidad : 5,
    fecha : "01 julio 1:30 am",
    precio : "20,32"
  },

];

export default function Orders() {
  const [imagenesCargadas, setImagenesCargadas] = useState({});

  const handleLoad = (id) => {
    setImagenesCargadas((prevState) => ({ ...prevState, [id]: true }));
  };



  
  const scrollViewRef = useRef<ScrollView | null>(null);
  // Función universal para hacer scroll hacia arriba
const scrollToTop = () => {
  if (scrollViewRef.current) {
    scrollViewRef.current.scrollTo({ y: 0, animated: true }); // Desplazar al tope
  }
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={tw`bg-white`}>
        <ScrollView 
         ref={scrollViewRef}
        style={tw`bg-white`}>
          <Text style={tw`text-2xl font-bold text-center text-gray-600 mt-5`}>
            Tus pedidos anteriores
          </Text>

          <View style={tw`flex flex-row flex-wrap justify-between p-5`}>
            {categorias.map(({ id, nombre, imagen ,cantidad,fecha,precio}) => (
              <View
                key={id}
                style={tw`w-2/2    my-2 rounded-lg  overflow-hidden`}
              >
                <ImageBackground
                  source={imagen}
                  style={tw`w-full h-40   rounded-lg relative flex justify-center items-center`}
                >
                  <View
                    style={tw` flex-row bg-white rounded-lg absolute bottom-2  w-11/12 m-auto p-2 items-center justify-between shadow-md`}
                  >
                    <View style={tw`flex flex-col w-4/7`}>
                    <Text style={tw`text-gray-700  font-bold text-lg`}>
                      {nombre}
                    </Text>
                      <Text
                        style={tw`text-gray-400   text-xs`}
                      >
                        {cantidad} Producto. ${precio} 
                      </Text>
                      <Text
                        style={tw`text-gray-400   text-xs`}
                      >
                        {fecha}
                      </Text>
                    </View>  

                    <TouchableOpacity 
                      style={tw`bg-gray-200 px-2 py-1 rounded-xl shadow-md  w-3/7 flex items-center justify-center h-8 `}
                    >
                        <Text style={tw`text-gray-600 text-xs font-bold`}>
                           Repetir pedido
                        </Text>

                    </TouchableOpacity>

                  </View>
                </ImageBackground>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
      <SafeAreaView style={tw`absolute bottom-2 right-4 flex-row justify-end pt-4`}>
                <TouchableOpacity
                  onPress={scrollToTop}
                  activeOpacity={0.8}
                  style={tw` bg-white rounded-full w-8 h-8 tablet:w-10 tablet:h-10 flex justify-center items-center ml-5  z-50 elevation-5 `}
                >
                  <Ionicons
                   
                    name="arrow-up"
                    style={tw`text-xl tablet:text-3xl`}
                    color={tw.color("primary")}
                  />
                </TouchableOpacity>
                
              </SafeAreaView>
    </>
  );
}
