import tw from "@/config/tw";
import React, { Component } from "react";
import {
	View,
	StyleSheet,
	Text,
	ImageBackground,
	Image,
	Dimensions,
} from "react-native";
import { SvgUri } from "react-native-svg";

import Svg, { Defs, ClipPath, Path, G } from "react-native-svg";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<View style={tw`px-2 w-[98%]`}>
			<SvgComponent>{children}</SvgComponent>
		</View>
		// <View style={[styles.overlayContainer]}>
		// 	<View style={tw`z-101 p-4 px-6`}>{children}</View>
		// 	{/* <View style={styles.leftOverlay} />
		// 	<View style={styles.rightOverlay} />
		// 	<View style={styles.bottomOverlayUp} />
		// 	<View style={styles.bottomOverlay} /> */}
		// </View>
	);
};

function SvgComponent(props) {
	const viewBoxHeight =
		Dimensions.get("window").height >= 1024
			? 1200
			: Dimensions.get("window").height * 1.7;

	const viewBox = `0 0 770 ${viewBoxHeight}`;

	return (
		<>
			<View
				style={tw`p-4 pt-8 tablet:px-20 tablet:px-36 absolute z-10 w-full left-2 right-0 `}
			>
				{props.children}
			</View>
			<Svg viewBox={viewBox} {...props}>
				<Defs>
					<ClipPath id="a">
						<Path d="M.418 135.762H770.34V496H.418zm0 0" />
					</ClipPath>
					<ClipPath id="b">
						<Path d="M735.7 494.996c19.062 4.02 34.644-8.625 34.644-28.101V171.18c0-19.48-15.938-35.418-35.418-35.418H35.836c-19.48 0-35.418 15.937-35.418 35.418v133.304c0 19.48 15.602 38.711 34.648 42.73zm0 0" />
					</ClipPath>
					<ClipPath id="c">
						<Path d="M.418 0H770.34v360H.418zm0 0" />
					</ClipPath>
					<ClipPath id="d">
						<Path d="M735.7 359.23c19.062 4.02 34.644-8.62 34.644-28.101V35.418C770.344 15.938 754.406 0 734.926 0H35.836C16.356 0 .418 15.938.418 35.418v133.305c0 19.476 15.602 38.71 34.648 42.73zm0 0" />
					</ClipPath>
					<ClipPath id="e">
						<Path d="M.418 241.348H770.34V601.5H.418zm0 0" />
					</ClipPath>
					<ClipPath id="f">
						<Path d="M735.7 600.578c19.062 4.02 34.644-8.621 34.644-28.101V276.766c0-19.48-15.938-35.418-35.418-35.418H35.836c-19.48 0-35.418 15.937-35.418 35.418V410.07c0 19.477 15.602 38.711 34.648 42.73zm0 0" />
					</ClipPath>
				</Defs>
				<G clipPath="url(#a)">
					<G clipPath="url(#b)">
						<Path fill="#fff" d="M.418 135.762H770.98v359.972H.418zm0 0" />
					</G>
				</G>
				<G clipPath="url(#c)">
					<G clipPath="url(#d)">
						<Path fill="#fff" d="M.418 0H770.98v359.969H.418zm0 0" />
					</G>
				</G>
				<G clipPath="url(#e)">
					<G clipPath="url(#f)">
						<Path fill="#fff" d="M.418 241.348H770.98v359.968H.418zm0 0" />
					</G>
				</G>
			</Svg>
		</>
	);
}

export default AuthLayout;
const styles = StyleSheet.create({
	text: {
		color: "#000",
		zIndex: 9999,
	},
	overlayContainer: {
		width: "95%",
		height: 350,
		overflow: "hidden",
	},
	leftOverlay: {
		position: "absolute",
		left: 0,
		top: 0,
		width: "100%",
		height: "75%",
		backgroundColor: "#fff",
		borderRadius: 15,
	},
	rightOverlay: {
		position: "absolute",
		right: 0,
		bottom: -2,
		width: 25,
		height: "100%",
		backgroundColor: "white",
		borderRadius: 15,
		zIndex: 30,
	},
	bottomOverlayUp: {
		position: "absolute",
		right: 0,
		bottom: 50,
		width: "100%",
		height: 85,
		backgroundColor: "#fff",
		borderRadius: 15,
		transform: [{ rotate: "16deg" }],
	},
	bottomOverlay: {
		position: "absolute",
		right: 0,
		bottom: 44,
		width: "100%",
		height: 15,
		backgroundColor: "red",
		borderRadius: 15,
		transform: [{ rotate: "14.19deg" }],
		zIndex: 10,
	},
});
