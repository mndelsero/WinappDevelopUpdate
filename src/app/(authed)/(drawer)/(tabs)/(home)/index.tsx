import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import tw from "@/config/tw";
import BottomSheet from "@/components/BottomSheet";
import { useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {  TouchableOpacity } from "react-native-gesture-handler";
import { ScrollView } from 'react-native';
import useGlobalStore from "@/store/useGlobalStore";
import { useQuery } from "react-query";
import { Business, BusinessResponse } from "@/utils/types";
import ApiService from "@/services/ApiService";
import WithLoading from "@/components/WithLoading";
import useCartStore from "@/store/useCartStore";

import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import { GOOGLE_API_KEY } from "@/utils/constants";
import Button from "@/components/Button";
import { string } from "yup";





export default function Home() {
  const router = useRouter();
  const { getToken } = useAuth();
  const { location, setSelectedBusiness } = useGlobalStore();
  const { clear } = useCartStore();

  const ref = React.useRef<MapView>(null);
  const inputRef = React.useRef<GooglePlacesAutocompleteRef>(null);
  const [business, setBusiness] = useState([]);
  const [categorias, setCategorias] = useState([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>

  /*  ===============  Obtener la ubicación del usuario =============== */
  useEffect(() => {
    if (location.displayName !== "") {
      ref.current?.animateCamera({
        center: {
          latitude: location.lat,
          longitude: location.lng,
        },
        zoom: 15,
        altitude: 1000,
      });



      inputRef.current?.setAddressText(location.displayName);
    }
  }, [location]);

  /* ===============  Obtener los negocios cercanos =============== */

  const { isFetching, data, isError } = useQuery(
    ["businesses", location],
    async () => {
      const token = await getToken();
      if (token === null) {
        throw new Error("No token");
      }
      const service = new ApiService();
      return service.getBusinessesByLocationAndCategory({
        token,
        latitude: location.lat,
        longitude: location.lng,
      });
    }
    ,
    {
      enabled: location.displayName !== "",
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
    }
  );

  useEffect(() => {
    if (data && data.status === 'success' && data.data) {
      const { nearbyBusinesses } = data.data;

      setBusiness(nearbyBusinesses);
    }
  }, [data]);
  /* ==================== end =================
  
  
  
  /* =============== Obtener los Categorías  =============== */

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = await getToken();
        if (token === null) {
          throw new Error("No token");
        }
        const service = new ApiService();
        return service.getAllCategoriesBusinesses(token);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };


  }, []);



  const [selectedCategory, setSelectedCategory] = useState(null);
  const filteredNegocios = selectedCategory
    ? business.filter((businessItem) => businessItem.categoryId === selectedCategory)
    : business;

  const selectedCategoryName = categorias.find((item) => item.id === selectedCategory)?.name;





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
      <ScrollView 
     ref={scrollViewRef}
      style={tw`flex-col `}>
        <View style={tw`h-50vh flex-col w-full z-3  `}>

          <MapView
            provider={PROVIDER_GOOGLE}
            ref={ref}
            style={tw` h-50vh w-full`}
          >
            {location.displayName !== "" && (
              <Marker
                coordinate={{
                  latitude: location.lat,
                  longitude: location.lng,
                }}
                title="Tu ubicación"
                description="Selecciona tu ubicación"
              />
            )}
          </MapView>

          <View
            style={tw`bg-white       w-90vw bottom-40 left-5 rounded-2xl  p-3`}
          >
            <Text style={tw`text-center text-gray-400  text-sm tablet:text-3xl`}>
              Usted se encuentra en...
            </Text>
            <View style={tw`flex flex-row justify-center items-center`}>
              <Text
                style={tw.style(
                  "text-lg font-bold tablet:text-3xl tablet:mt-4 text-center",
                  location.displayName.length > 40 && "text-xs"
                )}
              >
                {location?.displayName}
              </Text>
            </View>
            <Text
              style={tw`text-left text-gray-700  text-xs tablet:text-3xl mt-2`}
            >
              Cambiar dirección
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(authed)/(location)/select-location")}
              style={tw`mt-0 px-2 flex flex-row justify-start items-center tablet:mt-7  gap-1  w-6/6 tablet:w-2/6 mx-auto rounded-xl bg-white tablet:rounded-2xl  py-2 tablet:py-3 shadow-md mt-0 `}
            >
              <Text style={tw`text-left text-gray-400  text-sm tablet:text-2xl`}>
                {location?.displayName ? "" : "Seleccionar dirección"}
                {location?.displayName?.length > 40
                  ? `${location.displayName.substring(0, 40)}...`
                  : location?.displayName}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={tw`bg-white w-full flex    `}>
          <View style={tw`bg-white  px-2 my-0 `}>
            <ScrollView
              style={tw`bg-white   w-full  rounded-lg  mt-0 pt-0`}
              horizontal={true}
              showsHorizontalScrollIndicator={false}


            >
              {categorias.map((item) => (
                <TouchableOpacity style={tw`px-2  flex flex-col items-center`}
                  key={item.id}
                  activeOpacity={0.5}
                  onPress={() => setSelectedCategory(item.id)}

                >
                  <View style={tw`flex items-center shadow-lg rounded-lg mb-3 bg-white w-16 h-16 `}>

                    <Image
                      source={{ uri: item.image }}
                      style={tw`w-18 h-18  rounded-lg  `}
                    />
                  </View>
                  <View style={tw`flex  items-center `}>
                    <Text style={tw`text-gray-800 text-sm`}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView >
            <View
              style={tw`bg-white  `}>
              <Text style={tw`tablet:text-2xl font-OpenSans py-4`}>
                {selectedCategoryName ? `${selectedCategoryName} disponibles cerca tuyo` : "Todos los negocios"}
              </Text>

              <WithLoading isLoading={isFetching} error={isError}
              >


                <View style={tw` tablet:mt-10 flex gap-10rem tablet:gap-5  px-1`}>
                  {filteredNegocios?.map((business: Business) => (
                    <TouchableOpacity
                      onPress={() => {
                        console.log(business.distance)
                        clear();
                        setSelectedBusiness(business);
                        router.push("/(authed)/(drawer)/(tabs)/(business)/");
                      }}
                      activeOpacity={0.5}
                      key={business.id}
                      style={tw`w-full  h-25 rounded-xl bg-white flex-row flex items-center justify-between  my-2 shadow-md  `}
                    >
                      <View style={tw`flex flex-col h-38 w-3/6 py-8  px-2`}>
                        <View style={tw`flex flex-col items-start `}>
                          <Text
                            numberOfLines={1}
                            style={tw` text-base tablet:text-3xl font-bold	mb-0  `}
                          >
                            {business.name}
                          </Text>
                          <Text
                            style={tw`text-xs  text-gray-400 tablet:text-xl mb-1`}
                          >
                            {business.description}
                          </Text>
                        </View>
                        {/* rating */}
                        <View
                          style={tw`flex flex-row items-center justify-start w-full ml-2 mt-2`}
                        >
                          <Ionicons
                            name="star"
                            style={tw`text-sm tablet:text-3xl text-primary`}
                          />

                          <Text style={tw`text-xs tablet:text-3xl text-gray-700`}>
                            {" "}
                            4.9 (286)
                          </Text>
                        </View>

                        <View
                          style={tw`flex flex-row items-start justify-end  w-full ml-2 absolute bottom-8`}
                        >
                          {/* DISTANCIA SACADA POR latitude Y longitude*/}
                          <Text
                            style={tw`text-0.8rem tablet:text-3xl bg-primary rounded-3px  px-2 py-1 `}
                          >
                            {business.distance}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={tw`w-3/6 h-25 tablet:h-30 tablet:w-40  flex items-center justify-center bg-[#DDDCDC] rounded-xl`}
                      >
                        <Image
                          style={tw`w-full h-25  tablet:w-20 tablet:h-20  rounded-r-lg`}
                          resizeMode="cover"
                          source={{ uri: business.banner }}
                        />
                      </View>
                    </TouchableOpacity>

                  ))}
                </View>



              </WithLoading>

             
            </View>
            
          </View>
          
        </View>
        
      </ScrollView>
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






