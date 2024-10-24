import {
  Dimensions,
  View,
  ImageBackground,
  Text,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import tw from "@/config/tw";
import useGlobalStore from "@/store/useGlobalStore";
import { useQuery } from "react-query";
import WithLoading from "@/components/WithLoading";
import { useAuth } from "@clerk/clerk-expo";
import ApiService from "@/services/ApiService";
import ProductCard from "@/components/ProductCard";
import { toast } from "@backpackapp-io/react-native-toast";
import { Product, Subscription } from "@/utils/types";
import SubscriptionInfo from "@/components/SubscriptionInfo";
import NoSubscriptionInfo from "@/components/NoSubscriptionInfo";
import useCartStore from "@/store/useCartStore";
import { useGlobalSearchParams, useRouter, useSegments } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { FlatGrid } from "react-native-super-grid";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import CheckBoxCustom from "@/components/CheckBoxCustom";
import Input from "@/components/Input";
import { set, sub } from "date-fns";
import { PedidoBottomSheet } from "@/components/PedidoBottomSheet";
import { ListProduct } from "@/components/ListProduct";
import { CarritoBottomSheet } from "@/components/CarritoBottomSheet";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
const categoriasArray = [
  {
    id: "5",
    name: "Promociones",
    productos: [
      {
        id: "1",
        name: "pizza 2x1",
        price: 5,
        image: require("../../../../../../assets/images/pizza/pizza1.jpg"),
        description: "2 pizzas por el precio de 1",
        popular: false,
      },
      {
        id: "2",
        name: "pizza 3x2",
        price: 5,
        image: require("../../../../../../assets/images/pizza/pizza2.jpg"),
        description: "3 pizzas por el precio de 2",
        popular: true,
      },
      {
        id: "3",
        name: "pizza + menú",
        price: 5,
        image: require("../../../../../../assets/images/pizza/pizza3.jpg"),
        description: "pizza + bebida + postre",
        popular: false,
      },
      {
        id: "4",
        name: "pizza + patatas",
        price: 5,
        image: require("../../../../../../assets/images/pizza/pizza4.jpg"),
        description: "pizza con patatas + bebida",
        popular: false,
      },
      {
        id: "5",
        name: "pizza + menú completo",
        price: 5,
        image: require("../../../../../../assets/images/pizza/pizza5.jpg"),
        description: "pizza + bebida + postre + café",
        popular: false,
      },
    ],
  },
  {
    id: "1",
    name: "Bebidas",
    productos: [
      {
        id: "1",
        name: "Coca Cola",
        price: 1.5,
        image: null,
        description: "Coca Cola 33cl",
        popular: false,
      },
      {
        id: "2",
        name: "Fanta",
        price: 12.5,
        image: null,
        description: "Fanta 33cl",
        popular: true,
      },
      {
        id: "3",
        name: "Aquarius",
        price: 13.5,
        image: null,
        description: "Aquarius 33cl",
        popular: false,
      },
      {
        id: "4",
        name: "Nestea",
        price: 14.5,
        image: null,
        description: "Nestea 33cl",
        popular: false,
      },
      {
        id: "5",
        name: "Agua",
        price: 132.5,
        image: null,
        description: "Agua 33cl",
        popular: false,
      },
    ],
  },

  {
    id: "2",
    name: "Comida",
    productos: [
      {
        id: "1",
        name: "Hamburguesa",
        price: 5,
        image: null,
        description: "Hamburguesa de ternera",
        popular: false,
      },
      {
        id: "2",
        name: "Pizza",
        price: 5,
        image: null,
        description: "Pizza de jamón y queso",
        popular: false,
      },
      {
        id: "3",
        name: "Perrito",
        price: 5,
        image: null,
        description: "Perrito caliente",
        popular: false,
      },
      {
        id: "4",
        name: "Ensalada",
        price: 5,
        image: null,
        description: "Ensalada de la casa",
        popular: false,
      },
      {
        id: "5",
        name: "Pasta",
        price: 5,
        image: null,
        description: "Pasta con tomate",
        popular: false,
      },
    ],
  },
  {
    id: "3",
    name: "Postres",
    productos: [
      {
        id: "1",
        name: "Tarta",
        price: 3,
        image: null,
        description: "Tarta de queso",
        popular: false,
      },
      {
        id: "2",
        name: "Helado",
        price: 3,
        image: null,
        description: "Helado de chocolate",
        popular: false,
      },
      {
        id: "3",
        name: "Fruta",
        price: 3,
        image: null,
        description: "Fruta del tiempo",
        popular: false,
      },
      {
        id: "4",
        name: "Yogur",
        price: 3,
        image: null,
        description: "Yogur natural",
        popular: false,
      },
      {
        id: "5",
        name: "Flan",
        price: 3,
        image: null,
        description: "Flan casero",
        popular: false,
      },
    ],
  },
  {
    id: "4",
    name: "Combos",
    productos: [
      {
        id: "1",
        name: "Menú",
        price: 8,
        image: null,
        description: "Hamburguesa + patatas + bebida",
        popular: false,
      },
      {
        id: "2",
        name: "Menú infantil",
        price: 8,
        image: null,
        description: "Perrito + patatas + bebida",
        popular: false,
      },
      {
        id: "3",
        name: "Menú vegano",
        price: 8,
        image: null,
        description: "Hamburguesa vegana + patatas + bebida",
        popular: false,
      },
    ],
  },
];

 export const personalizaciones = [
  {
    id: "1",
    name: "Extra queso",
    price: 1,
    ischecked:false,
  },
  {
    id: "2",
    name: "Extra tomate",
    price: 5.6,
    ischecked:false,
  },

  {
    id: "3",
    name: "Extra cebolla",
    price: 0,
    ischecked:false,
  },
];

const productosCarrito = [
  {
    id: "1",
    name: "pizza 2x1",
    price: 5,
    image: require("../../../../../../assets/images/pizza/pizza1.jpg"),
    description: "2 pizzas por el precio de 1",
    popular: false,
  },
  {
    id: "2",
    name: "pizza 3x2",
    price: 5,
    image: require("../../../../../../assets/images/pizza/pizza2.jpg"),
    description: "3 pizzas por el precio de 2",
    popular: true,
  },
  {
    id: "3",
    name: "pizza + menú",
    price: 5,
    image: require("../../../../../../assets/images/pizza/pizza3.jpg"),
    description: "pizza + bebida + postre",
    popular: false,
  },
  {
    id: "4",
    name: "pizza + patatas",
    price: 5,
    image: require("../../../../../../assets/images/pizza/pizza4.jpg"),
    description: "pizza con patatas + bebida",
    popular: false,
  },
  {
    id: "5",
    name: "pizza + menú completo",
    price: 5,
    image: require("../../../../../../assets/images/pizza/pizza5.jpg"),
    description: "pizza + bebida + postre + café",
    popular: false,
  },
];

export default function HomeTabs() {
  const ref = React.useRef<MapView>(null);
  const inputRef = React.useRef<GooglePlacesAutocompleteRef>(null);
  const { setSelectedProduct, location } = useGlobalStore();
  const { addItem } = useCartStore();
  const [count, setCount] = React.useState(1);
  const [added, setAdded] = React.useState(false);
  const [selectProductItem, setSelectProductItem] = useState(null);
 
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);

  const [dataSubscription, setDataSubscription] = useState<Subscription | null>(
    null
  );
  const params = useGlobalSearchParams();
  const { selectedBusiness } = useGlobalStore();
  const { getToken, userId } = useAuth();
  const [loading, setLoading] = useState(false);
  const pathname = useRoute();
  const [visible, setVisible] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const router = useRouter();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState([]);
  const [activeSubscription, setActiveSubscription] = useState(false);

  const [reload, setReload] = useState(false);
  const { items, clear } = useCartStore((state) => state);


/* ================================= cerrar todo los buttonSeek ========================== */
  useEffect(() => {
    if (DetailsBusinessSheetRef.current) {
      DetailsBusinessSheetRef.current.close();
    }

    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
      setCount(1)
    }

    if (CarritobottomSheetRef.current) {
      CarritobottomSheetRef.current.close();
    }

    if (visible===false) {
      setVisible(true);
    }
  }, [pathname]);



  // Obtener categorías de los productos
  const {
    isFetching,
    data: categoryData,
    isError,
  } = useQuery(
    ["categoriasData"],
    async () => {
      const token = await getToken();
      if (token === null) {
        throw new Error("No token");
      }
      const service = new ApiService();
      return service.getAllCategoriesProducts(token);
    },
    {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
    }
  );

  useEffect(() => {
    if (categoryData && categoryData.status === "success") {
      const { productCategories } = categoryData.data;
      setCategorias(productCategories);
      setCategoriaSeleccionada(productCategories[0]);
    }
  }, [categoryData]);

  // Obtener productos por negocio

  const {
    isFetching: isFetchingProducts,
    data: productsData,
    isError: isErrorProducts,
  } = useQuery(
    ["productsData", selectedBusiness],
    async () => {
      const token = await getToken();
      if (token === null) {
        throw new Error("No token");
      }
      const service = new ApiService();
      return service.getProductsByBusinessId({
        token: token,
        businessId: selectedBusiness?.id,
      });
    },
    {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
    }
  );

  useEffect(() => {
    if (productsData && productsData.status === "success") {
      const { products } = productsData.data;
      
      setProductos(products);
    }
  }, [productsData]);

  const filterProducts = () => {
    if (categoriaSeleccionada === null) {
      return productos;
    }
    const productosFiltrados = productos.filter(
      (item) => item.categoryId === categoriaSeleccionada.id
    );

    return productosFiltrados;
  };

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

  const bottomSheetRef = useRef<BottomSheet>(null);
  const setSheetIndex = (item: any) => {
    setSelectProductItem(item);

    if (bottomSheetRef.current) {
      bottomSheetRef.current.expand();
    }
  };

  const CarritobottomSheetRef = useRef<BottomSheet>(null);
  const setSheetIndexCarrito = (item: any) => {
    if (CarritobottomSheetRef.current) {
      CarritobottomSheetRef.current.expand();
    }
  };

  const DetailsBusinessSheetRef = useRef<BottomSheet>(null);

  const setSheetIndexDetailsBusiness = (item: any) => {
    if (DetailsBusinessSheetRef.current) {
      DetailsBusinessSheetRef.current.expand();
    }
  };

  useEffect(() => {
   
    if (DetailsBusinessSheetRef.current) {
      DetailsBusinessSheetRef.current.close();
    }
  }, []);

  /* ====================================Obtener Suscripciones===============================  */

  const {
    data: subscriptionsData,
    isFetching: isFetchingSubscriptions,
    isError: isErrorSubscriptions,
    refetch,
  } = useQuery<Subscription | null>(
    ["subscriptionData", selectedBusiness, reload],
    async () => {
      const token = await getToken();
      if (selectedBusiness === null) {
        throw new Error("No business selected");
      }
      if (token === null) {
        throw new Error("No token");
      }
      const service = new ApiService();
      return service.getSubscriptions(token);
    },
    {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
    }
  );

  useEffect(() => {
    if (subscriptionsData && subscriptionsData.status === "success") {
      setVisible(true);
      const { subscriptions } = subscriptionsData.data;

      setActiveSubscription(false);

      if (subscriptions.length > 0) {
        subscriptions.forEach((subscription: Subscription) => {
          if (subscription.businessId === selectedBusiness?.id) {
            setActiveSubscription(true);
            setDataSubscription(subscription);
          }
        });
      }

     
    }
  }, [subscriptionsData]);

  
  // ============================ cerrar todo al salir ==========================

  
 


  //  Suscribirse a un negocio

  const handleSubscribe = async () => {
    setLoading(true);

    try {
      const token = await getToken();
      if (token === null) {
        toast.error("No estás logueado");
        setLoading(false);
        return;
      }
      if (selectedBusiness === null) {
        toast.error("No hay un negocio seleccionado");
        setLoading(false);
        return;
      }


      

      const service = new ApiService();
      const response = await service.subscribe(selectedBusiness.id, token);

      setReload(!reload);
     
    } catch (error) {
      console.error("Error en la suscripción:", error);
      toast.error("Error en la suscripción");
    } finally {
      setLoading(false);
    }
  };

  /*  ===============================favoritos==============================  */

  const { data: favoritesData } = useQuery(
    ["favoritos", selectedBusiness],
    async () => {
      const token = await getToken();
      if (token === null) {
        throw new Error("No token");
      }
      const service = new ApiService(token);
      return service.getFavorites(token);
    },
    {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      staleTime: 1000, // Datos obsoletos después de 1 segundo
      cacheTime: 5000,
    }
  );

  useEffect(() => {
    if (favoritesData && favoritesData.status === "success") {
      const { data } = favoritesData;
      const favoriteBusinesses = data.map((favorite: any) => {
        return favorite.businessId;
      });

      if (favoriteBusinesses.includes(selectedBusiness?.id)) {
        setFavorite(true);
      } else {
        setFavorite(false);
      }
    }
  }, [favoritesData]);

  const handleFavorite = async () => {
    try {
      const token = await getToken();
      if (token === null) {
        toast.error("No estás logueado");
        return;
      }
      if (selectedBusiness === null) {
        toast.error("No hay un negocio seleccionado");
        return;
      }

      setFavorite((prevFavorite) => !prevFavorite);

      const service = new ApiService(token);
      const response = await service.AddAndRemoveFavorite(
        selectedBusiness?.id,
        token
      );

      if (!response || response.status !== "success") {
        setFavorite((prevFavorite) => !prevFavorite);
        toast.error("Error al agregar o eliminar favoritos");
        return;
      }

      const { active } = response.data;
      if (active) {
        toast.success("Negocio agregado a favoritos");
      } else {
        toast.success("Negocio eliminado de favoritos");
      }
    } catch (error) {
      setFavorite((prevFavorite) => !prevFavorite);
      console.error("Error al agregar o eliminar favoritos:", error);
      toast.error("Error al agregar o eliminar favoritos");
    }
  };



  return (
    <View style={tw`bg-white h-full relative`}>
      <ScrollView style={tw`h-full relative`}>
        <View style={tw`relative `}>
          <WithLoading
            isLoading={isFetchingSubscriptions}
            error={isErrorSubscriptions}
          >
            {!activeSubscription && (
              <NoSubscriptionInfo
                selectedBusiness={selectedBusiness}
                loading={loading}
                handleSubscribe={handleSubscribe}
                visible={visible}
                setVisible={setVisible}
              />
            )}

            <ImageBackground
              source={{ uri: selectedBusiness?.banner ?? "" }}
              style={tw`h-80 w-full`}
            >
              <SafeAreaView style={tw`flex-row justify-between pt-4`}>
                <TouchableOpacity
                  onPress={() => router.back()}
                  activeOpacity={0.8}
                  style={tw` bg-white rounded-full w-8 h-8 tablet:w-10 tablet:h-10 flex justify-center items-center ml-5  z-50 elevation-5 `}
                >
                  <Ionicons
                    name="arrow-back"
                    style={tw`text-xl tablet:text-3xl`}
                    color={tw.color("primary")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleFavorite}
                  activeOpacity={0.8}
                  style={tw` bg-white rounded-full w-8 h-8 tablet:w-10 tablet:h-10 flex justify-center items-center mr-5  z-50 elevation-5 `}
                >
                  {favorite ? (
                    <Ionicons
                      name="heart"
                      style={tw`text-xl tablet:text-3xl`}
                      color={tw.color("primary")}
                    />
                  ) : (
                    <Ionicons
                      name="heart-outline"
                      style={tw`text-xl tablet:text-3xl`}
                      color={tw.color("primary")}
                    />
                  )}
                </TouchableOpacity>
              </SafeAreaView>
            </ImageBackground>
            <View
              style={tw`absolute w-full   top-60 justify-center items-center shadow-lg `}
            >
              <View
                style={tw`flex flex-col justify-between w-11/12 bg-white rounded-lg px-4 pt-4  shadow-lg `}
              >
                <View
                  style={tw`flex flex-row justify-between items-center border-b border-gray-300 pb-3`}
                >
                  <View style={tw`flex flex-col`}>
                    <Text style={tw`text-gray-800 text-xl`}>
                      {selectedBusiness?.name}
                    </Text>
                    <Text style={tw`text-gray-400 text-sm`}>
                      {selectedBusiness?.description}
                    </Text>
                  </View>
                  {/*  */}
                  <TouchableOpacity
                    style={tw`flex flex-col items-center`}
                    onPress={setSheetIndexDetailsBusiness}
                  >
                    <Image
                      source={{
                        uri: selectedBusiness ? selectedBusiness.logo : "",
                      }}
                      style={tw`w-20 h-20 `}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={tw`flex flex-row justify-between items-center pt-3`}
                >
                  <View
                    style={tw`flex flex-row items-center justify-start  ml-6 mb-1`}
                  >
                    <Ionicons
                      name="star"
                      style={tw`text-sm tablet:text-3xl text-primary`}
                    />

                    <Text style={tw`text-sm tablet:text-3xl text-gray-700`}>
                      {" "}
                      4.9 (286)
                    </Text>
                  </View>

                  <View
                    style={tw`flex flex-row items-center justify-start  ml-6 mb-1`}
                  >
                    <Ionicons
                      name="time-outline"
                      style={tw`text-sm tablet:text-3xl text-gray-400`}
                    />

                    <Text style={tw`text-sm tablet:text-3xl text-gray-700`}>
                      {" "}
                      15-25 min
                    </Text>
                  </View>
                </View>
                <View style={tw`flex  items-center justify-center `}>
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    style={tw`text-4xl  text-primary`}
                  />
                </View>
              </View>
              {activeSubscription && (
                <View
                  style={tw`flex flex-row  w-10/12 bg-primary rounded-b-lg p-4 shadow-lg gap-2 items-center justify-center`}
                >
                  <Text style={tw`text-white text-lg`}>Tus puntos:</Text>
                  <Text style={tw`text-white text-3xl font-black`}>
                    {dataSubscription?.credits}
                  </Text>
                  <Text style={tw`text-white text-lg`}>Créditos</Text>
                </View>
              )}
            </View>

            {/* Slider de productos favoritos */}
            <Text style={tw`text-gray-800 text-lg mt-50 ml-4`}>
              Pedidos mas populares
            </Text>
            <ScrollView
              style={tw` bg-white py-4  `}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {categoriasArray[0].productos.map((item) => (
                <TouchableOpacity
                  style={tw`px-2 py-2 `}
                  key={item.id}
                  onPress={() => setSheetIndex(item)}
                >
                  <Image
                    source={
                      item.image != null
                        ? item.image
                        : require("../../../../../../assets/images/slider2.png")
                    }
                    style={tw`w-60 h-40  rounded-lg mb-2`}
                  />
                  <View style={tw`flex flex-row justify-between px-2`}>
                    <Text style={tw`text-gray-800 text-lg`}>{item.name}</Text>
                    <Text style={tw`text-gray-800 text-lg`}>
                      {item.price} $
                    </Text>
                  </View>
                  <Text style={tw`text-gray-400 text-sm w-auto px-2`}>
                    {item.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* FIltro de categorias  */}

            <ScrollView
              style={tw` bg-white pt-2   border-b border-gray-800 `}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {categorias.map((item) => (
                <TouchableOpacity
                  style={tw`px-2 py-2 `}
                  key={item.id}
                  onPress={() => setCategoriaSeleccionada(item)}
                >
                  <Text
                    style={tw`text-gray-800 text-lg ${
                      categoriaSeleccionada.id === item.id ? "text-primary" : ""
                    }`}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {categoriaSeleccionada &&
              (filterProducts().length > 0 ? (
                filterProducts().map((item: Product) => (
                  <ListProduct
                    item={item}
                    setSheetIndex={setSheetIndex}
                    key={item.id}
                  />
                ))
              ) : (
                <Text style={tw`text-gray-800 text-sm py-6 ml-4`}>
                  No hay productos disponibles en esta categoría
                </Text>
              ))}
          </WithLoading>
        </View>
      </ScrollView>

      {/* Carrito */}
      <TouchableOpacity
        onPress={() => setSheetIndexCarrito(productosCarrito)}
        style={tw`bg-primary w-12 h-12 flex justify-center items-center absolute bottom-4 right-4  elevation-1 rounded-full shadow-md`}
      >
        <Ionicons name="cart" style={tw`text-2xl text-white`} />
      </TouchableOpacity>

      {/* Pedido Bottom Sheep  */}
      <PedidoBottomSheet
        selectProductItem={selectProductItem}
        setSelectedProduct={selectProductItem}
        personalizaciones={personalizaciones}
        selectedTasksPersonalizaciones={selectedTasksPersonalizaciones}
        handleCheckedChangePersonalizaciones={
          handleCheckedChangePersonalizaciones
        }
        count={count}
        setCount={setCount}
        addItem={addItem}
        router={router}
        setAdded={setAdded}
        added={added}
        bottomSheetRef={bottomSheetRef}
      />

      {/* Carrito BottomSheet */}
      <CarritoBottomSheet
        productosCarrito={productosCarrito}
        CarritobottomSheetRef={CarritobottomSheetRef}
      />

      {/* Detalles de negocio BottomSheet */}

      <BottomSheet
        index={-1}
        snapPoints={["80%"]}
        ref={DetailsBusinessSheetRef}
        style={tw`z-50 elevation-5 `}
      >
        <View
          style={tw`flex flex-row justify-between items-center bg-white  relative mb-10 `}
        >
          <TouchableOpacity
            onPress={() => DetailsBusinessSheetRef.current?.close()}
            style={tw` bg-gray-200 rounded-full w-8 h-8 flex justify-center items-center   absolute top-0 right-4`}
          >
            <Ionicons
              name="close"
              style={tw`text-xl tablet:text-3xl`}
              color={tw.color("gray-800")}
            />
          </TouchableOpacity>
        </View>

        <View style={tw`h-3/7 bg-gray-500 relative`}>
          <MapView
            provider={PROVIDER_GOOGLE}
            ref={ref}
            style={tw`h-full w-full`}
            initialRegion={{
              latitude: selectedBusiness.latitude,
              longitude: selectedBusiness.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            zoomEnabled={true}
            scrollEnabled={true}
          >
            {location.displayName !== "" && (
              <Marker
                coordinate={{
                  latitude: selectedBusiness.latitude,
                  longitude: selectedBusiness.longitude,
                }}
                title="Tu ubicación"
                description="Selecciona tu ubicación"
              />
            )}
          </MapView>
        </View>
        <ScrollView style={tw`h-4/7 bg-white p-3`}>
          <Text style={tw`text-gray-800 text-lg`}>
            {selectedBusiness?.name}
          </Text>
          <Text style={tw`text-gray-500 text-sm mb-4`}>
            {selectedBusiness?.description}
          </Text>
          <View style={tw`flex flex-row items-start mb-4 gap-1`}>
            <Ionicons name="location" style={tw`text-xl text-red-400`} />

            <Text
              style={tw`text-gray-400 text-sm border-b border-gray-400 pb-2 w-11/12`}
            >
              {selectedBusiness?.address}
            </Text>
          </View>
          <View style={tw`flex flex-row items-start mb-4 gap-1`}>
            <Ionicons name="time-outline" style={tw`text-lg text-gray-400 `} />

            <View style={tw` border-b border-gray-400 pb-2 w-11/12`}>
              <Text style={tw`text-gray-900 text-sm`}>Horario de atención</Text>
              <Text style={tw`text-gray-400 text-sm`}>8:00 am - 10:00 pm</Text>
            </View>
          </View>
          <View style={tw`flex flex-row items-start mb-4 gap-2 `}>
            <Ionicons name="star" style={tw`text-sm text-primary pb-4`} />

            <Text
              style={tw`text-gray-800 text-sm border-b border-gray-400 pb-4 w-11/12`}
            >
              4.9 (286 opiniones)
            </Text>
          </View>
        </ScrollView>
      </BottomSheet>

      {/* <WithLoading
				}
                <Ionicons
				
                  name="heart-outline"
                  style={tw`text-xl tablet:text-3xl`}
                  color={tw.color("primary")}
                />
              </TouchableOpacity>
            </SafeAreaView>
			
          </ImageBackground>
        </WithLoading>
      </ScrollView>
*/}
      {/* <WithLoading
				isLoading={isFetchingSubscriptions}
				error={isErrorSubscriptions}
			>
				{subscriptions != null ? (
					<WithLoading isLoading={isFetchingProducts} error={isErrorProducts}>
						<FlatGrid
							ListHeaderComponent={() => (
								<SubscriptionInfo subscriptions={subscriptions} />
							)}
							itemDimension={Dimensions.get("window").width >= 1024 ? 280 : 150}
							data={products || []}
							style={tw`flex-1`}
							renderItem={({ item }) => {
								let count = 0;
								const cartItem = items.find((i) => i.product.id === item.id);
								if (cartItem) {
									count = cartItem.count;
								}

								return <ProductCard product={item} count={count} />;
							}}
						/>
					</WithLoading>
				) : (
					<NoSubscriptionInfo
						selectedBusiness={selectedBusiness}
						loading={loading}
						handleSubscribe={handleSubscribe}
					/>
				)}
			</WithLoading>  */}
    </View>
  );
}
