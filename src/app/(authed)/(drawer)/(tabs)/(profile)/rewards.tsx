import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import tw from "@/config/tw";
import { IndividualImage } from "@/components/cardGifts";
import { useQuery } from "react-query";
import { useAuth } from "@clerk/clerk-expo";
import ApiService from "@/services/ApiService";
import useGlobalStore from "@/store/useGlobalStore";
import WithLoading from "@/components/WithLoading";
import { Award } from "@/utils/types";
import { usePathname, Stack, useRouter } from "expo-router";
import BottomSheet from "@gorhom/bottom-sheet";
import Button from "@/components/Button";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { delay } from "@/utils/helpers";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";

import imagenBurguer from "../../../../../../assets/images/slider2.png";

export default function Rewards() {
  const [loading, setLoading] = useState(false);
  const [qr, setQr] = useState({ qr: null, code: null });
  const ref = useRef<BottomSheet>(null);
  const { getToken, userId } = useAuth();
  const { selectedBusiness } = useGlobalStore();
  const pathname = usePathname();
  const [selected, setSelected] = useState<Award | null>(null);
  const route = useRouter();

  const { data, isFetching, isError } = useQuery({
    queryKey: ["getAwards", pathname],
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    queryFn: async () => {
      const token = await getToken({ template: "supabase" });

      const apiService = new ApiService(token ?? "");
      const awards = await apiService.getDiscounts(
        selectedBusiness?.id ?? 0,
        "award"
      );
      return awards;
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
    <>
      <Stack.Screen options={{ title: "Recompensas" }} />
      <SafeAreaView style={tw`flex-1 bg-white`}>
        <Text style={tw`text-center text-gray-800 text-2xl mt-5`}>
          Descubre tus recompensas
        </Text>
        <View style={tw.style("flex-1 bg-white")}>
          <View style={tw`p-5`}>
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
              />
            </View>
          </View>

          {/*  Recompensas component */}
          <View style={tw`flex flex-row flex-wrap justify-between p-5`}>
            <View style={tw`w-2/2  rounded-lg  overflow-hidden`}>
              <View
                style={tw` bg-primary shadow-md w-11/12 mx-auto rounded-t-lg`}
              >
                <Text style={tw`text-white font-black text-xl p-2 text-center `}>
                  500 Puntos
                </Text>
              </View>
              <View style={tw`rounded-lg  overflow-hidden`}>
                <ImageBackground
                  source={imagenBurguer}
                  style={tw`w-full h-40   rounded-lg relative flex justify-center items-center bg-primary  `}
                >
                  <View
                    style={tw` flex-row bg-white rounded-lg absolute bottom-2  w-11/12 m-auto p-2 items-center justify-between shadow-md`}
                  >
                    <View style={tw`flex flex-col w-4/7`}>
                      <Text style={tw`text-gray-700  font-bold text-lg`}>
                        McDonalds
                      </Text>
                      <Text style={tw`text-gray-400   text-xs`}>
                        2 x 1 en Big Mac
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={
                        () => {
                            route.push("/(authed)/(drawer)/(tabs)/(profile)/rewardShow")
                        }
                      }
                      style={tw`bg-gray-200 px-2 py-1 rounded-xl shadow-md  w-3/7 flex items-center justify-center h-8 `}
                    >
                      <Text style={tw`text-gray-600 text-xs font-bold`}>
                        Realizar Pedido
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              </View>
            </View>
          </View>
          {/*  final recompensa */}

          {/* <WithLoading isLoading={isFetching} error={isError}>
				<FlatList
					data={data}
					style={tw`bg-white`}
					ListEmptyComponent={
						<View>
							<Text style={tw`text-center text-primary text-2xl mt-5`}>
								No hay recompensas disponibles
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
										uri: selected.image,
									}}
								/>
								<Text style={tw`text-center text-2xl text-primary mt-2`}>
									{selected?.name}
								</Text>
								<Text style={tw`text-center text-2xl text-primary`}>
									{selected?.description}
								</Text>

								<Text style={tw`text-center text-base text-primary mt-3 px-2`}>
									Al presionar el boton se generara un codigo QR que podras
									canjearlo en el negocio Tienes 5 minutos para canjearlo, de lo
									contrario el codigo quedara invalido
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
    </>
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
