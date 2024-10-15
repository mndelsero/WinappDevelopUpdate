import React from "react";
import { Redirect, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import tw from "@/config/tw";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";

export default function TabLayout() {
  return (
    <>
        <GestureHandlerRootView style={{ flex: 1,backgroundColor:'white' }}>
          <BottomSheetModalProvider>
            <Tabs
              screenOptions={{
                tabBarActiveTintColor: tw.color("primary"),
                tabBarInactiveTintColor: tw.color("gray-400"),

                tabBarLabelStyle: tw`text-sm tablet:text-3xl smallphone:mb-5 phone:mb-0 font-OpenSans`,
                tabBarStyle: tw`rounded-t-3xl  border-t-0 border-l-0 border-r-0 h-25 flex justify-center items-center smallphone:pt-5 phone:pt-0 phone:pb-5`,
              }}
            >
              <Tabs.Screen
                name="(home)"
                options={{
                  headerShown: false,
                  title: "Inicio",
                  tabBarIcon: ({ focused, color }) => (
                    <Ionicons
                      name="home-outline"
                      style={tw`text-xl  ${
                        focused ? "text-primary" : "text-gray-400"
                      } tablet:text-2xl phone:mb--4`}
                    />
                  ),
                }}
              />
              <Tabs.Screen
                name="(search)"
                options={{
                  headerShown: false,
                  title: "navegar",
                  tabBarIcon: ({ focused }) => (
                    <Ionicons
                      name="search-outline"
                      style={tw`text-xl  ${
                        focused ? "text-primary" : "text-gray-400"
                      } tablet:text-2xl phone:mb--4`}
                    />
                  ),
                }}
              />
              <Tabs.Screen
                name="(orders)"
                options={{
                  headerShown: false,
                  title: "Ordenes",
                  tabBarIcon: ({ focused }) => (
                    <Ionicons
                      name="time-outline"
                      style={tw`text-xl ${
                        focused ? "text-primary" : "text-gray-400"
                      } tablet:text-2xl`}
                    />
                  ),
                }}
              />
              <Tabs.Screen
                name="(profile)"
                options={{
                  headerShown: false,
                  title: "Perfil",
                  tabBarIcon: ({ focused }) => (
                    <Ionicons
                      name="person-outline"
                      style={tw`text-xl ${
                        focused ? "text-primary" : "text-gray-400"
                      } tablet:text-2xl phone:mb--4`}
                    />
                  ),
                }}
                listeners={({ navigation }) => ({
                  tabPress: (e) => {
                    // Previene el comportamiento por defecto de cambiar a la pantalla del tab
                    e.preventDefault();
                    // Abre el drawer
                    navigation.openDrawer();
                  },
                })}
              />



              <Tabs.Screen
                name="(business)"
                options={{
                  headerShown: false,
                  tabBarButton:()=>null,
                  tabBarIcon: ({ focused }) => (
                    <Ionicons
                      name="business-outline"
                      style={tw`text-xl ${
                        focused ? "text-primary" : "text-gray-400"
                      } tablet:text-2xl`}
                    />
                  ),
                }}
                
              />
            </Tabs>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
    </>
  );
}
