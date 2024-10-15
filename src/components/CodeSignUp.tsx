import { StyleSheet, Text, View } from "react-native";
import BottomSheetRef from "@gorhom/bottom-sheet";
import React, { RefObject, useEffect, useRef, useState } from "react";
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from "react-native-confirmation-code-field";
import BottomSheet from "@gorhom/bottom-sheet";

import tw from "@/config/tw";

const CELL_COUNT = 6;

interface Props {
	onConfirm: (value: string) => void;
}
export default function CodeSignUp({ onConfirm }: Props) {
	const bottomRef = useRef<BottomSheetRef>(null);
	const [value, setValue] = useState("");
	const ref = useBlurOnFulfill({ value, cellCount: 6 });
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});

	return (
		<BottomSheet
			enableOverDrag={true}
			enableDynamicSizing={true}
			snapPoints={["30%"]}
			{...props}
		>
			<View style={tw`h-full w-full p-5`}>
				<Text>hOLA</Text>
			</View>
		</BottomSheet>
	);
}

const styles = StyleSheet.create({
	root: { flex: 1, padding: 20 },
	title: { textAlign: "center", fontSize: 30 },
	codeFieldRoot: { marginTop: 20 },
	cell: {
		width: 40,
		height: 40,
		lineHeight: 38,
		fontSize: 34,
		borderBottomWidth: 2,
		borderColor: tw.color("primary"),
		textAlign: "center",
	},
	focusCell: {
		borderColor: "#000",
	},
});
