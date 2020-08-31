import React, {useState} from "react";
import {useDispatch} from "react-redux";
import DateTimePicker from '@react-native-community/datetimepicker';
import {View, TextInput, Button, StyleSheet, Platform, ToastAndroid, Alert} from "react-native";

import {postProductStore} from "../redux/action-creators";
import {dateToString, generateId, compareDates} from "../util";
import {ERROR_SELECT_DATE, ERROR_INPUT_NAME} from "../messages";

function NewProduct() {
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const [date, setDate] = useState(new Date());
	const [productName, setProductName] = useState("");

	const onChange = (_, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === "ios");
		setDate(currentDate);
	};

	const showDatepicker = () => {
		setShow(true);
	};

	const alertShow = (title, message) => 
		Alert.alert(
			title, message,
			[{text: "OK"}],
			{cancelable: false}
	);

	const showToast = (message) => ToastAndroid.show(message, ToastAndroid.LONG);

	const postProduct = () => {
		if(productName.length == 0) {
			alertShow("Name", ERROR_INPUT_NAME);
			return false;
		}
		if(compareDates(new Date(), date)) {
			alertShow("Date", ERROR_SELECT_DATE);
			return false;
		}

		dispatch(postProductStore({
			id: generateId(),
			name: productName,
			dateStart: new Date(),
			dateEnd: date,
		}))
		.then(message => {
			showToast(message);
			setDate(new Date);
			setProductName("");
		})
		.catch(message => showToast(message));
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				value={productName}
				onChangeText={text => setProductName(text)}
				maxLength={15}
				numberOfLines={1}
				placeholder="Name product"
				placeholderTextColor="white"
			/>
			<View style={{flexDirection: "row"}}>
			<View  style={{marginRight: 10}}>
				<Button title={dateToString(date)} onPress={showDatepicker}/>
			</View>
			{show && (
				<DateTimePicker
					testID="dateTimePicker"
					value={date}
					mode={"date"}
					display="default"
					onChange={onChange}
				/>
			)}
			<Button title="Add" onPress={postProduct}/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 15,
		backgroundColor: "#434343",
		margin: 5,
		flexDirection: "row",
		justifyContent: "space-between"
	},
	input: {
		fontSize: 18,
		color: "white",
		borderBottomColor: "white",
		borderBottomWidth: 1
	}
});

export default NewProduct;