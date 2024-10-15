import tw from "@/config/tw";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, StyleSheet, View, Text } from "react-native";

interface Props {
	isLoading: boolean;
	error: boolean | null;
	children: React.ReactNode;
}
export default function WithLoading({ isLoading, error, children }: Props) {
	if (isLoading) {
		return <ActivityIndicator style={tw`mt-10`} size="large" color="black" />;
	}

	if (error) {
		return (
			<View style={tw`flex flex-row justify-center items-center mt-10 gap-2`}>
				<Ionicons
					name="alert-circle-outline"
					style={tw`text-3xl`}
					color={tw.color("primary")}
				/>
				<Text style={tw`text-xl tablet:text-3xl text-primary`}>
					Ocurrio un error en la peticion
				</Text>
			</View>
		);
	}

	return <>{children}</>;
}

const styles = StyleSheet.create({});
