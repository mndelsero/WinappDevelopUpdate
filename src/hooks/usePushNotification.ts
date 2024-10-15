import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useState, useEffect, useRef } from "react";
import { Platform } from "react-native";

const registerForPushNotificationsAsync = async () => {
	let token;
	if (Device.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;

		console.log(finalStatus, existingStatus);

		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}

		if (finalStatus !== "granted") {
			alert("Failed to get push token for push notification!");
			return;
		}

		token = (
			await Notifications.getExpoPushTokenAsync({
				projectId: Constants.expoConfig?.extra?.eas.projectId,
			})
		).data;
	} else {
		alert("Must use physical device for Push Notifications");
	}

	if (Platform.OS === "android") {
		Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FF231F7C",
		});
	}

	return token;
};
export default function usePushNotification() {
	const [expoPushToken, setExpoPushToken] = useState<string>("");
	const [notification, setNotification] =
		useState<Notifications.Notification | null>(null);
	const notificationListener = useRef<Notifications.Subscription>();

	useEffect(() => {
		(async () => {
			const token = await registerForPushNotificationsAsync();
			setExpoPushToken(token || "");

			console.log(token);

			notificationListener.current =
				Notifications.addNotificationReceivedListener((notification) => {
					setNotification(notification);
				});

			return () => {
				if (notificationListener.current) {
					Notifications.removeNotificationSubscription(
						notificationListener.current,
					);
				}
			};
		})();
	}, []);

	return { expoPushToken, notification, setNotification };
}
