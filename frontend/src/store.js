import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	productListReducer,
	productDetailReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducer";
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateReducer,
	userListReducer,
	userDeleteReducer,
} from "./reducers/userReducer";
import {
	orderCreateReducer,
	getOrderDetailsReducer,
	orderPayReducer,
	orderListReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
	productList: productListReducer,
	productDetail: productDetailReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdate: userUpdateReducer,
	orderCreate: orderCreateReducer,
	getOrderDetails: getOrderDetailsReducer,
	orderPay: orderPayReducer,
	orderList: orderListReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
});
const cartItemsFromLocalStore = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];
const shippingAddressFromLocalStore = localStorage.getItem("shippingAddress")
	? JSON.parse(localStorage.getItem("shippingAddress"))
	: [];
const userInfoFromLocalStore = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;
const initialState = {
	cart: {
		cartItems: cartItemsFromLocalStore,
		shippingAddress: shippingAddressFromLocalStore,
	},
	userLogin: { userInfo: userInfoFromLocalStore },
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
