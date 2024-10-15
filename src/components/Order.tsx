import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import tw from "@/config/tw";
import { TouchableOpacity } from "react-native-gesture-handler";
import { STATUS_TEXT, Status } from "@/utils/constants";
import { format } from "date-fns";
import { useAuth } from "@clerk/clerk-expo";
import { useMutation } from "react-query";

import ApiService from "@/services/ApiService";

import { toast } from "@backpackapp-io/react-native-toast";

interface OrderProps {
	clientName: string;
	orderId: string;
	orderTotal: number;
	orderDetail: {
		product_id: string;
		product: string;
		quantity: number;
	}[];
	hasUsedCode: boolean;
	type: number;
	discount?: number;
	status: Status;
	date: string;
	refetch?: () => void;
}

const typesText = {
	1: "Descuento de ",
	2: "Producto Gratis",
	3: "2x1",
};

export default function Order({
	clientName,
	orderId,
	orderTotal,
	orderDetail = [],
	hasUsedCode,
	type,
	discount,
	date,
	status,
	refetch,
}: OrderProps) {
	return (
		<View
			style={tw`rounded-xl bg-primary px-3 py-2  pb-4 tablet:pb-8 tablet:py-4 tablet:rounded-2xl relative`}
		>
			<View
				style={tw`text-white text-sm self-center mt-2 tablet:text-xl  bg-white px-2 rounded-2xl`}
			>
				<Text style={tw`font-bold text-lg text-primary tablet:text-2xl`}>
					{STATUS_TEXT[status]}
				</Text>
			</View>
			<View style={tw`flex-row justify-between pt-2`}>
				<View>
					<Text style={tw`text-white font-light text-lg tablet:text-2xl`}>
						Nombre del cliente
					</Text>
					<Text style={tw`text-white font-bold tablet:text-3xl text-xl`}>
						{clientName}
					</Text>
				</View>
				<View>
					<Text style={tw`text-white font-light text-lg tablet:text-2xl`}>
						Orden n° <Text style={tw`font-bold`}>{orderId}</Text>
					</Text>
				</View>
			</View>
			<View style={tw`mt-4`}>
				<View style={tw`flex-row justify-between items-center`}>
					<Text style={tw`text-white font-light text-lg  tablet:text-2xl`}>
						Detalle del Pedido
					</Text>
					<Text
						style={tw`text-white font-light text-lg tablet:text-2xl font-bold `}
					>
						MXN$ {orderTotal}
					</Text>
				</View>
				{orderDetail.map((detail, index) => (
					<View style={tw`flex-row`} key={detail.product_id}>
						<Text style={tw`text-white text-sm tablet:text-2xl`}>
							{detail.quantity} x
						</Text>
						<Text style={tw`text-white text-sm tablet:text-2xl`}>
							{" "}
							{detail.product}
						</Text>
					</View>
				))}
			</View>
			{hasUsedCode && (
				<View style={tw`mt-4`}>
					<View style={tw`flex w-5/6`}>
						<Text style={tw`text-white font-light text-lg tablet:text-2xl`}>
							Se utilizo un codigo de regalo
						</Text>
						<View style={tw`rounded-full flex items-start mt-2`}>
							<Text
								style={tw`text-primary font-bold text-sm py-2 px-4 bg-white overflow-hidden rounded-2xl tablet:text-lg tablet:py-3 tablet:px-6 tablet:rounded-3xl`}
							>
								{/* @ts-ignore */}
								{typesText[type]} {type === 1 && `${discount}%`}
							</Text>
						</View>
					</View>
				</View>
			)}
			<Text style={tw`text-white text-sm self-center mt-2 tablet:text-xl`}>
				Fecha:{" "}
				<Text style={tw`font-bold`}>
					{date}
					{/* {format(new Date(date), "dd/MM/yyyy HH:mm")} */}
				</Text>
			</Text>
		</View>
	);
}
