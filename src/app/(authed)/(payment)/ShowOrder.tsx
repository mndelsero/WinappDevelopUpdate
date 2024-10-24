import Input from "@/components/Input";
import tw from "@/config/tw";
import ApiService from "@/services/ApiService";
import useCartStore from "@/store/useCartStore";
import useGlobalStore from "@/store/useGlobalStore";
import { Customization } from "@/utils/types";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { personalizaciones } from "../(drawer)/(tabs)/(business)";

export default function ShowOrder() {
  const { waitingOrderNow, setWaitingOrderNow } = useGlobalStore()
  const { getToken } = useAuth();
  const { addItem, removeItem, count, changes, clear, items } = useCartStore();
  const [personalizacionesPedido, setPersonalizacionesPedido] = useState<{ [key: string]: Customization[] }>({});
  useEffect(() => {
    const actualizarPersonalizaciones = () => {
      let nuevasPersonalizaciones: { [key: string]: Customization[] } = {};
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

  const totalPrice = (items.reduce((total, item) => {
    return total + item.product.unitPrice * item.count;
  }, 0)) * 1.05;


  const enviarPedido = async () => {
    const token = await getToken();
    if (token === null) {
      throw new Error("No token");
    }


    let productOrders = items.map((item) => {
      return {
        "productId": item.product.id,
        "quantity": item.count,
        "productOrderAddons": {
          "id": personalizacionesPedido.id,
          "quantity": 1
        }
      }
    })

    const order = {

      totalPrice: totalPrice, //agregar al precio total un 5% de comision (MULTIPLICAR EL PRECIO TOTAL POR 1.05)
      notes: "no necesariamente requerido",
      paymentId: "asdasdasd",
      businessId: items[0].product.businessId,

      productOrders: productOrders,
    }

    if (order) {


      const service = new ApiService();
      const waitingOrder = await service.createOrder(order, token)
      console.log(waitingOrder)
      setWaitingOrderNow(waitingOrder)
      router.push("/(authed)/(payment)/LoadingOrder")

    }

  }




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

            <ScrollView>

              <Text style={tw`text-gray-800 text-lg`}>Tus  Productos</Text>
              {
                items.map((item) => (

                  <TouchableOpacity


                    style={tw`flex flex-row justify-between  border-b border-gray-300 py-6`}
                    key={item.product.name}
                  >
                    <View style={tw`flex flex-col w-2/4`}>
                      <Text style={tw` flex flex-col text-gray-800 text-lg`}>{item.count} {item.product.name} {item.product.description}  </Text>

                      {personalizacionesPedido[item.product.name]?.map((personalizacion, index) => (
                        <View
                          key={index}
                          style={tw`flex flex-row w-auto justify-between`}>
                          <Text style={tw`text-gray-400 text-sm`}>
                            {personalizacion.name}
                          </Text>
                          <Text style={tw`text-gray-400 text-sm`}>
                            {personalizacion.price} $
                          </Text>
                        </View>


                      ))}




                    </View>
                    <View
                      style={tw`flex flex-col items-end justify-between w-2/5  `}
                    >
                      <Text style={tw`text-gray-800 text-lg mr-2`}>
                        Subtotal: {(item.product.unitPrice) * item.count} $
                      </Text>


                    </View>


                  </TouchableOpacity>


                ))
              }
              <View
                style={tw`flex flex-col items-end justify-end w-5/5  `}
              >
                <Text style={tw`text-gray-800 text-lg mr-2 w-2/5`}>
                  + Servicios (0.05%) $ =
                </Text>


              </View>


              <Text style={tw`text-gray-800 text-lg`}>Total: {totalPrice * 1.05
              } $
              </Text>





            </ScrollView>


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
              onPress={
                () => {
                  enviarPedido()


                }}
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
