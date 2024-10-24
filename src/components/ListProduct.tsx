import tw from '@/config/tw'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'


export const ListProduct = ({item, setSheetIndex= null}) => {
 
  return (
    <TouchableOpacity
    onPress={() => setSheetIndex ?  setSheetIndex(item) : {}}
    style={tw`flex flex-row   border-b border-gray-300 p-4`}
    key={item.name}
  >
    <View style={tw`flex flex-col w-2/4`}>
      <Text style={tw`text-gray-800 text-lg`}>{item.name}</Text>
      <Text style={tw`text-gray-400 text-sm w-auto`}>
        {item.description}
      </Text>
    </View>
    <View
      style={tw`flex flex-col items-end justify-between w-1/4  `}
    >
      <Text style={tw`text-gray-800 text-lg mr-2`}>
        {item.unitPrice} $
      </Text>
    {/*   <View>
        {item.popular && (
          <View
            style={tw`bg-primary rounded-full px-2 py-1 mr-2 shadow-lg`}
          >
            <Text style={tw`text-white text-sm`}>Popular</Text>
          </View>
        )}
      </View> */}
    </View>
    <View style={tw`flex flex-col items-center w-1/4`}>
    {item && typeof item.image === 'string' && (
      <Image source={{ uri: item.image }} style={tw`w-20 h-20 rounded-lg`} />
    )}
  </View>
  </TouchableOpacity>
  )
}
