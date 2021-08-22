import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/loader";
import Message from "../components/messege";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
const HomeScreen = () => {
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;
	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);
	return (
		<>
			<h1>New Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message>{error.data.message}</Message>
			) : (
				<Row>
					{products.map((product) => {
						return (
							<Col key={product._id} md={4} sm={6} lg={3}>
								<Product product={product} />
							</Col>
						);
					})}
				</Row>
			)}
		</>
	);
};

export default HomeScreen;
