import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
import PropTypes from "prop-types";
import {useAuth} from "../utils/hooks/useAuth.js";

export const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired
};