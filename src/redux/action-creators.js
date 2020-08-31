import {
	GET_PRODUCTS,
	POST_PRODUCT,
	DELETE_PRODUCT,
} from "./action-types";
import {POST_SUCCESS, DELETE_SUCCESS, ERROR} from "../messages";
import {AsyncStorage} from 'react-native';

const storeName = "ProductStore";

const getProducts = (products) => ({
	type: GET_PRODUCTS, products
});

const postProduct = (product) => ({
	type: POST_PRODUCT, product
});

const deleteProduct = (id) => ({
	type: DELETE_PRODUCT, id
});

export const getProductsStore = () => async (dispach) => {
	await AsyncStorage.getItem(storeName)
	.then(data => JSON.parse(data))
	.then(async data => {
		if(data === null) {
			await AsyncStorage.setItem(storeName, JSON.stringify([]));
			dispach(getProducts([]));
		} else if(data != null) {
			console.log(data)
			dispach(getProducts(data));
		}
	})
	.catch(e => console.log(e));
};

export const postProductStore = (product) => (dispach) => {
	return new Promise(async (resolve, reject) => {
		await AsyncStorage.getItem(storeName)
		.then(data => JSON.parse(data))
		.then(async data => {
			if(data != null) {
				data.push(product);
				const prepareData = JSON.stringify(data);
				await AsyncStorage.setItem(storeName, prepareData);
				dispach(postProduct(product));
				resolve(POST_SUCCESS);
			}
		})
		.catch(e => {
			console.log(e);
			reject(ERROR);
		});
	});
};

export const deleteProductStore = (id) => (dispach) => {
	return new Promise(async (resolve, reject) => {
		await AsyncStorage.getItem(storeName)
		.then(data => JSON.parse(data))
		.then(async data => {
			if(data != null) {
				const productIndex = data.findIndex(data => data.id === id);
				data.splice(productIndex, 1);
				const prepareData = JSON.stringify(data);
				await AsyncStorage.setItem(storeName, prepareData);
				dispach(deleteProduct(id));
				resolve(DELETE_SUCCESS);
			}
		})
		.catch(e => {
			console.log(e);
			reject(ERROR);
		});
	});
};
