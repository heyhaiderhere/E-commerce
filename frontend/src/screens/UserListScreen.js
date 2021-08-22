import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { getUserList, deleteUser } from "../actions/userAction";
import Message from "../components/messege";
import Loader from "../components/loader";

const UserListScreen = ({ history }) => {
	const dispatch = useDispatch();

	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDelete = useSelector((state) => state.userDelete);
	const { loadinng: loadingDelete, error: errorDelete, success } = userDelete;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(getUserList());
		} else {
			history.push("/");
		}
	}, [dispatch, history, userInfo, success]);

	const deleteHandler = (id) => {
		dispatch(deleteUser(id));
	};
	return (
		<div>
			<h1>Users List</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error.data.message}</Message>
			) : (
				<Table striped bordered hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td className="text-center">
									<i
										className={user.isAdmin ? "fa fa-check" : "fa fa-times"}
										style={user.isAdmin ? { color: "green" } : { color: "red" }}
									></i>
								</td>
								<td className="text-center">
									<LinkContainer to={`/admin/user/${user._id}/edit`}>
										<Button className="btn btn-sm">
											<i className="fa fa-edit"></i>
										</Button>
									</LinkContainer>
									<Button
										className="btn btn-sm btn-danger"
										onClick={() => deleteHandler(user._id)}
									>
										<i className="fa fa-trash"></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</div>
	);
};

export default UserListScreen;
