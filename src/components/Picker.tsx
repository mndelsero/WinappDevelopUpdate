import { StyleSheet, Text, View } from "react-native";
import RNPickerSelect, { PickerStyle, Item } from "react-native-picker-select";
import Ionicons from "@expo/vector-icons/Ionicons";

import React from "react";

interface Props {
	items: Item[];
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	style?: PickerStyle;
}

export default function Picker({
	value,
	onChange,
	placeholder,
	items,
	...props
}: Props) {
	if (items?.length === 0) {
		return null;
	}
	return (
		<View>
			<RNPickerSelect
				style={{
					viewContainer: {
						borderWidth: 3,
						borderColor: "white",
						borderRadius: 30,
						backgroundColor: "white",
					},

					inputIOS: {
						padding: 20,
						color: "black",
					},
					inputAndroid: {
						color: "black",

						borderWidth: 3,
						borderColor: "white",
					},
					placeholder: {
						color: "black",
					},
					modalViewBottom: {
						backgroundColor: "white",
					},

					modalViewMiddle: {
						backgroundColor: "white",
					},
					modalViewTop: {
						backgroundColor: "white",
					},
					iconContainer: {
						position: "absolute",
						right: 15,
						top: 18,
					},
					...props.style,
				}}
				onValueChange={(value) => {
					onChange?.(value);
				}}
				// @ts-ignore
				Icon={() => {
					return (
						<View
							style={{
								width: 20,
								height: 20,
								alignItems: "center",
							}}
						>
							<Ionicons name="chevron-down" size={20} />
						</View>
					);
				}}
				value={value}
				items={items}
				placeholder={{
					label: placeholder ?? "Selecciona una opción",
					value: null,
					color: "black",
				}}
			/>
		</View>
	);
}
