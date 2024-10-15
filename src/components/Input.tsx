import { View, Text, TextInput } from "react-native";
import React from "react";
import tw from "@/config/tw";

interface Props {
	errorMessage?: string;
	error?: boolean;
	placeholder: string;
	focus?: boolean;
	onChangeText?: (text: string) => void;
	value?: string;
	onFocus?: (e: any) => void;
	onBlur?: (e: any) => void;
	secureTextEntry?: boolean;
}
export default function Input({
	error = false,
	errorMessage = "",
	placeholder,
	focus,
	onChangeText,
	value,
	onBlur,
	secureTextEntry,
	onFocus,
}: Props) {
	return (
		<View style={tw` h-10 tablet:h-20 my-4 w-full bg-white  rounded-lg shadow-md`}>
			<TextInput
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				onFocus={onFocus}
				secureTextEntry={secureTextEntry}
				onBlur={onBlur}
				placeholderTextColor={error ? "red" : "grey"}
				style={tw.style(
					"h-8 tablet:h-13 tablet:text-xl border-gray-300 my-1 w-full px-3 ",
					error && "border-red-500",
					focus && "border-black",
				)}
			/>
			<Text
				style={tw.style(
					"text-2xs tablet:text-lg mt-2 px-2",
					error && "text-red-500 font-bold",
				)}
			>
				{errorMessage}
			</Text>
		</View>
	);
}
