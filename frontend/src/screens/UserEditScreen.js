import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "../actions/userAction";
import Message from "../components/messege";
import Loader from "../components/loader";

import FormContainer from "../components/formContainer";

const UserEditScreen = ({ match, history }) => {
	const dispatch = useDispatch();
	const userId = match.params.id;
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	useEffect(() => {});

	const submitHandler = (e) => {
		e.preventDefault();
		console.log("haiderali");
	};
	return (
		<>
			<Link to={"/admin/userlist"} className="btn btn-dark my-3">
				GoBack
			</Link>
			<FormContainer>
				<h1>Edit user</h1>
				<Form onSubmit={submitHandler}>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control
							value={name}
							type="text"
							placeholder="Enter name"
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
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							value={isAdmin}
							type="checkbox"
							placeholder="Confirm password"
							onChange={(e) => {
								setIsAdmin(e.target.value);
							}}
						></Form.Control>
					</Form.Group>

					<Button type="submit" variant="dark">
						Update
					</Button>
				</Form>
			</FormContainer>
		</>
	);
};

export default UserEditScreen;
