import React, { useEffect } from "react";
import GoBack from "../components/GoBack";
import { Link } from "react-router-dom";
import {
	ListGroup,
	Row,
	Col,
	Button,
	Image,
	Form,
	Card,
} from "react-bootstrap";
import Message from "../components/messege";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartAction";
const CartScreen = ({ match, location, history }) => {
	const productId = match.params.id;
	const qty = location.search ? Number(location.search.split("=")[1]) : 1;
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, productId, qty]);
	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	const checkOutHandler = () => {
		history.push("/login?redirect=shipping");
	};
	return (
		<>
			<Row>
				<Col md={8}>
					<h1>shopping Cart</h1>
					{cartItems.length === 0 ? (
						<>
							<Message>Your Cart is empty</Message>
							<GoBack text="Go for shopping" className="w-100s" />
						</>
					) : (
						<ListGroup variant="flush">
							{cartItems.map((item) => {
								return (
									<ListGroup.Item key={item.product}>
										<Row className="align-items-center justify-content-between">
											<Col md={2}>
												<Image src={item.image} alt={item.name} fluid rounded />
											</Col>
											<Col md={3}>
												<Link to={`/product/${item.product}`}>
													<h1 id="productName">{item.name}</h1>
												</Link>
											</Col>
											<Col md={2}>${item.price}</Col>
											<Col md={2}>
												<Form.Control
													as="select"
													value={item.qty}
													onChange={(e) =>
														dispatch(
															addToCart(item.product, Number(e.target.value))
														)
													}
												>
													{[...Array(item.countInStock).keys()].map((x) => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
												</Form.Control>
											</Col>
											<Col>
												<Link to={"/cart"}>
													<Button
														type="button"
														onClick={() => removeFromCartHandler(item.product)}
														variant="light"
													>
														<i className="fas fa-trash"></i>
													</Button>
												</Link>
											</Col>
										</Row>
									</ListGroup.Item>
								);
							})}
						</ListGroup>
					)}
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup>
							<ListGroup.Item className="text-center">
								<h1>
									SubTotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
									) items
								</h1>
								<h2>
									$
									{cartItems
										.reduce((acc, item) => acc + item.price * item.qty, 0)
										.toFixed(2)}
								</h2>
							</ListGroup.Item>
							<ListGroup.Item className="d-flex justify-content-center">
								<Button
									variant="dark"
									type="button"
									disabled={cartItems.length === 0}
									className="w-100"
									onClick={checkOutHandler}
								>
									Proceed to Check Out
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default CartScreen;
