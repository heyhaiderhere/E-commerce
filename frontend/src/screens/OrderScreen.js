import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link } from "react-router-dom";
import Message from "../components/messege";
import { getOrderDetailsById, payOrder } from "../actions/orderAction";
import Loader from "../components/loader";
import { ORDER_PAY_RESET } from "../constents/orderConstents";

const OrderScreen = ({ match }) => {
	const orderId = match.params.id;
	const dispatch = useDispatch();
	const getOrderDetails = useSelector((state) => state.getOrderDetails);
	const { loading, error, order } = getOrderDetails;

	const orderPay = useSelector((state) => state.orderPay);
	const { loading: loadingPay, success: successPay } = orderPay;

	useEffect(() => {
		if (!order || order._id !== orderId) {
			dispatch(getOrderDetailsById(orderId));
		}
	}, [dispatch, orderId, order]);

	if (order) {
		order.itemsPrice = order.orderItems
			.reduce((acc, item) => acc + item.price * item.qty, 0)
			.toFixed(2);
	}

	const onPayHandler = () => {
		dispatch(payOrder(orderId, { email: `${order.user.name}@paypal.com` }));
	};
	useEffect(() => {
		if (!order || successPay) {
			dispatch(getOrderDetailsById(orderId));
			dispatch({ type: ORDER_PAY_RESET });
		}
	}, [dispatch, orderId, order, successPay]);
	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error.data.message}</Message>
	) : (
		<>
			<Row>
				<Col md={8}>
					<CheckoutSteps step1 step2 step3 step4 />
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong style={{ fontWeight: "bold" }}>Address:</strong>
								{order.shippingAddress.address}, {order.shippingAddress.city},{" "}
								{order.shippingAddress.country}
							</p>
							<p>
								<strong>Name: </strong>
								{order.user.name}
							</p>
							<p>
								<strong>email: </strong>
								<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
							</p>

							{order.isDelivered ? (
								<Message variant="success">
									Delivered on {order.deliveredAt}
								</Message>
							) : (
								<Message variant="danger">Not Delivered</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							{order.paymentMethod}
							{order.isPaid ? (
								<Message variant="success">Paid On {order.paidAt}</Message>
							) : (
								<Message variant="danger">Not Paid</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Ordered Items</h2>
							{order.orderItems.length === 0 ? (
								<Message>No items in the cart</Message>
							) : (
								<ListGroup variant="flush">
									{order.orderItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row className="align-items-center">
												<Col md={2}>
													<Image src={item.image} fluid rounded />
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
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
									<Col>${order.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping price</Col>
									<Col>${order.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>${order.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total amount</Col>
									<Col>${order.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							<Button
								type="button"
								variant="dark"
								onClick={onPayHandler}
								disabled={order.isPaid}
							>
								{order.isPaid ? "Paid" : "pay"}
							</Button>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default OrderScreen;
