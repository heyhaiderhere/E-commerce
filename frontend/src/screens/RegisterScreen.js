import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/messege";
import Loader from "../components/loader";
import { register } from "../actions/userAction";
import FormContainer from "../components/formContainer";

const RegisterScreen = ({ location, history }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [name, setName] = useState("");
	const [messege, setMessage] = useState(null);

	const dispatch = useDispatch();

	const userRegister = useSelector((state) => state.userRegister);
	const { loading, error, userInfo } = userRegister;

	const redirect = location.search ? location.search.split("=")[1] : "/";

	useEffect(() => {	
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, redirect, userInfo]);
	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage("Passwords does not match");
		} else {
			dispatch(register(email, password, name));
		}
	};

	return (
		<FormContainer>
			<h1>Sign Up</h1>
			{messege && <Message variant="danger">{messege}</Message>}
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
					Sign in
				</Button>
			</Form>

			<Row className="py-3">
				<Col>
					Already have an account?&nbsp; &nbsp;
					<Link to={redirect ? `/login?redirect=${redirect}` : "/register"}>
						Sign in
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RegisterScreen;
