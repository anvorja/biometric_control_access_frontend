// src/context/AuthProvider.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { authService } from '../services/authService';
import { useSnackbar } from '../utils/hooks/useSnackbarHooks.js';
import AuthContext from './AuthContext.js';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (token && user) {
            setToken(token);
            setUser(JSON.parse(user));
        }
    }, []);

    const login = (accessToken, userData) => {
        setToken(accessToken);
        setUser(userData);
        localStorage.setItem('token', accessToken);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = async () => {
        try {
            await authService.logout();
            setToken(null);
            setUser(null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            showSnackbar('Salida exitosa', 'success');
            navigate('/login', { replace: true });
        } catch (error) {
            console.error('Error in logout:', error);
            showSnackbar('Error al cerrar sesión', 'error');
        }
    };

    const isAuthenticated = () => {
        return !!token;
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                isAuthenticated
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};