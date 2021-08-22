import React from "react";
import { Link } from "react-router-dom";

const GoBack = ({ text, redirect }) => {
	return (
		<div>
			<Link className="btn btn-dark" to={redirect}>
				{text}
			</Link>
		</div>
	);
};

GoBack.defaultProps = {
	text: "Go Back",
	redirect: "/",
};

export default GoBack;
