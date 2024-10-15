import { Modal, Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import tw from "@/config/tw";
import { IS_ANDROID, IS_IOS } from "@/utils/constants";
import BottomSheet from "./BottomSheet";
import { format } from "date-fns";

interface Props {
	errorMessage?: string;
	error?: boolean;
	placeholder: string;
	focus?: boolean;
	onChangeText?: (text: string) => void;
	value?: string;
	onFocus?: (e: any) => void;
	onBlur?: () => void;
	setValue:any;
}
export default function InputDatePicker({
	error,
	errorMessage,
	onChangeText,
	value,
	placeholder,
	setValue,
}: Props) {
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = (date: Date) => {
		const formated = format(date, "dd/MM/yyyy");
		
		setValue(formated)
		
		
		hideDatePicker();
	
	};

	return (
		<View style={tw` h-12 tablet:h-20 my-3 w-full mb-4`}>
			<View style={tw`h-10 tablet:h-20 my-4 w-full bg-white  rounded-lg shadow-md`}>

			<Text
				onPress={() => {
					showDatePicker();
				}}
				style={[{ color: error ? "red" : "grey" }, tw`text-sm tablet:text-xl my-auto px-3 `]}
			>
				{value != null ? value : placeholder}
			</Text>
			</View>
			<View style={tw``} />
			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode="date"
				onConfirm={handleConfirm}
				onCancel={hideDatePicker}

			/>
			<Text
				style={tw.style(
					"text-2xs tablet:text-lg mt-1",
					error && "text-red-500 font-bold",
				)}
			>
				{errorMessage}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({});
