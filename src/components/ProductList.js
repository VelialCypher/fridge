import React, {useEffect} from "react";
import {ScrollView} from "react-native";
import {useSelector, useDispatch} from "react-redux";

import Product from "./Product";
import {getProductsStore} from "../redux/action-creators";

function ProductList() {
	const dispatch = useDispatch();
	const products = useSelector(({products}) => products);

	useEffect(() => {
		dispatch(getProductsStore());
	}, []);

	return (
		<ScrollView style={{paddingLeft: 5, paddingRight: 5}}>
			{
				products.map(({id, name, dateStart, dateEnd}) => 
				(
					<Product key={id} {...{id, name, dateStart, dateEnd}}/>
				))
			}
		</ScrollView>
	);
}

export default ProductList;