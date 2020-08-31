import React from "react";
import {View} from "react-native";

import Header from "./components/Header";
import ProductList from "./components/ProductList";
import NewProduct from "./components/NewProduct";

function HomeScreen() {
	return (
		<View style={{backgroundColor: "#edeef0", height: "100%"}}>
			<Header/>
			<NewProduct/>
			<ProductList/>
		</View>
	  );
}

export default HomeScreen;