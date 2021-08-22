import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/formContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartAction";

const PaymentScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	if (!shippingAddress) {
		history.push("/shipping");
	}

	const [paymentMethod, setPaymentMethod] = useState("PayPal");

	const dispatch = useDispatch();
	const onSubmitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push("/placeorder");
	};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1>Shipping</h1>
			<Form onSubmit={onSubmitHandler}>
				<Form.Group>
					<Form.Label as="legend">Payment Method</Form.Label>
				</Form.Group>
				<Col>
					<Form.Check
						type="radio"
						label="PayPal"
						name="paymentMethod"
						value={paymentMethod}
						checked
						onChange={(e) => setPaymentMethod(e.target.value)}
					></Form.Check>
				</Col>

				<Button type="submit" variant="dark" className="mt-3">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
