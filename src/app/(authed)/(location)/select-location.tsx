import {
	TouchableOpacity,
	View,
	Platform,
	KeyboardAvoidingView,
  } from "react-native";
  import React, { useEffect } from "react";
  import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"; // Usa PROVIDER_GOOGLE solo para Android
  import tw from "@/config/tw";
  import BottomSheet from "@/components/BottomSheet";
  import { Ionicons } from "@expo/vector-icons";
  import { useRouter } from "expo-router";
  import {
	GooglePlacesAutocomplete,
	GooglePlacesAutocompleteRef,
  } from "react-native-google-places-autocomplete";
  import { GOOGLE_API_KEY } from "@/utils/constants";
  import Button from "@/components/Button";
  import useGlobalStore from "@/store/useGlobalStore";
  
  export default function SelectLocation() {
	const router = useRouter();
	const ref = React.useRef<MapView>(null);
	const inputRef = React.useRef<GooglePlacesAutocompleteRef>(null);
	const { location, setLocation } = useGlobalStore();
  
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
	  <KeyboardAvoidingView
		style={tw`flex-1 relative`} // Ajuste de la vista con TW
		behavior={Platform.OS === "ios" ? "padding" : undefined} 
		keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} 
	  >
		<TouchableOpacity
		  onPress={() => router.back()}
		  activeOpacity={0.8}
		  style={tw`absolute top-10 left-4 bg-white rounded-full w-7 h-7 tablet:w-10 tablet:h-10 flex justify-center items-center z-50 elevation-5 pl-1`}
		>
		  <Ionicons
			name="arrow-back"
			style={tw`text-xl tablet:text-3xl`}
			color={tw.color("primary")}
		  />
		</TouchableOpacity>
  
		{/* MapView for both Android and iOS */}
		<MapView
		  provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined} 
		  ref={ref}
		  style={tw`h-1/2 w-full`} // Ajuste con Tailwind
		  initialRegion={{
			latitude: location.lat || 37.78825,
			longitude: location.lng || -122.4324,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		  }}
		>
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
			  container: tw`flex-1`, // Ajusta la búsqueda con Tailwind
			  textInput: tw`h-14 w-full bg-white rounded-2xl px-3 shadow-lg`,
			  listView: tw`bg-white`,
			}}
		  />
		  {location && (
			<View style={tw`flex justify-center mx-auto w-6/6 items-center`}>
			  <Button
				onPress={() => router.back()}
				title="Confirmar ubicación"
				textColor="#000"
			  />
			</View>
		  )}
		</BottomSheet>
	  </KeyboardAvoidingView>
	);
  }