import {useState, useEffect, useCallback} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Card,
    TextField,
    Typography,
    Container,
    Grid,
    Paper,
    Stack,
    InputAdornment,
    Switch,
    FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
    PersonOutline,
    EmailOutlined,
    Badge,
    ArrowBack,
    Save
} from '@mui/icons-material';
import { userService } from '../../services/userService';
import { useSnackbar } from '../../components/common/Snackbar';
import { Loading } from '../../components/common/Loading';

export const UserEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        full_name: '',
        email: '',
        employee_id: '',
        is_active: true
    });

    // Estado para el manejo de validaciones en tiempo real
    const [fieldStatus, setFieldStatus] = useState({
        fullName: { valid: true, message: '' },
        email: { valid: true, message: '' },
        employeeId: { valid: true, message: '' }
    });

    const validateField = useCallback((field, value) => {
        switch (field) {
            case 'fullName':
                return {
                    valid: value.trim() !== '',
                    message: !value.trim() ? 'El nombre es requerido' : ''
                };
            case 'email': {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return {
                    valid: emailRegex.test(value),
                    message: !value ? 'El email es requerido' :
                        !emailRegex.test(value) ? 'Email inválido' : ''
                };
            }
            case 'employeeId':
                return {
                    valid: value.trim() !== '',
                    message: !value.trim() ? 'El ID de empleado es requerido' : ''
                };
            default:
                return { valid: true, message: '' };
        }
    }, []); // No tiene dependencias

    // Luego validateAllFields que depende de validateField
    const validateAllFields = useCallback((userData) => {
        setFieldStatus({
            fullName: validateField('fullName', userData.full_name),
            email: validateField('email', userData.email),
            employeeId: validateField('employeeId', userData.employee_id)
        });
    }, [validateField]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const userData = await userService.getUser(id);
                setUser(userData);
                validateAllFields(userData);
            } catch (error) {
                console.error('Error fetching user:', error);
                showSnackbar('Error al cargar usuario', 'error');
            } finally {
                setLoading(false);
            }
        })();
    }, [id, showSnackbar, validateAllFields]);

    // Manejar cambios en los campos
    const handleFieldChange = (field) => (event) => {
        const value = event.target.value;

        setUser(prev => ({
            ...prev,
            [field]: value
        }));

        setFieldStatus(prev => ({
            ...prev,
            [field === 'full_name' ? 'fullName' :
                field === 'employee_id' ? 'employeeId' : field]: validateField(
                field === 'full_name' ? 'fullName' :
                    field === 'employee_id' ? 'employeeId' : field,
                value
            )
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const allFieldsValid = Object.values(fieldStatus).every(field => field.valid);

        if (!allFieldsValid) {
            showSnackbar('Por favor, corrija los errores antes de guardar', 'error');
            return;
        }

        setLoading(true);
        try {
            //console.log('Datos a enviar:', user);
            await userService.updateUser(id, user);
            showSnackbar('Usuario actualizado exitosamente', 'success');
            navigate('/dashboard/users');
        } catch (error) {
            console.error('Error updating user:', error);
            showSnackbar(
                error.response?.data?.detail ||
                error.message ||
                'Error al actualizar usuario',
                'error'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Loading open={loading} />
            <Card elevation={2} sx={{ p: 4 }}>
                <Stack spacing={3}>
                    {/* Encabezado */}
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h5" color="primary" gutterBottom>
                            Editar Usuario
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Modifica la información del usuario según sea necesario
                        </Typography>
                    </Box>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            {/* Información Personal */}
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" color="primary" sx={{ mb: 2 }}>
                                    Información Personal
                                </Typography>
                                <Stack spacing={2}>
                                    <TextField
                                        fullWidth
                                        label="Nombre Completo"
                                        value={user.full_name}
                                        onChange={handleFieldChange('full_name')}
                                        required
                                        error={!fieldStatus.fullName.valid}
                                        helperText={fieldStatus.fullName.message}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonOutline color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        value={user.email}
                                        onChange={handleFieldChange('email')}
                                        required
                                        type="email"
                                        error={!fieldStatus.email.valid}
                                        helperText={fieldStatus.email.message}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailOutlined color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Stack>
                            </Grid>

                            {/* Información Laboral */}
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" color="primary" sx={{ mb: 2 }}>
                                    Información Laboral
                                </Typography>
                                <TextField
                                    fullWidth
                                    label="ID Empleado"
                                    value={user.employee_id}
                                    onChange={handleFieldChange('employee_id')}
                                    required
                                    error={!fieldStatus.employeeId.valid}
                                    helperText={fieldStatus.employeeId.message}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Badge color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            {/* Estado del Usuario */}
                            <Grid item xs={12}>
                                <Paper variant="outlined" sx={{ p: 2 }}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={user.is_active}
                                                onChange={(e) => setUser({
                                                    ...user,
                                                    is_active: e.target.checked
                                                })}
                                                color="primary"
                                            />
                                        }
                                        label={
                                            <Box>
                                                <Typography variant="body1">
                                                    Usuario Activo
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    {user.is_active ?
                                                        'El usuario tiene acceso mediante huella' :
                                                        'El usuario no tiene acceso mediante huella'}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                </Paper>
                            </Grid>

                            {/* Botones de Acción */}
                            <Grid item xs={12}>
                                <Stack
                                    direction={{ xs: 'column', sm: 'row' }}
                                    spacing={2}
                                    justifyContent="flex-end"
                                >
                                    <LoadingButton
                                        variant="outlined"
                                        onClick={() => navigate('/dashboard/users')}
                                        disabled={loading}
                                        startIcon={<ArrowBack />}
                                    >
                                        Cancelar
                                    </LoadingButton>
                                    <LoadingButton
                                        type="submit"
                                        variant="contained"
                                        loading={loading}
                                        loadingPosition="start"
                                        startIcon={<Save />}
                                    >
                                        Guardar Cambios
                                    </LoadingButton>
                                </Stack>
                            </Grid>
                        </Grid>
                    </form>
                </Stack>
            </Card>
        </Container>
    );
};