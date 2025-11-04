import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/useAuth";

export const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) return <p>Loading...</p>;

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};
