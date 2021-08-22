import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/messege";
import Loader from "../components/loader";
import { login } from "../actions/userAction";
import FormContainer from "../components/formContainer";
const LoginScreen = ({ location, history }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;
	const redirect = location.search ? location.search.split("=")[1] : "/";
	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, redirect, userInfo]);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};
	let msg;
	let newMsg = "";
	if (error) {
		msg = error.data;
		newMsg = msg.message;
	}

	return (
		<FormContainer>
			<h1>Sign in</h1>
			{error && <Message variant="danger">{newMsg}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
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
				<Button type="submit" variant="dark">
					Sign in
				</Button>
			</Form>
			<Row className="py-3">
				<Col>
					New customer? &nbsp; &nbsp;
					<Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
						Register      
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default LoginScreen;
