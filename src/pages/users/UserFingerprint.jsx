// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Box, Card, Typography, Button, CircularProgress } from '@mui/material';
// import { Fingerprint as FingerprintIcon } from '@mui/icons-material';
// import { userService } from '../../services/userService';
// import { useSnackbar } from '../../components/common/Snackbar';
// import {biometricService} from "../../services/biometricService.js";
//
// export const UserFingerprint = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { showSnackbar } = useSnackbar();
//     const [loading, setLoading] = useState(false);
//     const [registering, setRegistering] = useState(false);
//     const [user, setUser] = useState(null);
//
//     useEffect(() => {
//         const fetchUser = async () => {
//             setLoading(true);
//             try {
//                 const userData = await userService.getUser(id);
//                 // console.log('Users data:', userData);
//                 setUser(userData);
//             } catch (error) {
//                 showSnackbar('Error al cargar usuario', 'error');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchUser();
//     }, [id]);
//
//     const handleRegisterFingerprint = async () => {
//         setRegistering(true);
//         try {
//             await biometricService.registerFingerprint(user.id);
//             showSnackbar('Huella registrada exitosamente', 'success');
//             navigate('/dashboard/users');
//         } catch (error) {
//             console.error('Error registering fingerprint:', error);
//             showSnackbar(error.response?.data?.detail || 'Error al registrar huella', 'error');
//         } finally {
//             setRegistering(false);
//         }
//     };
//
//     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;
//
//     return (
//         <Card sx={{ p: 4, maxWidth: 600, mx: 'auto', textAlign: 'center' }}>
//             <FingerprintIcon sx={{ fontSize: 60, mb: 2 }} />
//             <Typography variant="h6" gutterBottom>
//                 Registro de Huella Digital
//             </Typography>
//             <Typography variant="body1" mb={3}>
//                 {user?.full_name}
//             </Typography>
//             <Box sx={{ my: 4 }}>
//                 {user?.fingerprint_template ? (
//                     <Typography color="success.main">
//                         Este usuario ya tiene una huella registrada
//                     </Typography>
//                 ) : (
//                     <Button
//                         variant="contained"
//                         startIcon={<FingerprintIcon />}
//                         onClick={handleRegisterFingerprint}
//                         disabled={registering}
//                     >
//                         {registering ? 'Registrando...' : 'Registrar Huella'}
//                     </Button>
//                 )}
//             </Box>
//             <Button
//                 variant="outlined"
//                 onClick={() => navigate('/dashboard/users')}
//             >
//                 Volver
//             </Button>
//         </Card>
//     );
// };
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Card,
    Typography,
    Container,
    Stack,
    Paper,
    Alert,
    IconButton,
    Tooltip, CircularProgress
} from '@mui/material';
import {
    Fingerprint as FingerprintIcon,
    ArrowBack,
    CheckCircleOutline,
    HelpOutline
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { userService } from '../../services/userService';
import { useSnackbar } from '../../components/common/Snackbar';
import { biometricService } from "../../services/biometricService.js";

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
                setUser(userData);
            } catch (error) {
                showSnackbar('Error al cargar usuario', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id, showSnackbar]);

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

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Card elevation={2}>
                {/* Header con botón de retorno */}
                <Box sx={{
                    p: 2,
                    borderBottom: 1,
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <IconButton
                        onClick={() => navigate('/dashboard/users')}
                        sx={{ mr: 1 }}
                        aria-label="volver"
                    >
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h6">Registro de Huella Digital</Typography>
                </Box>

                {loading ? (
                    <Box sx={{ p: 4, textAlign: 'center' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Stack spacing={3} sx={{ p: 4 }}>
                        {/* Información del usuario */}
                        <Paper
                            variant="outlined"
                            sx={{ p: 2, bgcolor: 'background.default' }}
                        >
                            <Stack direction="row" spacing={2} alignItems="center">
                                <FingerprintIcon color="primary" sx={{ fontSize: 40 }} />
                                <Box>
                                    <Typography variant="subtitle1" gutterBottom>
                                        {user?.full_name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        ID: {user?.employee_id}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Paper>

                        {/* Estado actual */}
                        {user?.fingerprint_template ? (
                            <Alert
                                icon={<CheckCircleOutline fontSize="inherit" />}
                                severity="success"
                                sx={{ alignItems: 'center' }}
                            >
                                <Typography variant="subtitle2">
                                    Huella registrada
                                </Typography>
                                <Typography variant="body2">
                                    Este usuario ya tiene una huella digital registrada
                                </Typography>
                            </Alert>
                        ) : (
                            <Box>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                    sx={{ mb: 2 }}
                                >
                                    <Typography variant="subtitle2" color="primary">
                                        Instrucciones
                                    </Typography>
                                    <Tooltip title="Coloque el dedo en el lector cuando se le indique">
                                        <HelpOutline fontSize="small" color="action" />
                                    </Tooltip>
                                </Stack>
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 3,
                                        textAlign: 'center',
                                        bgcolor: 'background.default'
                                    }}
                                >
                                    <LoadingButton
                                        variant="contained"
                                        size="large"
                                        startIcon={<FingerprintIcon />}
                                        loading={registering}
                                        loadingPosition="start"
                                        onClick={handleRegisterFingerprint}
                                        sx={{ minWidth: 200 }}
                                    >
                                        {registering ? 'Registrando...' : 'Registrar Huella'}
                                    </LoadingButton>
                                </Paper>
                            </Box>
                        )}
                    </Stack>
                )}
            </Card>
        </Container>
    );
};