import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useSnackbar } from '../components/common/Snackbar';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();  // Añadimos useSnackbar

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
            showSnackbar('Salida exitosa', 'success');  // Añadimos mensaje de éxito
            navigate('/login', { replace: true });
        } catch (error) {
            console.error('Error in logout:', error);
            showSnackbar('Error al cerrar sesión', 'error');  // Añadimos mensaje de error
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