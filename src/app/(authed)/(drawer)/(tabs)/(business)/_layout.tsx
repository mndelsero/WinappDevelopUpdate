import React from "react";
import { Stack } from "expo-router";

export default function BusinessLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Inicio",
        }}
      />
    </Stack>
  );
}
