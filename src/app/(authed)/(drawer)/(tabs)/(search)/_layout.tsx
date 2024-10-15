import { Stack } from 'expo-router'
import React from 'react'

export default function SearchLayout() {
  return(
    <Stack>
    <Stack.Screen
      name="index"
      options={{
        headerShown: false,
        title: "Categorias",
      }}
    />

    <Stack.Screen
      name="businessForCategory"
      options={{
        headerShown: false,
        title: "Negocios",
      }}
    />
  </Stack>
  )
}


