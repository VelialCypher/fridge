import {combineReducers} from "redux";
import {
	GET_PRODUCTS,
	POST_PRODUCT,
	DELETE_PRODUCT,
} from "./action-types";
import {sortByDate} from "../util";

const products = (state = [], action) => {
	switch (action.type) {
		case GET_PRODUCTS:
			return sortByDate(action.products);
		case POST_PRODUCT:
			return [
				...state,
				action.product,
			];
		case DELETE_PRODUCT:
			const [...newState] = state;
			const index = state.findIndex(product => product.id === action.id);
			newState.splice(index, 1);
			return newState;
		default: return state;
	}
}

export default combineReducers({products});