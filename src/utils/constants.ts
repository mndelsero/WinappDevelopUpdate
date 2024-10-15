import { Platform } from "react-native";

export const COURIER_CLIENT_KEY =
	process.env.EXPO_PUBLIC_COURIER_CLIENT_KEY || "";
export const SENTRY_DSN = process.env.EXPO_PUBLIC_SENTRY_DSN || "";
export const CLERK_PUSHEABLE_KEY =
	process.env.EXPO_PUBLIC_CLERK_PUSHEABLE_KEY || "";
export const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY || "";
export const API_URL =
	process.env.EXPO_PUBLIC_API_URL || "https://winap-re.up.railway.app";
export const IS_ANDROID = Platform.OS === "android";
export const IS_IOS = Platform.OS === "ios";

export const PREFIX = process.env.EXPO_PUBLIC_PREFIX || "";

export enum Status {
	Pending = 1,
	Preparing = 2,
	ForPickup = 3,
	Completed = 4,
	Cancelled = 5,
}

export const STATUS_TEXT: Record<Status, string> = {
	[Status.Pending]: "Pendiente",
	[Status.Preparing]: "Preparando",
	[Status.ForPickup]: "Para recoger",
	[Status.Completed]: "Completado",
	[Status.Cancelled]: "Cancelado",
};
