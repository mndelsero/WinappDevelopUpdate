import React, { useCallback, useState } from "react";
import {
  ScrollView,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import tw from "@/config/tw";

import imagenBurguer from "../../../../../../assets/images/slider2.png";
import { Stack, useRouter } from "expo-router";
import CheckBoxCustom from "@/components/CheckBoxCustom";
import { Ionicons } from "@expo/vector-icons";

export default function RewardShow() {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const handleCheckedChange = (taskId, isChecked) => {
    console.log(`El estado de la tarea ${taskId} es ahora: ${isChecked}`);
    setIsChecked(isChecked);
  };
  const bebidas = [
    { id: "bebida1", nombre: "Coca-Cola" },
    { id: "bebida2", nombre: "Pepsi" },
    { id: "bebida3", nombre: "Fanta" },
    { id: "bebida4", nombre: "Sprite" },
    { id: "bebida5", nombre: "7 Up" },
    { id: "bebida6", nombre: "Dr. Pepper" },
    { id: "bebida7", nombre: "Mountain Dew" },
    { id: "bebida8", nombre: "Gatorade" },
    { id: "bebida9", nombre: "Red Bull" },
    { id: "bebida10", nombre: "Monster" },
  ];

  const personalizaciones = [
    { id: "personalizacion1", nombre: "Sin Carne" },
    { id: "personalizacion2", nombre: "Sin Queso" },
    { id: "personalizacion3", nombre: "Sin Lechuga" },
    { id: "personalizacion4", nombre: "Sin Tomate" },
    { id: "personalizacion5", nombre: "Sin Cebolla" },
    { id: "personalizacion6", nombre: "Sin Mayonesa" },
    { id: "personalizacion7", nombre: "Sin Pepinillos" },
    { id: "personalizacion8", nombre: "Sin Ketchup" },
    { id: "personalizacion9", nombre: "Sin Mostaza" },
    { id: "personalizacion10", nombre: "Sin Salsa BBQ" },
  ];

  const [selectedTasks, setSelectedTasks] = useState({});

  const handleCheckedChangeBebida = useCallback(
    (taskId: string | number, isChecked: boolean) => {
      setSelectedTasks((prev) => {
        return {
          ...prev,
          [taskId]: isChecked,
        };
      });
    },
    []
  );

  const [selectedTasksPersonalizaciones, setSelectedTasksPersonalizaciones] =
    useState({});

  const handleCheckedChangePersonalizaciones = useCallback(
    (taskId: string | number, isChecked: boolean) => {
      setSelectedTasksPersonalizaciones((prev) => {
        return {
          ...prev,
          [taskId]: isChecked,
        };
      });
    },
    []
  );

  return (
    <>
      <Stack.Screen options={{ title: "Recompensas" }} />
      <ScrollView style={tw`bg-white`}>
        <View style={tw`bg-white relative flex-1 h-410 `}>
          {/* Ajusta el valor de height según sea necesario */}
          <ImageBackground
            source={imagenBurguer}
            style={tw`w-full h-70 relative `}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              activeOpacity={0.8}
              style={tw`absolute top-14 left-5 bg-white rounded-full w-8 h-8 tablet:w-10 tablet:h-10 flex justify-center items-center mx-auto z-50 elevation-5 `}
            >
              <Ionicons
                name="arrow-back"
                style={tw`text-xl tablet:text-3xl`}
                color={tw.color("primary")}
              />
            </TouchableOpacity>
          </ImageBackground>

          <View style={tw`absolute top-40 w-full   p-5  `}>
            <View style={tw`bg-white rounded-lg shadow-md p-5 flex flex-col`}>
              <Text style={tw`text-gray-800 text-xl `}>Big Mac</Text>
              <Text style={tw`text-gray-400 text-sm`}>
                Doble Carne Royal, una propuesta que viene a mejorar tus
                mediodías. Dos medallones de la mejor carne 100% vacuna, queso
                cheddar, tomate, lechuga, cebolla y mayonesa en nuestro clásico
                pan con semillas de sésamos.
              </Text>
              <Text style={tw`text-gray-600 text-2xl my-2`}>$4.99</Text>
              <Text style={tw`text-gray-800 text-xl mb-2`}>Acompañamiento</Text>
              <View
                style={tw`flex flex-row items-center justify-between gap-2 `}
              >
                <Text style={tw`text-gray-400 text-sm`}>
                  Papas fritas medianas
                </Text>
                <CheckBoxCustom
                  taskId="tarea1"
                  isChecked={isChecked}
                  onCheckedChange={handleCheckedChange}
                />
              </View>
              <Text style={tw`text-gray-800 text-xl mt-4`}>Bebida</Text>
              {bebidas.map((bebida) => (
                <View
                  key={bebida.id}
                  style={tw`flex flex-row items-center justify-between gap-2 my-1 border-b-2 border-gray-200 py-2`}
                >
                  <Text style={tw`text-gray-400 text-sm`}>{bebida.nombre}</Text>
                  <CheckBoxCustom
                    taskId={bebida.id}
                    isChecked={!!selectedTasks[bebida.id]} // Esto debería ser específico para cada bebida
                    onCheckedChange={handleCheckedChangeBebida} // Esto debería manejar el cambio específico para cada bebida
                  />
                </View>
              ))}
              <Text style={tw`text-gray-800 text-xl mt-4`}>Personaliza</Text>
              {personalizaciones.map((personalizado) => (
                <View
                  key={personalizado.id}
                  style={tw`flex flex-row items-center justify-between gap-2 my-1 border-b-2 border-gray-200 py-2`}
                >
                  <Text style={tw`text-gray-400 text-sm`}>
                    {personalizado.nombre}
                  </Text>
                  <CheckBoxCustom
                    taskId={personalizado.id}
                    isChecked={
                      !!selectedTasksPersonalizaciones[personalizado.id]
                    } // Esto debería ser específico para cada bebida
                    onCheckedChange={handleCheckedChangePersonalizaciones} // Esto debería manejar el cambio específico para cada bebida
                  />
                </View>
              ))}

              <TouchableOpacity
                style={tw`bg-primary flex flex-row items-center justify-center px-2 py-4 w-10/12 rounded-full shadow-md mx-auto mt-4`}
              >
                <Text style={tw`text-white  text-lg   text-center`}>
                  Realizar Pedido
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={tw`absolute top-40 bg-primary p-2  right-8 rounded-full`}
          >
            <Text style={tw`text-white text-lg font-bold`}>2x1</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
