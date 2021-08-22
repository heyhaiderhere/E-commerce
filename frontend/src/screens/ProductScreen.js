import React, { useState, useEffect } from "react";
import {
	Row,
	Col,
	ListGroup,
	Card,
	Button,
	Image,
	Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";
import { detailProduct } from "../actions/productActions";
import Loader from "../components/loader";
import Message from "../components/messege";
import GoBack from "../components/GoBack";
const ProductScreen = ({ history, match }) => {
	const [qty, setQty] = useState(1);
	const dispatch = useDispatch();
	const productDetail = useSelector((state) => state.productDetail);
	const { loading, error, product } = productDetail;
	useEffect(() => {
		dispatch(detailProduct(match.params.id));
	}, [dispatch, match]);

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};

	// const product = products.find((product) => product._id === match.params.id);
	// { const prd = 9 }
	return (
		<>
			<GoBack />
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error.data.message}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image src={product.image} fluid />
					</Col>
					<Col md={3}>
						<ListGroup variant="flush">
							<ListGroup.Item className="m-0 p-0 py-3">
								<h4>{product.name}</h4>
							</ListGroup.Item>
							<ListGroup.Item className="m-0 p-0 py-3">
								Description: {product.description}
							</ListGroup.Item>
							<Rating
								value={product.rating}
								text={`${product.numReviews} Reviews`}
							/>
							<ListGroup.Item className="my-0 p-0 py-3">
								<h2>${product.price}</h2>
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<Row className="align-items-center">
										<Col>Price:</Col>
										<Col>
											<h5 className="mt-2">${product.price}</h5>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row className="align-items-center">
										<Col>Status:</Col>
										<Col>
											{product.countInStock > 0 ? "In stock" : "Out of stock"}
										</Col>
									</Row>
								</ListGroup.Item>
								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Qty</Col>
											<Col>
												<Form.Control
													as="select"
													value={qty}
													onChange={(e) => setQty(e.target.value)}
												>
													{[...Array(product.countInStock).keys()].map((x) => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}
								<ListGroup.Item className="d-flex justify-content-center">
									<Button
										onClick={addToCartHandler}
										className="btn btn-dark block w-100"
										disabled={product.countInStock === 0}
									>
										Add to card
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	);
};

export default ProductScreen;
