import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React from "react";
import tw from "@/config/tw";

interface Props {
	title: string;
	onPress?: () => void;
	disabled?: boolean;
	outline?: boolean;
	loading?: boolean;
	color?: string;
	textColor?: string;
	style?: any;
}
export default function Button({
	title,
	onPress,
	disabled,
	outline = false,
	loading = false,
	color = tw.color("primary"),
	textColor = "#fff",
	style,
}: Props) {
	return (
		<TouchableOpacity
			activeOpacity={0.5}
			disabled={disabled}
			onPress={onPress}
			style={tw.style(
				`border-2 border-[${color}] rounded-full py-3 tablet:py-5 w-4/6 bg-[${color}] shadow-lg`,
				disabled && "opacity-50",
				outline && "bg-transparent",
				style,
			)}
		>
			{loading ? (
				<ActivityIndicator color={textColor} />
			) : (
				<Text
					style={tw.style(
						`text-center text-[${textColor}] text-lg tablet:text-4xl`,
						outline && `text-[${textColor}]`,
					)}
				>
					{title}
				</Text>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({});
