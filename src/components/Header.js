import React from "react";
import {View, Text, StyleSheet, StatusBar} from "react-native";

function Header() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Fridge</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		backgroundColor: "#ffffff",
		marginTop: StatusBar.currentHeight,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 7,
		},
		shadowOpacity: 0.41,
		shadowRadius: 9.11,
		elevation: 14,
	},
	text: {fontSize: 20, textAlignVertical: "center"}
});

export default Header;