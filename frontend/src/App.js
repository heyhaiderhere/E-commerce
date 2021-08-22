import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";

function App() {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Container>
					<Route path="/admin/user/:id/edit" component={UserEditScreen} />
					<Route path="/admin/userlist" component={UserListScreen} />
					<Route path="/orders/:id" component={OrderScreen} />
					<Route path="/placeorder" component={PlaceOrderScreen} />
					<Route path="/payment" component={PaymentScreen} />
					<Route path="/login" component={LoginScreen} />
					<Route path="/profile" component={ProfileScreen} />
					<Route path="/register" component={RegisterScreen} />
					<Route path="/product/:id" component={ProductScreen} />
					<Route path="/cart/:id?" component={CartScreen} />
					<Route path="/shipping" component={ShippingScreen} />
					<Route path="/" component={HomeScreen} exact />
				</Container>
			</main>
			<Footer />
		</Router>
	);
}

export default App;