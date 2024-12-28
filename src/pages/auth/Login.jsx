import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    IconButton,
    InputAdornment,
} from '@mui/material';
import { Mail, Lock} from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
// import { useSnackbar } from "../../components/common/Snackbar.jsx";
import { useSnackbar } from '../../utils/hooks/useSnackbarHooks.js';
import { Loading } from '../../components/common/Loading.jsx';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useAuth} from "../../utils/hooks/useAuth.js";

export const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
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

            if (data.access_token) {
                localStorage.setItem('token', data.access_token);
                await new Promise(resolve => setTimeout(resolve, 100));

                try {
                    const userData = await authService.getMe();
                    login(data.access_token, userData);
                    showSnackbar('Login exitoso', 'success');
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
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                    padding: 3
                }}
            >
                <Paper
                    elevation={12}
                    sx={{
                        maxWidth: 450,
                        width: '100%',
                        borderRadius: 2,
                        overflow: 'hidden'
                    }}
                >
                    <Box sx={{ p: 4 }}>
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            textAlign="center"
                            color="primary"
                            mb={1}
                        >
                            Bienvenido
                        </Typography>

                        <Typography
                            variant="body1"
                            textAlign="center"
                            color="text.secondary"
                            mb={4}
                        >
                            Ingresa tus credenciales para continuar
                        </Typography>

                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                placeholder="ejemplo@correo.com"
                                variant="outlined"
                                margin="normal"
                                value={credentials.email}
                                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                                required
                                type="email"
                                autoComplete="email"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Mail size={20} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                    }
                                }}
                                data-testid="email-input"
                            />

                            <TextField
                                fullWidth
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Tu contraseña"
                                variant="outlined"
                                margin="normal"
                                value={credentials.password}
                                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                                required
                                autoComplete="current-password"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock size={20} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff size={20} /> : <Visibility size={20} />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                    }
                                }}
                                data-testid="password-input"
                            />

                            {error && (
                                <Typography color="error" mt={2} textAlign="center">
                                    {error}
                                </Typography>
                            )}

                            <Button
                                fullWidth
                                variant="contained"
                                type="submit"
                                size="large"
                                disabled={loading}
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    borderRadius: 2,
                                    padding: '12px',
                                    textTransform: 'none',
                                    fontSize: '1.1rem'
                                }}
                                data-testid="login-button"
                            >
                                Iniciar Sesión
                            </Button>
                        </form>
                    </Box>
                </Paper>
            </Box>
        </>
    );
};