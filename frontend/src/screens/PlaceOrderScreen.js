import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link } from "react-router-dom";
import Message from "../components/messege";
import { saveOrder } from "../actions/orderAction";
import Loader from "../components/loader";

const PlaceOrderScreen = ({ history }) => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;
	cart.itemsPrice = cart.cartItems
		.reduce((acc, item) => acc + item.price * item.qty, 0)
		.toFixed(2);
	cart.shippingPrice = cart.itemsPrice <= 99 ? 0 : 100;
	cart.taxPrice = Number((cart.itemsPrice * 0.02).toFixed(2));
	cart.totalPrice = Number(
		cart.taxPrice + Number(cart.shippingPrice) + Number(cart.itemsPrice)
	).toFixed(2);

	const orderCreate = useSelector((state) => state.orderCreate);
	const { loading, error, success, order } = orderCreate;

	useEffect(() => {
		if (success) {
			history.push(`/orders/${order._id}`);
		}
		// eslint-disable-next-line
	}, [history, order]);

	const placeOrderHandler = () => {
		dispatch(
			saveOrder({
				orderItems: cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: Number(cart.itemsPrice),
				taxPrice: cart.taxPrice,
				shippingPrice: cart.shippingPrice,
				totalPrice: Number(cart.totalPrice),
			})
		);
	};
	return (
		<Row>
			<Col md={8}>
				<CheckoutSteps step1 step2 step3 step4 />
				<ListGroup variant="flush">
					<ListGroup.Item>
						<h2>Shipping</h2>
						<p>
							<strong style={{ fontWeight: "bold" }}>Address:</strong>
							{cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
							{cart.shippingAddress.country}
						</p>
					</ListGroup.Item>
					<ListGroup.Item>
						<h2>Payment Method</h2>
						{cart.paymentMethod}
					</ListGroup.Item>
					<ListGroup.Item>
						<h2>Ordered Items</h2>
						{cart.cartItems.length === 0 ? (
							<Message>No items in the cart</Message>
						) : (
							<ListGroup variant="flush">
								{cart.cartItems.map((item, index) => (
									<ListGroup.Item key={index}>
										<Row className="align-items-center">
											<Col md={2}>
												<Image src={item.image} fluid rounded />
											</Col>
											<Col>
												<Link to={`/product/${item.product}`}>{item.name}</Link>
											</Col>
											<Col md={4}>
												{item.qty} x {item.price} ={" "}
												{(item.qty * item.price).toFixed(2)}
											</Col>
										</Row>
									</ListGroup.Item>
								))}
							</ListGroup>
						)}
					</ListGroup.Item>
				</ListGroup>
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Order summary</h2>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>price</Col>
								<Col>${cart.itemsPrice}</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Shipping price</Col>
								<Col>${cart.shippingPrice}</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Tax</Col>
								<Col>${cart.taxPrice}</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Total amount</Col>
								<Col>${cart.totalPrice}</Col>
							</Row>
						</ListGroup.Item>
						{error ? (
							<ListGroup.Item>
								<Message variant="danger">{error.data.message}</Message>
							</ListGroup.Item>
						) : (
							loading && <Loader />
						)}
						<ListGroup.Item>
							<Button
								type="button"
								className="w-100"
								onClick={placeOrderHandler}
							>
								Place order
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
};

export default PlaceOrderScreen;
