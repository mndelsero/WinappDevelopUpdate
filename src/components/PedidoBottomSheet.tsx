import React, { useEffect } from 'react'
import BottomSheet from "@gorhom/bottom-sheet";
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from '@/config/tw';
import CheckBoxCustom from './CheckBoxCustom';
import Input from './Input';
import { ScrollView } from "react-native-gesture-handler";
import { useState } from 'react';
import useGlobalStore from '@/store/useGlobalStore';
import { useAuth } from '@clerk/clerk-expo';
import ApiService from '@/services/ApiService';



interface PedidoBottomSheetProps {
  selectProductItem: any;
  setSelectedProduct:any;
  personalizaciones: any;
  selectedTasksPersonalizaciones: any;
  handleCheckedChangePersonalizaciones: any;
  count: number;
  setCount: any;
 
  addItem: any;
  router: any;
  setAdded: any;
  added: any;
  bottomSheetRef: any;
}



export const PedidoBottomSheet = ({ selectProductItem,personalizaciones, selectedTasksPersonalizaciones, handleCheckedChangePersonalizaciones, count, setCount,  addItem, router, setAdded, added, bottomSheetRef }: PedidoBottomSheetProps) => {
  const { getToken } = useAuth();
  const traerAddons = async () => {
      
    try {
      const token = await getToken();
      if (token === null) {
        throw new Error("No token");
      }
      const service = new ApiService();
      return service.getAddonsById(token)
     
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };


  const resetCount=()=>{
    setCount(1)
  }
 
  const handleClosePress = () => {
    resetCount();
    bottomSheetRef.current?.close();
  };


  return (
    <BottomSheet
      index={-1}
      snapPoints={["70%"]}
      ref={bottomSheetRef}
      style={tw`z-50 elevation-5`}
    >
      <View style={tw`relative`}>
        <TouchableOpacity
          onPress={handleClosePress}
          style={tw` bg-gray-200 rounded-full w-8 h-8 flex justify-center items-center   absolute top-0 right-4`}
        >
          <Ionicons
            name="close"
            style={tw`text-xl tablet:text-3xl`}
            color={tw.color("gray-800")}
          />
        </TouchableOpacity>

        <ScrollView style={tw`  mt-8 px-4`}>
          <Text style={tw`text-gray-800 text-lg`}>
            {selectProductItem?.name}
          </Text>
          <Text style={tw`text-gray-400 text-sm mt-2`}>
            {selectProductItem?.description}
          </Text>
          <Text style={tw`text-gray-800 text-sm mt-2 ml-2`}>
            Personaliza tu pedido
          </Text>
          <View style={tw`flex flex-col justify-center items-center mt-2 `}>
            {personalizaciones.map((personalizado:any) => (
              <View
                key={personalizado.id}
                style={tw`flex flex-row items-center justify-between gap-2 my-1 border-b-2 border-gray-200 py-2 w-10/12`}
              >
                <View
                  style={tw`flex flex-row items-center justify-between gap-2  `}
                >
                  <CheckBoxCustom
                    taskId={personalizado.id}
                    isChecked={
                      !!selectedTasksPersonalizaciones[personalizado.id]
                      
                    }
                    onCheckedChange={handleCheckedChangePersonalizaciones}
                    check2={true}
                  />
                  <Text style={tw`text-gray-400 text-sm`}>
                    {personalizado.name}
                  </Text>
                </View>
                <Text style={tw`text-gray-400 text-sm`}>
                  {personalizado.price == 0
                    ? "Gratis"
                    : personalizado.price + " $"}
                </Text>
              </View>
            ))}
          </View>

          <View style={tw`flex flex-col   mt-4 px-1`}>
            <Text style={tw`text-gray-800 text-lg`}>
              Intrucciones especiales
            </Text>
            <Input placeholder="Escribe aquí" />
            {/* Recompensa */}
            <Text style={tw`text-gray-800 text-lg`}>
              Recordar que tenes una recompensa!
            </Text>
            <Text
              style={tw`text-gray-800 text-sm bg-[#ffbf66] flex-wrap w-full py-2 rounded-sm px-1`}
            >
              Canjea 500 puntos y obtén la segunda unidad al 50%
            </Text>
            {/* End Recompensa */}
            <View
              style={tw`flex-row  justify-between  w-full my-4 border-t border-gray-300 pt-4`}
            >
              <View style={tw`flex-row `}>

                <Text style={tw`text-gray-800 text-lg mr-2`}>{count}</Text>
                <Text style={tw`text-gray-800 text-lg`}>
                  {selectProductItem?.name}
                </Text>

              </View>
              <Text style={tw`text-gray-800 text-lg`}>
                {selectProductItem?.unitPrice * count} $
              </Text>
            </View>
            <View
              style={tw`flex-row items-center justify-around  w-full my-4 border-t border-gray-300 pt-4`}
            >
              <View
                style={tw`flex-row items-center gap-2 bg-white rounded-full px-2 py-2 tablet:py-3 border border-primary  shadow-xl shadow-md`}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (count > 1) {
                      setCount(count - 1);
                     

                    }
                  }}
                >
                  <Ionicons
                    name="remove-circle-outline"
                    style={tw`text-black text-4xl tablet:text-6xl`}
                  />
                </TouchableOpacity>
                <Text
                  style={tw`text-xl tablet:text-4xl text-black  font-OpenSansBold`}
                >
                  {count}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    if (!selectProductItem) {
                      return;
                    }
                    console.log(selectProductItem)
                    if (count < selectProductItem?.stock) {
                      setCount(count + 1);
                    
                    }
                  }}
                >
                  <Ionicons
                    name="add-circle-outline"
                    style={tw`text-black  text-4xl tablet:text-6xl`}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={tw`bg-primary  h-14 tablet:w-50 tablet:h-20 rounded-full flex justify-center items-center shadow-md px-4`}
                onPress={() => {
                  console.log(selectProductItem)
                  if (!selectProductItem) {
                    return;
                  }
                  
                  setAdded(true);
                  addItem(selectProductItem, count,selectedTasksPersonalizaciones);
                  setTimeout(() => {
                    resetCount()
                    router.push("/(authed)/(drawer)/(tabs)/(business)");
                    setAdded(false);
                  }, 2000);
                }}
              >
                {added ? (
                  <Image
                    style={tw`w-10 h-10 tablet:w-16 tablet:h-16`}
                    source={{
                      uri: "https://media.tenor.com/bm8Q6yAlsPsAAAAi/verified.gif",
                    }}
                  />
                ) : (
                  <Text
                    style={tw`text-xl tablet:text-2xl font-OpenSans text-white`}
                  >
                    Agregar al carrito
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </BottomSheet>

  )
}
