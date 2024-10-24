import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ListProduct } from './ListProduct';
import tw from "@/config/tw";
import { router } from "expo-router";
import useCartStore, { CartItem } from "@/store/useCartStore";
import { Image } from 'react-native';
import { personalizaciones } from "@/app/(authed)/(drawer)/(tabs)/(business)";
import { Customization } from "@/utils/types";
import { useAuth } from "@clerk/clerk-expo";
import ApiService from "@/services/ApiService";


interface CarritoBottomSheetProps {
  productosCarrito: any;
  CarritobottomSheetRef: any;

}







export const CarritoBottomSheet = ({ productosCarrito, CarritobottomSheetRef }: CarritoBottomSheetProps) => {
  const { getToken } = useAuth();

  const { addItem, removeItem, count, changes, clear, items } = useCartStore();

  const [personalizacionesPedido, setPersonalizacionesPedido] = useState<{[key: string]: Customization[]}>({});
  useEffect(() => {
    const actualizarPersonalizaciones = () => {
      let nuevasPersonalizaciones: {[key: string]: Customization[]} = {};
      traerAddons()

      // Recorrer todos los items del carrito
      items.forEach(item => {
        const keys = Object.keys(item.selectedTasksPersonalizaciones);
        let personalizacionPedido: Customization[] = [];

        // Recorrer las claves y encontrar las personalizaciones correspondientes
        keys.forEach(key => {
          const encontrado = personalizaciones.find(elemento => elemento.id == key);
          if (encontrado) {
            personalizacionPedido.push(encontrado);
          }
        });

        // Almacenar las personalizaciones para este producto
        nuevasPersonalizaciones[item.product.name] = personalizacionPedido;

      });

      // Actualizar el estado con las nuevas personalizaciones
      setPersonalizacionesPedido(nuevasPersonalizaciones);
      personalizacionesPedido
    };

    // Ejecutar la función de actualización al montar el componente
    actualizarPersonalizaciones();
    
  }, [items]); // Se vuelve a ejecutar si los items cambian

 


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






  const handleClosePress = () => {
    CarritobottomSheetRef.current?.close();
  };


  return (
    <BottomSheet
      index={-1}
      snapPoints={["70%"]}
      ref={CarritobottomSheetRef}
      style={tw`z-50 elevation-5`}
    >
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
      <Text style={tw`text-gray-800 text-lg`}>

      </Text>

      <ScrollView style={tw` relative mt-8 px-4`}>
        {
          items.map((item) => (

            <TouchableOpacity
              onPress={() => {
              //   console.log(item.selectedTasksPersonalizaciones)
              //   const keys = Object.keys(item.selectedTasksPersonalizaciones);
              //  let personalizacionPedido:Customization[]=[]
              //   keys.forEach(key => {
              //     const encontrado = personalizaciones.find(elemento => elemento.id == key)
              //    console.log(encontrado)
              //    if(encontrado!== undefined){
              //     personalizacionPedido.push(encontrado)
              //    }
              //   })
              //   console.log(personalizacionPedido)
              }
              }
              style={tw`flex flex-row   border-b border-gray-300 py-6`}
              key={item.product.name}
            >
              <View style={tw`flex flex-col w-2/4`}>
                <Text style={tw`text-gray-800 text-lg`}>{item.product.name}</Text>
                <Text style={tw`text-gray-400 text-sm w-auto`}>
                  {item.product.description}
                </Text>
                <Text style={tw`text-gray-400 text-sm w-auto`}>
                  {item.count} Unidades
                </Text>

                {personalizacionesPedido[item.product.name]?.map((personalizacion, index) => (
                  <View 
                  key={index}
                  style={tw`flex flex-row w-auto justify-between`}>
                    <Text style={tw`text-gray-400 text-sm`}>
                {personalizacion.name}
              </Text>
              <Text  style={tw`text-gray-400 text-sm`}>
                {personalizacion.price} $
              </Text>
                     </View>
              
              
            ))}


              </View>
              <View
                style={tw`flex flex-col items-end justify-between w-1/4  `}
              >
                <Text style={tw`text-gray-800 text-lg mr-2`}>
                  {(item.product.unitPrice )* item.count} $
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    removeItem(item.product, item.count)
                  }
                  }
                  style={tw` bg-red rounded-full px-1 mr-2   flex justify-center items-center   `}
                >
                  <Ionicons
                    name="close"
                    style={tw`text-white text-xl tablet:text-3xl`}
                    color={tw.color("white")}
                  />
                </TouchableOpacity>
                {/*   <View>
                  {item.popular && (
                    <View
                      style={tw`bg-primary rounded-full px-2 py-1 mr-2 shadow-lg`}
                    >
                      <Text style={tw`text-white text-sm`}>Popular</Text>
                    </View>
                  )}
                </View> */}
              </View>
              <View style={tw`flex flex-col items-center w-1/4`}>
                {item && typeof item.product.image === 'string' && (
                  <Image
                    key={item.product.id}
                    source={{ uri: item.product.image }}
                    style={tw`w-20 h-20 rounded-lg`} />
                )}
              </View>

            </TouchableOpacity>


          ))
        }

        <View style={tw`flex flex-row justify-between items-center my-4`}>
          <Text style={tw`text-gray-800 text-lg`}>Total</Text>
          <Text style={tw`text-gray-800 text-lg`}>{
            items.reduce((total, item) => {
              return total + item.product.unitPrice * item.count ;
            }, 0)} $
          </Text>
        </View>


        <TouchableOpacity
          onPress={() => {
            router.push('/(authed)/(payment)/ShowOrder')
          }
          }
          style={tw`bg-primary w-10/12 p-3 my-6 rounded-full flex justify-center items-center mx-auto shadow-lg`}
        >
          <Text style={tw`text-white text-lg`}>Siguiente</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            clear()
          }
          }
          style={tw`bg-secondary w-10/12 p-3 my-0 rounded-full flex justify-center items-center mx-auto shadow-lg`}
        >
          <Text style={tw`text-white text-lg`}>Vaciar Carrito</Text>
        </TouchableOpacity>


      </ScrollView>

    </BottomSheet>
  )
}
