import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useFonts } from "expo-font";
import {
	OpenSans_400Regular,
	OpenSans_700Bold,
} from "@expo-google-fonts/open-sans";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import initSentry from "../config/sentry";
import { useDeviceContext } from "twrnc";
import tw from "@/config/tw";
import { ClerkProvider } from "@clerk/clerk-expo";
import { CLERK_PUSHEABLE_KEY } from "@/utils/constants";
import AuthHeader from "@/components/AuthHeader";
import { Toasts } from "@backpackapp-io/react-native-toast";
import tokenCache from "@/config/secure-token";
import { QueryClient, QueryClientProvider } from "react-query";
import { StripeProvider } from "@stripe/stripe-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export const queryClient = new QueryClient();
export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	useDeviceContext(tw);
	const [loaded, error] = useFonts({
		SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
		OpenSans: OpenSans_400Regular,
		OpenSansBold: OpenSans_700Bold,
		...FontAwesome.font,
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		initSentry();
		if (!loaded) {
			return;
		}
		if (error) {
			throw error;
		}
	}, [error, loaded]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<BottomSheetModalProvider>
				<ClerkProvider
					publishableKey={CLERK_PUSHEABLE_KEY}
					tokenCache={tokenCache}
				>
					<QueryClientProvider client={queryClient}>
						<Stack>
							<Stack.Screen name="index" options={{ headerShown: false }} />
							<Stack.Screen
								name="(auth)"
								options={{ headerShown: false, header: () => <AuthHeader /> }}
							/>
							<Stack.Screen name="(authed)" options={{ headerShown: false }} />
						</Stack>
						<Toasts />
					</QueryClientProvider>
				</ClerkProvider>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
}
