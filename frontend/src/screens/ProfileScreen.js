import React, { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/messege";
import Loader from "../components/loader";
import { getUserDetails, updateUserProfile } from "../actions/userAction";
import { myOrderList } from "../actions/orderAction";

const ProfileScreen = ({ history }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [name, setName] = useState("");
	const [messege, setMessage] = useState(null);

	const dispatch = useDispatch();	

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdate = useSelector((state) => state.userUpdate);
	const { success } = userUpdate;

	const orderList = useSelector((state) => state.orderList);
	const { loading: loadingOrders, error: errorOrders, orders } = orderList;

	console.log(orders);

	useEffect(() => {
		if (!userInfo) {
			history.push("/login");
		} else {
			if (!user.name) {
				dispatch(getUserDetails("profile"));
				dispatch(myOrderList());
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [history, userInfo, dispatch, user]);
	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage("Passwords does not match");
		} else {
			dispatch(updateUserProfile({ id: user._id, name, email, password }));
		}
	};

	return (
		<Row>
			<Col md={3}>
				<h1>Sign Up</h1>
				{messege && <Message variant="danger">{messege}</Message>}
				{success && (
					<Message variant="success">Profile updaed successfully</Message>
				)}
				{error && <Message variant="danger">{error.data.message}</Message>}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control
							value={name}
							type="text"
							placeholder="Enter your name"
							onChange={(e) => {
								setName(e.target.value);
							}}
						></Form.Control>
					</Form.Group>

					<Form.Group>
						<Form.Label>Email</Form.Label>
						<Form.Control
							value={email}
							type="email"
							placeholder="Enter your email"
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						></Form.Control>
					</Form.Group>

					<Form.Group>
						<Form.Label>Password</Form.Label>
						<Form.Control
							value={password}
							type="password"
							placeholder="Enter your password"
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						></Form.Control>
					</Form.Group>

					<Form.Group>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							value={confirmPassword}
							type="password"
							placeholder="Confirm password"
							onChange={(e) => {
								setConfirmPassword(e.target.value);
							}}
						></Form.Control>
					</Form.Group>

					<Button type="submit" variant="dark">
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h1>Orders</h1>
				{loadingOrders ? (
					<Loader />
				) : errorOrders ? (
					<Message variant="danger">{errorOrders.data.message}</Message>
				) : (
					<Table striped border hover responsive className="table-sm">
						<thead>
							<th>ID</th>
							<th>DATE</th>
							<th>TOTAL</th>
							<th>PAID</th>
							<th>DELIVERED</th>
							<th></th>
						</thead>
						<tbody>
							{orders &&
								orders.map((order) => (
									<tr key={order._id}>
										<td>{order._id}</td>
										<td>{order.createdAt.substr(0, 10)}</td>
										<td>{order.totalPrice}</td>
										<td>
											{order.isPaid ? (
												order.paidAt.substr(0, 10)
											) : (
												<i className="fa fa-times"></i>
											)}
										</td>
										<td className="text-center">
											{order.isDelivered ? (
												order.deliveredAt.substr(0, 10)
											) : (
												<i className="fa fa-times" style={{ color: "red" }}></i>
											)}
										</td>
										<td>
											<LinkContainer to={`/orders/${order._id}`}>
												<Button className="btn btn-sm">details</Button>
											</LinkContainer>
										</td>
									</tr>
								))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
};

export default ProfileScreen;
