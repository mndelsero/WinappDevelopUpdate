import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import tw from "@/config/tw";
import useCartStore from "@/store/useCartStore";
import { Ionicons } from "@expo/vector-icons";
import CounterProduct from "@/components/CounterProduct";
import { FlatList, TextInput } from "react-native-gesture-handler";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import BottomSheet from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import useDebounce from "@/hooks/useDebounce";
import ApiService from "@/services/ApiService";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useMutation } from "react-query";

export default function Cart() {
	const ref = React.useRef<BottomSheet>(null);
	const auth = useAuth();
	const [loading, setLoading] = React.useState(false);
	const { items, addItem, removeItem, count, changes } = useCartStore(
		(state) => state,
	);
	const { userId, getToken } = useAuth();
	const [discount, setDiscount] = React.useState("0.00");
	const [discountCode, setDiscountCode] = React.useState("");
	const debounced = useDebounce(discountCode, 1500);
	const router = useRouter();

	const { isLoading, mutate } = useMutation({
		mutationFn: async () => {
			const token = (await getToken({ template: "supabase" })) ?? "";
			const service = new ApiService(token);
			const order: {
				totalPrice: number;
				products: {
					product_id: string;
					product_name: string;
					product_price: number;
					product_description: string;
				}[];
				status: number;
				quantity: number;
				notes: string;
				user_id: string;
				business_id: number;
			} = {
				user_id: userId ?? "1",
				totalPrice: items.reduce(
					(acc, item) => acc + item.product.price * item.count,
					0,
				),
				products: items.map((item) => {
					return {
						product_id: String(item.product.id),
						product_name: item.product.name,
						product_price: item.product.price,
						product_description: item.product.description,
					};
				}),
				status: 1,
				quantity: items.length,
				notes: "",
				business_id: items.length > 0 ? items[0].product.business_id : 0,
			};

			const data = await service.generateOrder(order);
			console.log(data);
			return data;
		},
		mutationKey: "pay",
		onSuccess: () => {
			router.push("/(authed)/(payment)/success");
		},
		onError: () => {},
	});

	const handlePay = () => {
		if (items.length === 0) {
			return;
		}

		mutate();
	};

	return (
		<SafeAreaView style={tw`h-full `}>
			<View style={tw`h-[67%] tablet:mx-3`}>
				<FlatList
					style={tw`px-2`}
					data={items}
					ListEmptyComponent={
						<View style={tw`mt-4`}>
							<Text style={tw`text-center text-xl text-primary`}>
								No tienes productos en tu carrito
							</Text>
						</View>
					}
					ListHeaderComponent={
						<View style={tw`flex-row justify-between my-4`}>
							<Text style={tw`text-3xl text-primary font-OpenSansBold`}>
								Tu pedido
							</Text>
							<Ionicons
								onPress={() => router.back()}
								name="close-outline"
								style={tw`text-3xl tablet:text-5xl text-primary`}
							/>
						</View>
					}
					ListFooterComponent={
						<>
							<View style={tw`w-full mt-10`}>
								<TextInput
									style={tw`border-2 border-primary rounded-2xl w-full h-14 px-3 tablet:h-20 tablet:text-2xl`}
									placeholder="Agrega una nota"
								/>
							</View>
							{/* <View style={tw`w-full mt-4`}>
								<TextInput
									value={discountCode}
									onChange={(e) => setDiscountCode(e.nativeEvent.text)}
									style={tw`border-2 border-primary rounded-2xl w-full h-14 px-3 tablet:h-20 tablet:text-2xl`}
									placeholder="Agrega un codigo de descuento"
								/>
							</View> */}
						</>
					}
					renderItem={({ item }) => {
						return (
							<View
								key={item.product.id}
								style={tw`flex-row mt-10 justify-between items-center gap-4`}
							>
								<View style={tw`h-20 w-20 tablet:w-1`}>
									<Image
										source={{ uri: item.product.image }}
										style={tw`w-25 h-18 rounded-2xl tablet:w-30 tablet:h-20 smallphone:w-22`}
										resizeMode="contain"
									/>
								</View>
								<View style={tw`h-20 w-2.2/6  flex`}>
									<Text style={tw`text-lg font-OpenSans tablet:text-3xl`}>
										{item.product.name}
									</Text>
									<Text style={tw`text-base font-OpenSansBold tablet:text-3xl`}>
										${item.product.price}
									</Text>
								</View>
								<CounterProduct item={item} />
							</View>
						);
					}}
				/>
			</View>
			<BottomSheet
				snapPoints={["30%"]}
				backgroundStyle={{ backgroundColor: tw.color("primary") }}
			>
				<View style={tw`px-10 smallphone:mt-0 mt-4`}>
					<View style={tw`flex-row justify-between items-center gap-20 mt-10`}>
						<Text
							style={tw`text-white text-2xl tablet:text-4xl  font-OpenSansBold`}
						>
							Subtotal
						</Text>
						<Text
							style={tw`text-white text-2xl tablet:text-4xl  font-OpenSansBold`}
						>
							${" "}
							{items.reduce(
								(acc, item) => acc + item.product.price * item.count,
								0,
							)}
						</Text>
					</View>

					<View style={tw`flex-row justify-between items-center gap-20`}>
						<Text
							style={tw`text-white text-2xl font-OpenSansBold tablet:text-4xl `}
						>
							Total
						</Text>
						<Text
							style={tw`text-white text-2xl font-OpenSansBold tablet:text-4xl `}
						>
							${" "}
							{items.reduce(
								(acc, item) => acc + item.product.price * item.count,
								0,
							) - parseFloat(discount)}
						</Text>
					</View>
					<View
						style={tw`justify-center mx-auto w-5/6 items-center phone:mt-6`}
					>
						<Button
							onPress={() => handlePay()}
							title="Pagar"
							color="#fff"
							textColor="#fff"
							outline
							disabled={items.length === 0}
							loading={isLoading}
						/>
					</View>
				</View>
			</BottomSheet>

			{/* <BottomSheet snapPoints={["40%"]} index={-1} ref={ref}>
				<View style={tw`px-10 smallphone:mt-0 mt-4`}>
					<TouchableOpacity
						onPress={() =>
							handlePay(
								"cash",
								items.reduce(
									(acc, item) => acc + item.product.price * item.count,
									0,
								) - parseFloat(discount),
							)
						}
					>
						<Text>Efectivo</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() =>
							handlePay(
								"mp",
								items.reduce(
									(acc, item) => acc + item.product.price * item.count,
									0,
								) - parseFloat(discount),
							)
						}
					>
						<Text>Mercado Pago</Text>
					</TouchableOpacity>
				</View>
			</BottomSheet> */}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({});
