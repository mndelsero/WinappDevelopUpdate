import React from "react";
import { Redirect, Stack, useRouter, useSegments } from "expo-router";
import { Drawer } from "expo-router/drawer";
import SignInScreen from "../../(auth)/sign-in";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import LocationHeader from "@/components/LocationHeader";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import DrawerHeader from "@/components/DrawerHeader";
import tw from "@/config/tw";
import Button from "@/components/Button";
import useGlobalStore from "@/store/useGlobalStore";
import HomeHeader from "@/components/HomeHeader";
import { Ionicons } from "@expo/vector-icons";


const CustomDrawerItem = ({ label, navigationPath }) => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push(navigationPath)} style={tw`flex flex-row justify-between  my-4`}>
      <Text style={tw`px-4.5 text-base tablet:text-2xl text-white font-bold font-OpenSansBold`}>
        {label}
      </Text>
            </TouchableOpacity>
  );
};


const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { signOut } = useAuth();
  const { clearStorage } = useGlobalStore();






  return (
    <DrawerContentScrollView {...props} style={tw`bg-primary relative`}>
      <DrawerHeader />
      <View style={{ height: Dimensions.get("screen").height / 2.0 }}>
        <DrawerItemList {...props} />
        <CustomDrawerItem label="Mi Perfil" navigationPath="/(authed)/(drawer)/(tabs)/(profile)" />
        <CustomDrawerItem label="Mis Recompensas" navigationPath="/(authed)/(drawer)/(tabs)/(profile)/rewards" />
        <CustomDrawerItem label="Regalos" navigationPath="/(authed)/(drawer)/(tabs)/(profile)/gifts" />
        <CustomDrawerItem label="favoritos" navigationPath="/(authed)/(drawer)/(tabs)/(profile)/favorites" />
      </View>

	  <View style={tw`flex flex-col justify-between `}>
		<TouchableOpacity style={tw`flex flex-row justify-between  border-b border-white`} onPress={() => {
					clearStorage();
					signOut();
				}}>
			<Text
				
				style={tw`px-4.5 text-base tablet:text-2xl text-white font-bold font-OpenSansBold`}
			>
				Cerrar sesión
			</Text>
				<Ionicons name="log-out-outline" size={24} color="white"  style={tw`pr-4`} />
		</TouchableOpacity>
	  <View style={tw`flex-1`}>
		<Text
		  style={tw`px-4.5 text-base tablet:text-2xl text-white font-bold font-OpenSansBold  mt-10 `}>
		  Version 0.0.1
		</Text>
	  </View>
      
      </View>
    </DrawerContentScrollView>
  );
};

export default function AuthedLayout() {
  const { selectedBusiness } = useGlobalStore();
  const segment = useSegments();

  console.log("SEGMENT");
  return (
    <>
      <SignedIn>
        <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
          <Drawer.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              drawerItemStyle: { height: 0 },
              title: "Menu Principal",
              drawerActiveBackgroundColor: "white",
              drawerActiveTintColor: tw.color("primary"),
              drawerInactiveTintColor: "black",
              drawerLabelStyle: tw`tablet:text-2xl text-base`,

              header: ({ navigation }) => (
                <LocationHeader navigation={navigation} />
              ),
            }}
          />
       
        </Drawer>
      </SignedIn>
      <SignedOut>
        <Redirect href="/(auth)/sign-in" />
      </SignedOut>
    </>
  );
}
