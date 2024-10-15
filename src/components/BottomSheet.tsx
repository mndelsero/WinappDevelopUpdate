import { StyleSheet, View } from "react-native";
import React, { useMemo } from "react";
import BottomSheetCom from "@gorhom/bottom-sheet";
import tw from "@/config/tw";

interface Props extends React.ComponentProps<typeof BottomSheetCom> {
	backgroundColor?: string;
	children: React.ReactNode;
	ref?: React.RefObject<BottomSheetCom>;
}

export default function BottomSheet({
	snapPoints: points,
	ref,
	backgroundColor = "white",
	children,
	...props
}: Props) {
	const snapPoints = useMemo(() => points, [points]);

	return (
		<BottomSheetCom
			backgroundStyle={{ backgroundColor: backgroundColor }}
			snapPoints={snapPoints}
			ref={ref}
			{...props}
		>
			<View style={tw`h-full w-full p-5`}>{children}</View>
		</BottomSheetCom>
	);
}

const styles = StyleSheet.create({});
