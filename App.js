import React from "react";
import {Provider} from "react-redux";

import store from "./src/redux/store";
import HomeScreen from "./src/HomeScreen";

export default function() {
	return(
		<Provider {...{store}}>
			<HomeScreen/>
		</Provider>
	);
};