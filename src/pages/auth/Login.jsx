import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, TextField, Button, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import {useSnackbar} from "../../components/common/Snackbar.jsx";
import { Loading } from '../../components/common/Loading.jsx';

export const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    const { showSnackbar } = useSnackbar();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (!credentials.email || !credentials.password) {
                throw new Error('Por favor, complete todos los campos');
            }

            const data = await authService.login(credentials.email, credentials.password);
            //console.log('Login response:', data);

            // Store the access token in localStorage and context
            if (data.access_token) {

                // Guardamos primero el token
                localStorage.setItem('token', data.access_token);

                // Esperamos un momento para asegurar que el token se guardó
                await new Promise(resolve => setTimeout(resolve, 100));

                // Obtener datos del usuario después del login
                try {
                    // Intentamos obtener los datos del usuario
                    const userData = await authService.getMe();
                    console.log('User data:', userData);

                    // Login completo con datos del usuario
                    login(data.access_token, userData);

                    showSnackbar('Login exitoso', 'success');
                    // Forzar la navegación con replace
                    navigate('/dashboard', { replace: true });

                } catch (userError) {
                    console.error('Error getting user data:', userError);
                    setError('Error obteniendo datos del usuario');
                    showSnackbar('Error obteniendo datos del usuario', 'error');
                }
            } else {
                throw new Error('Error en la autenticación');
            }
        } catch (err) {
            let errorMessage = 'Error en el login';

            if (err.response) {
                // Handle specific API error responses
                switch (err.response.status) {
                    case 401:
                        errorMessage = 'Credenciales inválidas';
                        break;
                    case 422:
                        errorMessage = 'Formato de email o contraseña inválido';
                        break;
                    default:
                        errorMessage = err.response.data?.detail || 'Error en el servidor';
                }
            } else if (err.message) {
                errorMessage = err.message;
            }

            console.error('Login error:', err);
            setError(errorMessage);
            showSnackbar(errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Loading open={loading} />
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                bgcolor: 'grey.100'
            }}>
                <Card sx={{ p: 4, maxWidth: 400, width: '100%' }}>
                    <Typography variant="h5" mb={3} textAlign="center">
                        Acceso al Sistema
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            value={credentials.email}
                            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                            required
                            type="email"
                            autoComplete="email"
                            inputProps={{
                                'data-testid': 'email-input'
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Contraseña"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            value={credentials.password}
                            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                            required
                            autoComplete="current-password"
                            inputProps={{
                                'data-testid': 'password-input'
                            }}
                        />
                        {error && (
                            <Typography color="error" mt={2}>
                                {error}
                            </Typography>
                        )}
                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            sx={{ mt: 3 }}
                            disabled={loading}
                            data-testid="login-button"
                        >
                            Iniciar Sesión
                        </Button>
                    </form>
                </Card>
            </Box>
        </>
    );
};
