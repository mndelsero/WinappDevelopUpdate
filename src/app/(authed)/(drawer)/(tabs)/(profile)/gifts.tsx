import { ScrollView, StyleSheet, View, Text, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import tw from "@/config/tw";
import { IndividualImage } from "@/components/cardGifts";
import { useQuery } from "react-query";
import { useAuth } from "@clerk/clerk-expo";
import ApiService from "@/services/ApiService";
import useGlobalStore from "@/store/useGlobalStore";
import WithLoading from "@/components/WithLoading";
import { Award } from "@/utils/types";
import { Stack, usePathname } from "expo-router";
import BottomSheet, { TouchableOpacity } from "@gorhom/bottom-sheet";
import Button from "@/components/Button";
import { FlatList } from "react-native-gesture-handler";
import { delay } from "@/utils/helpers";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import * as Clipboard from 'expo-clipboard';

const Regalos = [
  { 
    id: 1,
    nombre: "Restaurantes",
    descuento: "20% de descuento",
    validado: "Valido hasta 25 de julio",
    codigo: "cupon123",
  },
  {
    id: 2,
    nombre: "Cafeterias",
    descuento: "2x1 en cafe",
    validado: "Valido hasta 25 de julio",
    codigo: "cupon124",
  },
  {
    id: 3,
    nombre: "Pizzerias",
    descuento: "30% de descuento",
    validado: "Valido hasta 25 de julio",
    codigo: "cupon125",
  },
  {
    id: 4,
    nombre: "Hamburguesas",
    descuento: "2x1 en hamburguesas",
    validado: "Valido hasta 25 de julio",
    codigo: "cupon126",
  },
  {
    id: 5,
    nombre: "Farmacias",
    descuento: "20% de descuento",
    validado: "Valido hasta 25 de julio",
    codigo: "cupon127",
  },
];

export default function Gifts() {
  const [loading, setLoading] = useState(false);
  const [qr, setQr] = useState({ qr: null, code: null });
  const ref = useRef<BottomSheet>(null);
  const { getToken, userId } = useAuth();
  const { selectedBusiness } = useGlobalStore();
  const pathname = usePathname();
  const [selected, setSelected] = useState<Award | null>(null);
  const [copiedText, setCopiedText] = React.useState('');

  const copyToClipboard = async (codigo) => {
    await Clipboard.setStringAsync(codigo);
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };


  const { data, isFetching, isError } = useQuery({
    queryKey: ["getGifts", pathname],
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    queryFn: async () => {
      const token = await getToken({ template: "supabase" });

      const apiService = new ApiService(token ?? "");
      const gifts = await apiService.getDiscounts(
        selectedBusiness?.id ?? 0,
        "gift"
      );
      return gifts;
    },
  });

  const [showText, setShowText] = useState(false);

  const showPoints = () => {
    setShowText(!showText);
  };

  useEffect(() => {
    ref.current?.close();
  }, [pathname]);

  const handleGenerateQR = async () => {
    setLoading(true);
    const token = await getToken({ template: "supabase" });
    const apiService = new ApiService(token ?? "");
    const existCode = await apiService.existCode(
      selected?.id ?? 0,
      userId ?? ""
    );
    if (existCode) {
      setQr({ qr: existCode.qr, code: existCode.code });
      setLoading(false);
      return;
    }
    const data = await apiService.generateQrCode(selected?.id ?? 0);
    setTimeout(() => {
      setLoading(false);
      setQr({ qr: data.qr, code: data.code });
    }, 2000);
  };




  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <View style={tw.style("flex-1 bg-white")}>
        <Text style={tw`text-center text-gray-800 text-2xl mt-5`}>
          Tus Regalos Disponibles
        </Text>

        <ScrollView style={tw`  p-5`}>
          {Regalos.map(({ id, nombre, descuento, validado, codigo }) => {
            return (
              <View key={id} style={tw`w-2/2  rounded-lg  my-2  `}>
                <View
                  style={tw`flex-row  rounded-lg  flex justify-center items-center bg-white shadow-md  mx-1 py-2`}
                >
                  <View style={tw`flex flex-col w-4/7 px-2`}>
                    <Text style={tw`text-gray-700  font-bold text-lg`}>
                      {descuento}
                    </Text>
                    <Text style={tw`text-gray-400   text-lg`}>{nombre}</Text>
                    <Text style={tw`text-gray-400   text-xs`}>{validado}</Text>
                  </View>

                  <View
                    style={tw`flex flex-col w-3/7 items-center justify-center`}
                  >
                    <View
                      style={tw`flex-col  items-center`}
                    >
                      <TouchableOpacity onPress={()=>copyToClipboard(codigo)} >
                        <FontAwesome name="copy" size={24} color="#4F8EF7"  />
                      </TouchableOpacity>
                      <Text style={tw`text-primary text-lg font-black`}>
                        {codigo}
                      </Text>
					
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/*  <WithLoading isLoading={isFetching} error={isError}>
          <FlatList
            data={data}
            style={tw`bg-white`}
            ListEmptyComponent={
              <View>
                <Text style={tw`text-center text-primary text-2xl mt-5`}>
                  No hay premios disponibles
                </Text>
              </View>
            }
            contentContainerStyle={tw`bg-white px-4 items-center justify-center pb-2`}
            ItemSeparatorComponent={() => <View style={tw`h-2`} />}
            renderItem={({ item }) => (
              <IndividualImage
                onPress={async (id) => {
                  console.log("id", item);
                  setSelected(item);
                  ref.current?.expand();
                }}
                image={item.image}
                description={item.description}
                id={item.id}
                key={item.id}
                type={item.type}
                point_cost={item.point_cost}
                discount={item.discount}
                name={item.name}
              />
            )}
          />
        </WithLoading>
        <ScrollView>
				<View style={tw`bg-background h-screen`}>
					<WithLoading isLoading={isFetching} error={isError}>
						<View
							style={tw.style("flex gap-5 mb-5 h-screen bg-background px-4")}
						>
							{data?.length === 0 && (
								<Text style={tw`text-center text-primary text-2xl mt-5`}>
									No hay premios disponibles
								</Text>
							)}
							{data?.map((gift: Award, index: number) => {
								return (
									<IndividualImage
										onPress={(id) => {
											const gift = data?.find((gift) => gift.id === id);
											setSelected(gift);
											ref.current?.expand();
										}}
										image="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F717761877848366%2F&psig=AOvVaw"
										description={gift.description}
										id={gift.id}
										key={gift.id}
										type={gift.type}
										point_cost={gift.point_cost}
										discount={gift.discount}
										name={gift.name}
									/>
								);
							})}
						</View>
					</WithLoading>
				</View>
			</ScrollView>

        <BottomSheet
          enablePanDownToClose
          index={-1}
          ref={ref}
          snapPoints={["70%"]}
          onClose={() => {
            setQr({ qr: null, code: null });
          }}
        >
          <View>
            {qr.code ? (
              <>
                <Image
                  style={tw`h-52 w-52 items-center justify-center mx-auto rounded-xl`}
                  source={{
                    uri:
                      qr.qr ??
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/220px-QR_code_for_mobile_English_Wikipedia.svg.png",
                  }}
                />
                <Text style={tw`text-center text-primary text-xl mt-1`}>
                  Tu codigo es {qr.code}
                </Text>
                <Text style={tw`text-center mt-2 text-primary text-lg px-2`}>
                  El codigo QR es valido por 5 minutos, presentalo en el negocio
                </Text>
                <Button
                  style="w-3/6 justify-center items-center mx-auto mt-2"
                  loading={loading}
                  onPress={() => {
                    setQr({ qr: null, code: null });
                  }}
                  title="Cancelar Codigo"
                />
              </>
            ) : (
              selected && (
                <>
                  <Image
                    style={tw`h-32 w-32 items-center justify-center mx-auto rounded-xl`}
                    source={{
                      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSzCqbkbbwQCYDSa7bZ5JVXSlel6FChVvrerLst7ld3w&s",
                    }}
                  />
                  <Text style={tw`text-center text-2xl text-primary mt-2`}>
                    {selected?.name}
                  </Text>
                  <Text style={tw`text-center text-2xl text-primary`}>
                    {selected?.description}
                  </Text>

                  <Text
                    style={tw`text-center text-base text-primary mt-3 px-2`}
                  >
                    Al presionar el boton se generara un codigo QR que podras
                    canjearlo en el negocio Tienes 5 minutos para canjearlo, de
                    lo contrario el codigo quedara invalido
                  </Text>

                  <Button
                    style="w-3/6 justify-center items-center mx-auto mt-5"
                    loading={loading}
                    onPress={() => {
                      handleGenerateQR();
                    }}
                    title="Generar Codigo"
                  />
                </>
              )
            )}
          </View>
        </BottomSheet> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  overlayText: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    backgroundColor: "#ff4500",
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
});
