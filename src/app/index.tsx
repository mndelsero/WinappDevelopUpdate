import { StyleSheet, Image, View, Text, Dimensions, ImageBackground } from "react-native";
import React, { useEffect } from "react";
import tw from "../config/tw";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import { useAuth } from "@clerk/clerk-expo";
import LoadingScreen from "@/components/LoadingScreen";
import  Carousel  from "@gorhom/bottom-sheet";
import Swiper from "react-native-swiper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BlurView } from "@react-native-community/blur";
import MapView from 'react-native-maps';
import { Slider1 } from "@/components/Slider1";
import { Slider2 } from "@/components/Slider2";
import { Slider3 } from "@/components/Slider3";

export default function IndexScreen() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const { isSignedIn, isLoaded } = useAuth();
  const windowWidth = Dimensions.get("window").width;
  const swiperRef = React.useRef(null);

  


  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setLoading(true);
    if (!isLoaded) {
      return;
    }
    if (isSignedIn) {
      router.replace("/(authed)/(drawer)/(tabs)/(home)");
    } else {
      setLoading(false);
    }
  }, [isLoaded, isSignedIn]);

  
  return (
    <View style={tw`bg-white h-full flex justify-between relative`}>
      {loading ? (
        <LoadingScreen />
      ) : (
		<Swiper
  ref={swiperRef}
  style={tw`h-full`}
  showsButtons={false}
  loop={false}
  autoplay
  autoplayTimeout={5}
  renderPagination={(index, total) => (
    <View style={tw`flex-1 justify-center items-center bg-primary`}>
      <View
        style={tw`flex flex-row absolute bottom-10 rounded-full p-2 w-16 h-6 bg-gray-100 bg-opacity-30 justify-center items-center`}
      >
        {Array.from({ length: total }).map((_, i) => (
          <TouchableOpacity
            key={i}
            style={tw`w-2 h-2 rounded-full m-1 ${i === index ? "bg-gray-100" : "bg-gray-400"}`}
          />
        ))}
      </View>
    </View>
  )}
>
       <Slider1    swiperRef={swiperRef} />
       <Slider2    swiperRef={swiperRef} />
       <Slider3    />


</Swiper>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  textLogo: {
    position: "absolute",
    bottom: 80,
    fontSize: 35,
    fontWeight: "bold",
  },
});
