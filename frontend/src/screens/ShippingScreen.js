import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/formContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartAction";

const ShippingScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [address, setAdress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const [country, setCountry] = useState(shippingAddress.country);
	const dispatch = useDispatch();
	const onSubmitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, country, city, postalCode }));
		history.push("/payment");
	};

	return (
		<FormContainer>
			<h1>Shipping</h1>
			<CheckoutSteps step1 step2 />
			<Form onSubmit={onSubmitHandler}>
				<Form.Group>
					<Form.Label>Adress</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter your shipping address"
						required
						value={address}
						onChange={(e) => {
							setAdress(e.target.value);
						}}
					></Form.Control>
				</Form.Group>
				<Form.Group>
					<Form.Label>City</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter city"
						required
						value={city}
						onChange={(e) => {
							setCity(e.target.value);
						}}
					></Form.Control>
				</Form.Group>
				<Form.Group>
					<Form.Label>Postal code</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter postal code"
						required
						value={postalCode}
						onChange={(e) => {
							setPostalCode(e.target.value);
						}}
					></Form.Control>
				</Form.Group>
				<Form.Group>
					<Form.Label>Country</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter country"
						required
						value={country}
						onChange={(e) => {
							setCountry(e.target.value);
						}}
					></Form.Control>
				</Form.Group>
				<Button type="submit" variant="dark" className="mt-3">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ShippingScreen;
