import tw from "@/config/tw";
import { useAuth } from "@clerk/clerk-expo";
import { FontAwesome } from "@expo/vector-icons";
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState ,useRef} from "react";
import { Text, TextInput, View, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import { API_URL } from "@/utils/constants";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ApiService from "@/services/ApiService";
import useGlobalStore from "@/store/useGlobalStore";



export default function search() {
  const [imagenesCargadas, setImagenesCargadas] = useState({});

  const { getToken } = useAuth();
  const [categorias, setCategorias] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);

  const { location,setCategoria } = useGlobalStore();

  const router = useRouter();

    
  
  const { isFetching, data, isError } = useQuery("categorias", 
    async () => {
      const token = await getToken();
      if (token === null) {
        throw new Error("No token");
      }
      const service = new ApiService(token);
      return service.getAllCategoriesBusinesses(token);
    },
  );
  
  useEffect(() => {
    if (data && data.status === 'success') {
      const { businessCategories } = data.data;
      setCategorias(businessCategories);
      setCategoriasFiltradas(businessCategories);
    }
  }, [data]);

  const filtrarCategorias = (texto) => {
    setBusqueda(texto);
    if (data && data.status === 'success') {
      const categorias = data.data.businessCategories;
      const categoriasFiltradas = categorias.filter((categoria) =>
        categoria.name.toLowerCase().includes(texto.toLowerCase())
      );
      setCategoriasFiltradas(categoriasFiltradas);
    }
  };


  const handleLoad = (id) => {
    setImagenesCargadas((prevState) => ({ ...prevState, [id]: true }));
  }; 

  // Buscar Business de category

   const handleCategory = async (categoryId: string,name:string) => {
    setCategoria({ id: categoryId, name: name });
    router.push(`/(authed)/(drawer)/(tabs)/(search)/businessForCategory`);
    return [];
  }






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
      <SafeAreaView 
      style={tw`bg-white flex-1`}>
        <ScrollView 
        ref={scrollViewRef}
        style={tw`bg-white flex-1 `}>
          <View style={tw`p-5 `}>
            <View
              style={tw`flex-row bg-gray-200 p-2 rounded-lg w-11/12 mx-auto items-center`}
            >
              <FontAwesome
                name="search"
                size={20}
                color="#000"
                style={tw`ml-2`}
              />
              <TextInput
                style={tw`bg-gray-200 pl-4 pr-2  rounded-lg flex-1`}
                placeholder="Buscar"
                value={busqueda}
                onChangeText={filtrarCategorias}
              />
            </View>
          </View>

         {location ? (
            isFetching ? (
              <View style={tw`flex-1 justify-center items-center`}>
                <ActivityIndicator size="large" color={tw.color("primary")} />
              </View>
            ) : (
              <View style={tw`flex flex-row flex-wrap justify-between p-5`}>
                {categoriasFiltradas.length === 0 && (
                  <Text style={tw`text-center text-gray-500 w-full`}>No se encontraron resultados</Text>
                )}
                {categoriasFiltradas.length > 0 &&
                  categoriasFiltradas.map(({ id, name, image }) => (
                    <View key={id} style={tw`w-1/2 p-2`}>
                      <TouchableOpacity style={tw`bg-white h-40 rounded-lg shadow-lg`}
                      onPress={() => handleCategory(id,name)}>
                        {!imagenesCargadas[id] && (
                          <ActivityIndicator
                            size="large"
                            color={tw.color("primary")}
                            style={tw`w-full h-4/5`}
                          />
                        )}
                        <Image
                          source={{ uri: image }}
                          style={{
                            ...tw`w-full h-4/5 rounded-lg`,
                            opacity: !imagenesCargadas[id] ? 0 : 1,
                          }}
                          onLoad={() => handleLoad(id)}
                        />
                        <Text style={tw` flex items-center justify-center text-gray-600 text-center text-xs font-bold my-auto`}>
                          {name}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))
                }
              </View>
            )
          ) : (
            <Text style={tw`text-center text-gray-500`}>
              No se ha podido obtener la ubicación actual
            </Text>
          )}
          
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
