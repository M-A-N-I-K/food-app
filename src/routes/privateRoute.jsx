import React from "react";
import { Navigate } from "react-router-dom";
import { Auth } from "../firebase";

const PrivateRoute = ({ children }) => {
	return Auth.currentUser ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;
