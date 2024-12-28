import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, TextField, Button, Typography, FormControlLabel, Checkbox, FormHelperText } from '@mui/material';
import { userService } from '../../services/userService';
// import { useSnackbar } from '../../components/common/Snackbar';
import { useSnackbar } from '../../utils/hooks';
import { Loading } from '../../components/common/Loading';
import { validateAndFormatInput } from "../../utils/index.js";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export const UserForm = () => {
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        full_name: '',
        employee_id: '',
        password: '',
        is_active: true
    });

    const [passwordChecks, setPasswordChecks] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false
    });

    const [errors, setErrors] = useState({
        email: '',
        full_name: '',
        password: '',
        employee_id: ''
    });

    const validateForm = () => {
        const newErrors = {};

        // Validar nombre
        const nameValidation = validateAndFormatInput.validateName(formData.full_name);
        if (!formData.full_name.trim()) {
            newErrors.full_name = 'El nombre es requerido';
        } else if (!nameValidation.isValid) {
            newErrors.full_name = nameValidation.error;
        }

        // Validar email
        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!validateAndFormatInput.validateEmail(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        // Validar employee_id
        if (!formData.employee_id.trim()) {
            newErrors.employee_id = 'El ID de empleado es requerido';
        }

        // Validar contraseña
        const passwordValidation = validateAndFormatInput.validatePassword(formData.password);
        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (!passwordValidation.isValid) {
            newErrors.password = passwordValidation.error;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const checkPassword = (password) => {
        setPasswordChecks({
            length: password.length >= 6,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            // Formatear datos solo al enviar
            const formattedData = {
                ...formData,
                email: validateAndFormatInput.formatEmail(formData.email),
                full_name: validateAndFormatInput.formatName(formData.full_name),
                employee_id: validateAndFormatInput.sanitizeInput(formData.employee_id),
                password: validateAndFormatInput.sanitizeInput(formData.password)
            };

            await userService.createUser(formattedData);
            showSnackbar('Usuario creado exitosamente', 'success');
            navigate('/dashboard/users');
        } catch (error) {
            console.error('Error creating user:', error);
            showSnackbar(error.response?.data?.detail || error.message || 'Error al crear usuario', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        // Permitir escritura libre, solo sanitizar caracteres SQL peligrosos
        let sanitizedValue = validateAndFormatInput.sanitizeInput(value);

        setFormData(prev => ({
            ...prev,
            [field]: sanitizedValue
        }));

        // Validación en tiempo real para mostrar mensajes de ayuda
        if (field === 'password') {
            checkPassword(sanitizedValue);
            const validation = validateAndFormatInput.validatePassword(sanitizedValue);
            setErrors(prev => ({
                ...prev,
                password: validation.error || ''
            }));
        } else if (field === 'full_name') {
            const validation = validateAndFormatInput.validateName(sanitizedValue);
            setErrors(prev => ({
                ...prev,
                full_name: validation.error || ''
            }));
        }
    };

    return (
        <>
            <Loading open={loading} />
            <Card sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
                <Typography variant="h6" mb={3}>Nuevo Usuario</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Nombre Completo"
                        margin="normal"
                        value={formData.full_name}
                        onChange={(e) => handleInputChange('full_name', e.target.value)}
                        required
                        error={!!errors.full_name}
                        helperText={errors.full_name || 'El nombre será formateado automáticamente'}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        type="email"
                        error={!!errors.email}
                        helperText={errors.email || 'El email será convertido a minúsculas'}
                    />
                    <TextField
                        fullWidth
                        label="ID Empleado"
                        margin="normal"
                        value={formData.employee_id}
                        onChange={(e) => handleInputChange('employee_id', e.target.value)}
                        required
                        error={!!errors.employee_id}
                        helperText={errors.employee_id}
                    />
                    <TextField
                        fullWidth
                        label="Contraseña"
                        type="password"
                        margin="normal"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        required
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    {/*<FormHelperText>*/}
                    {/*    La contraseña debe contener:*/}
                    {/*    <ul style={{ listStyleType: 'none', padding: 0 }}>*/}
                    {/*        <li>*/}
                    {/*            {passwordChecks.length ? '✅' : '❌'} Al menos 6 caracteres*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            {passwordChecks.uppercase ? '✅' : '❌'} Al menos una letra mayúscula*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            {passwordChecks.lowercase ? '✅' : '❌'} Al menos una letra minúscula*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            {passwordChecks.number ? '✅' : '❌'} Al menos un número*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</FormHelperText>*/}
                    <FormHelperText>
                        La contraseña debe contener:
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                {passwordChecks.length ? (
                                    <CheckCircleIcon color="success" fontSize="small" />
                                ) : (
                                    <CancelIcon color="error" fontSize="small" />
                                )}
                                Al menos 6 caracteres
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                {passwordChecks.uppercase ? (
                                    <CheckCircleIcon color="success" fontSize="small" />
                                ) : (
                                    <CancelIcon color="error" fontSize="small" />
                                )}
                                Al menos una letra mayúscula
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                {passwordChecks.lowercase ? (
                                    <CheckCircleIcon color="success" fontSize="small" />
                                ) : (
                                    <CancelIcon color="error" fontSize="small" />
                                )}
                                Al menos una letra minúscula
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                {passwordChecks.number ? (
                                    <CheckCircleIcon color="success" fontSize="small" />
                                ) : (
                                    <CancelIcon color="error" fontSize="small" />
                                )}
                                Al menos un número
                            </li>
                        </ul>
                    </FormHelperText>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.is_active}
                                onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                                color="primary"
                            />
                        }
                        label="Usuario Activo"
                        sx={{ mt: 2 }}
                    />
                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                        >
                            Crear Usuario
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/dashboard/users')}
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                    </Box>
                </form>
            </Card>
        </>
    );
};