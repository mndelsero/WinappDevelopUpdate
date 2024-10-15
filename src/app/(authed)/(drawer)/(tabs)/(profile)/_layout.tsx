import React from "react";
import { Drawer } from "expo-router/drawer";
import LocationHeader from "@/components/LocationHeader";

import tw from "@/config/tw";
import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="rewards" options={{ headerShown: false }} />
		    <Stack.Screen name="gifts" options={{ headerShown: false }} />
        <Stack.Screen name="personal" options={{ headerShown: false }} />
        <Stack.Screen name="rewardShow" options={{ headerShown: false }} />
        <Stack.Screen name="favorites" options={{headerShown:false}}/>
      </Stack>
    </>
  );
}
