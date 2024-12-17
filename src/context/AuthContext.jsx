import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Inicializar el estado con los valores almacenados
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const navigate = useNavigate();

    // Verificar el estado de autenticación al cargar
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
            console.log('Starting logout...');
            await authService.logout();
            console.log('Logout successful');
            setToken(null);
            setUser(null);
            navigate('/login', { replace: true });
        } catch (error) {
            console.error('Error in logout:', error);
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

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};