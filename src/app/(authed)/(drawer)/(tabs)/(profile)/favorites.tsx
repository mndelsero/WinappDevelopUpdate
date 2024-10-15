import WithLoading from "@/components/WithLoading";
import tw from "@/config/tw";
import ApiService from "@/services/ApiService";
import useGlobalStore from "@/store/useGlobalStore";
import { Business } from "@/utils/types";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Stack, usePathname, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery, useQueryClient } from "react-query";

export default function Favorites() {
  const router = useRouter();
  const { getToken } = useAuth();
  const { location, setSelectedBusiness } = useGlobalStore();
  const [businessFavorites, setBusinessFavorites] = useState([]);
  const [business, setBusiness] = useState<Business | null>(null);
  const [forceRefetch, setForceRefetch] = useState(true);

   	const pathname = usePathname();


  useEffect(() => {
    setForceRefetch(true);
  }, []);


  const { isFetching:isFetchingBusiness, data:BusinessData, isError:isErrorBusiness } = useQuery(
    ["business" , location.displayName],
    async () => {
      const token = await getToken();
      if (token === null) {
        throw new Error("No token");
      }
      const service = new ApiService(token);
      return service.getBusinessesByLocationAndCategory({
        token,
        latitude: location.lat,
        longitude: location.lng,
      });
    },
    {
      enabled: location.displayName !== "",
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
    }
  );

  



  useEffect(() => {
    if (BusinessData && BusinessData.status === "success") {
      const { nearbyBusinesses } = BusinessData.data;

      setBusiness(nearbyBusinesses);
    }
  }, [BusinessData]);


  const { isFetching, data:favoritesData, isError } = useQuery(
    ["favoritos" ,forceRefetch,pathname],
    async () => {
      const token = await getToken();
      if (token === null) {
        throw new Error("No token");
      }
      const service = new ApiService();
      return service.getFavorites(
        token,
        );
    },
    {
      enabled: true, // Habilita la query solo cuando forceRefetch es true
      staleTime: 0, // Deshabilita el almacenamiento en caché
      cacheTime: 0,
      refetchOnWindowFocus: true, // Asegúrate de que esto esté habilitado
      refetchOnMount: true,
      refetchOnReconnect: true,
      
     
    }
  );

  useEffect(() => {
    // Restablecer forceRefetch a false después de recibir los datos
    setForceRefetch(false);
  }, [favoritesData])



  useEffect(() => {
    if (favoritesData && favoritesData.status === "success") {
      const { data } = favoritesData;
  
      const favoriteBusinesses = data.map((favorite: any) => {
        if (!favorite || Object.keys(favorite).length === 0) {
          // Manejar el caso en que `favorite` esté vacío
          return null; // O puedes retornar un valor predeterminado
        }
  
        const businessItem = business.find((b: Business) => b.id === favorite.businessId);
        return businessItem;
      }).filter((item) => item !== null); // Filtrar los valores nulos
  
      setBusinessFavorites(favoriteBusinesses);
    }
  }, [favoritesData]);




  return (
    <>
    <Stack.Screen options={{ headerShown: false }} />
    <SafeAreaView style={tw`bg-white flex-1 `}>
      <View
        style={tw`h-1/10 flex flex-row justify-between  items-center px-4`}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.8}
          style={tw` bg-white rounded-full w-7 h-7 tablet:w-10 tablet:h-10 flex justify-center items-center  z-50 elevation-5 pl-1`}
        >
          <Ionicons
            name="arrow-back"
            style={tw`text-xl tablet:text-3xl`}
            color={tw.color("primary")}
          />
        </TouchableOpacity>

        <View style={tw`flex flex-row items-center justify-center gap-1 `}>
          <Text style={tw`text-lg font-bold text-gray-700`}>Favoritos</Text>
          <Ionicons name="heart" style={tw`text-xl text-primary `} />
        </View>
      </View>
      <ScrollView style={tw`bg-white flex-1 px-4`}>
        {isFetching ? (
          <View style={tw`flex-1 justify-center items-center`}>
            <ActivityIndicator size="large" color={tw.color("primary")} />
          </View>
        ) : (
          <View style={tw`flex flex-row flex-wrap justify-between p-5`}>
            {businessFavorites.length === 0 && (
              <Text style={tw`text-center text-gray-500 w-full`}>
                No se encontraron resultados
              </Text>
            )}
          </View>
        )}

        <View style={tw` tablet:mt-10 flex gap-3 tablet:gap-5  px-1`}>
          {businessFavorites?.map((business: Business) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedBusiness(business);
                router.push("/(authed)/(drawer)/(tabs)/(business)/");
              }}
              activeOpacity={0.5}
              key={business.id}
              style={tw`w-full  h-34 rounded-xl bg-white flex-row flex items-center justify-between  my-1 shadow-md  `}
            >
              <View style={tw`flex flex-col h-38 w-3/6 py-4  px-2`}>
                <View style={tw`flex flex-col items-start `}>
                  <Text
                    numberOfLines={1}
                    style={tw` text-lg tablet:text-3xl font-bold	mb-1`}
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
                  style={tw`flex flex-row items-start justify-end  w-full ml-2 absolute bottom-4`}
                >
                  {/* DISTANCIA SACADA POR latitude Y longitude*/}
                  <Text
                    style={tw`text-sm tablet:text-3xl bg-primary rounded-lg  px-2 py-1`}
                  >
                    {business.distance}
                  </Text>
                </View>
              </View>

              <View
                style={tw`w-3/6 h-34 tablet:h-30 tablet:w-40  flex items-center justify-center bg-[#DDDCDC] rounded-xl`}
              >
                <Image
                  style={tw`w-full h-34  tablet:w-20 tablet:h-20  rounded-r-lg`}
                  resizeMode="cover"
                  source={{ uri: business.banner }}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  </>
  );
}
