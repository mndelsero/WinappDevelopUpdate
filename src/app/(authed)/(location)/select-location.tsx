import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import tw from "@/config/tw";
import BottomSheet from "@/components/BottomSheet";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import Input from "@/components/Input";
import {
	GooglePlacesAutocomplete,
	GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";

import { GOOGLE_API_KEY } from "@/utils/constants";
import Button from "@/components/Button";
import useGlobalStore from "@/store/useGlobalStore";

interface Location {
	latitude: number;
	longitude: number;
}

export default function SelectLocation() {
	const router = useRouter();
	const ref = React.useRef<MapView>(null);
	const inputRef = React.useRef<GooglePlacesAutocompleteRef>(null);
	const { location, setLocation } = useGlobalStore();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
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
	}, []);
	return (
		<View style={tw`h-full relative`}>
			<TouchableOpacity
				onPress={() => router.back()}
				activeOpacity={0.8}
				style={tw`absolute top-10 left-4 bg-white rounded-full w-7 h-7 tablet:w-10 tablet:h-10 flex justify-center items-center mx-auto z-50 elevation-5 pl-1`}
			>
				<Ionicons
					name="arrow-back"
					style={tw`text-xl tablet:text-3xl`}
					color={tw.color("primary")}
				/>
			</TouchableOpacity>
			<MapView provider={PROVIDER_GOOGLE} ref={ref} style={tw`h-3/6 w-full`}>
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
			<BottomSheet snapPoints={["50%"]}>
				<GooglePlacesAutocomplete
					ref={inputRef}
					placeholder="Buscar tu dirección"
					onFail={(error) => console.log(error)}
					onPress={(data, details = null) => {
						const info = details?.geometry.location;
						const display = details?.formatted_address;
						ref.current?.animateCamera({
							center: {
								latitude: info?.lat || 0,
								longitude: info?.lng || 0,
							},
							altitude: 1000,
							zoom: 15,
						});
						setLocation({
							lat: info?.lat || 0,
							lng: info?.lng || 0,
							displayName: display || "",
						});
					}}
					fetchDetails
					query={{
						key: GOOGLE_API_KEY,
						language: "es",
						fetchDetails: true,
					}}
					styles={{
						container: {
							flex: 1,
						},
						textInput: {
							...tw`h-14 w-full bg-white rounded-2xl px-3 shadow-lg`,
							
						},
						listView: {
							...tw`bg-white`,
						},
					}}
		

				/>
				{location && (
					<View style={tw`flex justify-center mx-auto w-6/6 items-center`}>
						<Button onPress={() => router.back()} title="Confirmar ubicación" textColor="#000" />
					</View>
				)}
			</BottomSheet>
		</View>
	);
}



const styles = StyleSheet.create({});
