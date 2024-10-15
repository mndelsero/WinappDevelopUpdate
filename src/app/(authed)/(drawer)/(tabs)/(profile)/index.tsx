
import tw from '@/config/tw'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { Stack, useRouter } from 'expo-router'
import React from 'react'
import {  Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Profile() {
    const { user } = useUser();
    const router = useRouter();
    return (
        <>
        <Stack.Screen  options={{ headerShown: false }} />
        <SafeAreaView style={tw.style("flex-1 bg-white")}>
        <View style={tw.style("flex-1 bg-white")}>
        <Text style={tw`text-center text-gray-800 text-2xl mt-5`}>
          Información Personal
        </Text>
        <View style={tw`flex flex-col justify-between items-center px-5 mt-6 ` }>

        <TouchableOpacity style={tw`flex flex-row justify-between items-center w-full my-4`} onPress={
            () => router.push("/(authed)/(drawer)/(tabs)/(profile)/personal")
        }>
            <View style={tw`flex flex-col `}>

            <Text style={tw`text-gray-800 text-lg `}>Mis Datos personales</Text>
            <Text style={tw`text-gray-400 text-sm `}>Nombre, correo, teléfono</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={tw.color('primary')}  style={tw`pr-4`} />
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex flex-row justify-between items-center w-full my-4`}>
            <View style={tw`flex flex-col `}>

            <Text style={tw`text-gray-800 text-lg `}>Cambiar Contraseña</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={tw.color('primary')}  style={tw`pr-4`} />
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex flex-row justify-between items-center w-full my-4`}>
            <View style={tw`flex flex-col `}>

            <Text style={tw`text-gray-800 text-lg `}>Número Celular</Text>
            <Text style={tw`text-gray-400 text-sm `}>+586789501</Text>

            </View>
            <Text style={tw`text-gray-800 text-base underline text-primary mr-6`}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex flex-row justify-between items-center w-full my-4`}>
            <View style={tw`flex flex-col `}>

            <Text style={tw`text-gray-800 text-lg `}>E-mail</Text>
            <Text style={tw`text-gray-400 text-sm `}>{user?.emailAddresses[0].emailAddress}</Text>

            </View>
            <Text style={tw`text-gray-800 text-base underline text-primary mr-6`}>Editar</Text>
        </TouchableOpacity>
        </View>


        </View>
        </SafeAreaView>
        </>
    )

}