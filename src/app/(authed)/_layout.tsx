import React from "react";
import { Redirect, Stack } from "expo-router";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
export default function AuthedLayout() {
	return (
		<>
			<SignedIn>
				<Stack>
					<Stack.Screen name="(drawer)" options={{ headerShown: false }} />
					<Stack.Screen
						name="(location)/select-location"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="(product)/details"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="(payment)/cart"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="(payment)/checkout"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="(payment)/success"
						options={{
							headerShown: false,
						}}
					/>
				</Stack>
			</SignedIn>
			<SignedOut>
				<Redirect href="/(auth)/sign-in" />
			</SignedOut>
		</>
	);
}
