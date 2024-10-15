import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from "react-native";
import React from "react";
import tw from "@/config/tw";
import { useQuery } from "react-query";
import { useAuth } from "@clerk/clerk-expo";
import ApiService from "@/services/ApiService";
import useGlobalStore from "@/store/useGlobalStore";
import WithLoading from "@/components/WithLoading";
import { format } from "date-fns";
import Order from "@/components/Order";

export default function HistoryTab() {
	
	
	const { getToken, userId } = useAuth();
	const { selectedBusiness } = useGlobalStore();
	
	const { data, isFetching, isError } = useQuery({
	  queryKey: ["history", selectedBusiness?.id],
	  queryFn: async () => {
		const token = (await getToken()) ?? "";
		const apiService = new ApiService();
		return apiService.getOrders(userId ?? "1", [], selectedBusiness?.id ?? 0);
	  },
	});
	console.log(data);

	return (
		<ScrollView style={tw.style("h-screen bg-background")}>
			<WithLoading isLoading={isFetching} error={isError}>
				<View style={tw`px-2 flex gap-4`}>
					{data?.length === 0 && (
						<View style={tw`flex-1 justify-center items-center`}>
							<Text style={tw`text-primary text-2xl`}>No tienes ordenes</Text>
						</View>
					)}

					{data &&
						data.length > 0 &&
						data?.map((order: any) => {
							console.log(order);
							return (
								<Order
									key={order.id}
									clientName={order.user.clientName}
									orderId={order.id}
									orderTotal={1000}
									orderDetail={order.details.map((detail: any) => {
										return {
											product_id: detail.product_id,
											product: detail.product_name,
											quantity: detail.quantity,
										};
									})}
									hasUsedCode={order.hasUsedCode}
									type={order.code_type}
									discount={order.discount}
									status={order.status}
									date={format(new Date(order.created_at), "dd/MM/yyyy")}
								/>
							);
						})}
				</View>
			</WithLoading>
		</ScrollView>
	);
}

const styles = StyleSheet.create({});
