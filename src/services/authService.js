import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

const authService = {
    login: async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`,
                new URLSearchParams({
                    'username': email,
                    'password': password
                }), {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }
            );
            return response.data;
        } catch (error) {
            // De nuevo lanzamos el error para manejarlo en el componente
            throw error;
        }
    },

    getMe: async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const response = await axios.get(`${API_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    logout: async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            // Hacer la petición al backend antes de limpiar el localStorage
            const response = await axios.post(`${API_URL}/auth/logout`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // Solo si la petición es exitosa, limpiamos el localStorage
            console.log('Logout response:', response);
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            return response.data;
        } catch (error) {
            console.error('Error during logout:', error);
            // En caso de error también limpiamos
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            throw error;
        }
    },

    // Método para verificar si el usuario está autenticado
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};

// Interceptor para manejar errores de autenticación
axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        authService.logout();
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
);

// Interceptor para añadir el token a todas las peticiones
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export { authService };