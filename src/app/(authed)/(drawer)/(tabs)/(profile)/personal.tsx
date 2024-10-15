import Input from "@/components/Input";
import tw from "@/config/tw";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../../../../components/Button";
import { ScrollView } from "react-native-gesture-handler";
import InputDatePicker from "@/components/InputDatePicker";

export default function Personal() {
  const { user } = useUser();

  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    { key: "masculino", text: "Masculino" },
    { key: "femenino", text: "Femenino" },
    { key: "no_decir", text: "Prefiero no decirlo" },
  ];

  const[value,setValue]=useState("DD/MM/AA")

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={tw.style("flex-1 bg-white")}>
        <View style={tw.style("flex-1 bg-white")}>
          <Text style={tw`text-center text-gray-800 text-2xl mt-5`}>
            Mis datos personales
          </Text>
          <ScrollView style={tw`flex-1 px-4 mt-6  `}>
            <View style={tw`flex flex-col w-11/12 mt-4  mx-auto`}>
              <Text style={tw`text-gray-800 text-lg  `}>¿Cómo te llamas?</Text>
              <Input placeholder="Nombre(s)" />
            </View>
            <View style={tw`flex flex-col w-11/12 mx-auto`}>
              <Input placeholder="Apellido(s)" />
            </View>

            <View style={tw`flex flex-col w-11/12 mt-4 mx-auto`}>
              <Text style={tw`text-gray-800 text-lg  `}>¿Cuándo naciste?</Text>
              <InputDatePicker placeholder="DD/MM/AA"
              value={value}
              setValue={setValue}
             
              />
            </View>

            <View style={tw`flex flex-col w-11/12 mt-4 mx-auto`}>
              <Text style={tw`text-gray-800 text-lg  `}>
                ¿Con que género te identificas ?
              </Text>
              <View
                style={tw`flex flex-row flex-wrap  items-center gap-3 mt-2`}
              >
                {options.map((option) => (
                  <TouchableOpacity
                    key={option.key}
                    style={tw`${
                      selectedOption === option.key ? "bg-primary" : "bg-white"
                    } px-2 rounded-xl shadow-md flex items-center justify-center`}
                    onPress={() => setSelectedOption(option.key)}
                  >
                    <Text
                      style={tw`${
                        selectedOption === option.key
                          ? "text-white"
                          : "text-gray-800"
                      } text-base  py-2`}
                    >
                      {option.text}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={tw`flex flex-col w-full mt-12 mb-8 mx-auto`}>
              <TouchableOpacity
                style={tw`bg-primary flex flex-row items-center justify-center px-2 py-4 w-10/12 rounded-full shadow-md mx-auto`}
              >
                <Text style={tw`text-white  text-lg   text-center`}
                >
                  Guardar cambios
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
