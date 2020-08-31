import React from "react";
import {useDispatch} from "react-redux";
import {View, Text, StyleSheet, Button, ToastAndroid, Alert} from "react-native";

import {deleteProductStore} from "../redux/action-creators";
import {QUESTION_WHEN_DELETING, ACTION_CANCELED} from "../messages";
import {calcBarWidthAndColor, differenceBetweenDates} from "../util";

function Product({id, name, dateStart, dateEnd}) {
	const dispatch = useDispatch();
	const {width, backgroundColor} = calcBarWidthAndColor(
		new Date(dateStart),
		new Date(),
		new Date(dateEnd),
	);

	const barStyle = {
		height: 5,
		width: width + "%",
		backgroundColor,
	};

	const showToast = (message) => ToastAndroid.show(message, ToastAndroid.SHORT);

	const deleteProduct = () => {
		if(Math.floor(width) > 49) {
			Alert.alert("Delete", QUESTION_WHEN_DELETING,
				[
					{text: "Cancel", style: "cancel", onPress: () => showToast(ACTION_CANCELED)},
					{text: "OK", onPress: () => {
						dispatch(deleteProductStore(id))
						.then(message => showToast(message))
						.catch(e => showToast(e));
					}}
				],
				{cancelable: false}
			);
		} else {
			dispatch(deleteProductStore(id))
			.then(message => showToast(message))
			.catch(e => showToast(e));
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.wrapper}>
				<Text style={styles.text}>{name}</Text>
				<View style={{flexDirection: "row", alignItems: "center"}}>
					<Text
						style={{color: "white", fontSize: 18, marginRight: 10}}>
							{differenceBetweenDates(new Date(dateEnd), new Date())} days
					</Text>
					<Button color={backgroundColor} title="Delete" onPress={deleteProduct}/>
				</View>
			</View>
			<View style={barStyle}></View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 5,
		backgroundColor: "#393939",
	},
	wrapper: {
		padding: 15,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	text: {
		color: "white",
		fontSize: 18,
	},
	buttonContainer: {
		backgroundColor: "#673ab7",
		padding: 5,
		borderRadius: 5,
	}
});

export default Product;