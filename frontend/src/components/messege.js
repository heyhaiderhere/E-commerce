import React from "react";
import { Alert } from "react-bootstrap";

const messege = ({ variant, children }) => {
	return <Alert variant={variant}>{children}</Alert>;
};

messege.defaultProps = {
	variant: "info",
};

export default messege;
