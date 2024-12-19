import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Card, Typography, Button, CircularProgress } from '@mui/material';
import { Fingerprint as FingerprintIcon } from '@mui/icons-material';
import { userService } from '../../services/userService';
import { useSnackbar } from '../../components/common/Snackbar';
import {biometricService} from "../../services/biometricService.js";

export const UserFingerprint = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const [registering, setRegistering] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const userData = await userService.getUser(id);
                // console.log('Users data:', userData);
                setUser(userData);
            } catch (error) {
                showSnackbar('Error al cargar usuario', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    const handleRegisterFingerprint = async () => {
        setRegistering(true);
        try {
            await biometricService.registerFingerprint(user.id);
            showSnackbar('Huella registrada exitosamente', 'success');
            navigate('/dashboard/users');
        } catch (error) {
            console.error('Error registering fingerprint:', error);
            showSnackbar(error.response?.data?.detail || 'Error al registrar huella', 'error');
        } finally {
            setRegistering(false);
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;

    return (
        <Card sx={{ p: 4, maxWidth: 600, mx: 'auto', textAlign: 'center' }}>
            <FingerprintIcon sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
                Registro de Huella Digital
            </Typography>
            <Typography variant="body1" mb={3}>
                {user?.full_name}
            </Typography>
            <Box sx={{ my: 4 }}>
                {user?.fingerprint_template ? (
                    <Typography color="success.main">
                        Este usuario ya tiene una huella registrada
                    </Typography>
                ) : (
                    <Button
                        variant="contained"
                        startIcon={<FingerprintIcon />}
                        onClick={handleRegisterFingerprint}
                        disabled={registering}
                    >
                        {registering ? 'Registrando...' : 'Registrar Huella'}
                    </Button>
                )}
            </Box>
            <Button
                variant="outlined"
                onClick={() => navigate('/dashboard/users')}
            >
                Volver
            </Button>
        </Card>
    );
};