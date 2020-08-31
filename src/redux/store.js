import {createStore} from "redux";

import reducers from "./reducers";
import enhancer from "./reactRevTools";

export default createStore(
	reducers,
	enhancer,
);