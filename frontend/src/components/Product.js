import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
const Product = ({ product }) => {
	return (
		<>
			<Card className="my-3 p-3 rounded">
				<Link to={`/product/${product._id}`}>
					<Card.Img src={product.image} variant="top" />
				</Link>
				<Card.Title as="div">
					<Link to={`/product/${product._id}`}>
						<div className="py-3">
							<h6>{product.name}</h6>
						</div>
					</Link>
				</Card.Title>
				<Card.Title as="div">
					<Rating
						value={product.rating}
						text={`${product.numReviews} Reviews`}
					/>
				</Card.Title>
				<Card.Text as="h3">
					<div>${product.price}</div>
				</Card.Text>
			</Card>
		</>
	);
};

export default Product;
