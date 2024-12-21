// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Box, Card, TextField, Button, Typography, FormControlLabel, Checkbox } from '@mui/material';
// import { userService } from '../../services/userService';
// import { useSnackbar } from '../../components/common/Snackbar';
// import { Loading } from '../../components/common/Loading';
//
// export const UserForm = () => {
//     const navigate = useNavigate();
//     const { showSnackbar } = useSnackbar();
//     const [loading, setLoading] = useState(false);
//     const [formData, setFormData] = useState({
//         email: '',
//         full_name: '',
//         employee_id: '',
//         password: '',
//         is_active: true
//     });
//
//     const validateForm = () => {
//         if (!formData.full_name.trim()) throw new Error('El nombre es requerido');
//         if (!formData.email.trim()) throw new Error('El email es requerido');
//         if (!formData.employee_id.trim()) throw new Error('El ID de empleado es requerido');
//         if (!formData.password) throw new Error('La contraseña es requerida');
//         if (formData.password.length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres');
//
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(formData.email)) throw new Error('Email inválido');
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             validateForm();
//             await userService.createUser(formData);
//             showSnackbar('Usuario creado exitosamente', 'success');
//             navigate('/dashboard/users');
//         } catch (error) {
//             console.error('Error creating user:', error);
//             showSnackbar(error.response?.data?.detail || error.message || 'Error al crear usuario', 'error');
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return (
//         <>
//             <Loading open={loading} />
//             <Card sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
//                 <Typography variant="h6" mb={3}>Nuevo Usuario</Typography>
//                 <form onSubmit={handleSubmit}>
//                     <TextField
//                         fullWidth
//                         label="Nombre Completo"
//                         margin="normal"
//                         value={formData.full_name}
//                         onChange={(e) => setFormData({...formData, full_name: e.target.value})}
//                         required
//                         error={formData.full_name.trim() === ''}
//                         helperText={formData.full_name.trim() === '' ? 'El nombre es requerido' : ''}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Email"
//                         margin="normal"
//                         value={formData.email}
//                         onChange={(e) => setFormData({...formData, email: e.target.value})}
//                         required
//                         type="email"
//                         error={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)}
//                         helperText={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? 'Email inválido' : ''}
//                     />
//                     <TextField
//                         fullWidth
//                         label="ID Empleado"
//                         margin="normal"
//                         value={formData.employee_id}
//                         onChange={(e) => setFormData({...formData, employee_id: e.target.value})}
//                         required
//                         error={formData.employee_id.trim() === ''}
//                         helperText={formData.employee_id.trim() === '' ? 'El ID de empleado es requerido' : ''}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Contraseña"
//                         type="password"
//                         margin="normal"
//                         value={formData.password}
//                         onChange={(e) => setFormData({...formData, password: e.target.value})}
//                         required
//                         error={formData.password.length > 0 && formData.password.length < 6}
//                         helperText={formData.password.length > 0 && formData.password.length < 6 ?
//                             'La contraseña debe tener al menos 6 caracteres' : ''}
//                     />
//                     <FormControlLabel
//                         control={
//                             <Checkbox
//                                 checked={formData.is_active}
//                                 onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
//                                 color="primary"
//                             />
//                         }
//                         label="Usuario Activo"
//                         sx={{ mt: 2 }}
//                     />
//                     <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
//                         <Button
//                             type="submit"
//                             variant="contained"
//                             disabled={loading}
//                         >
//                             Crear Usuario
//                         </Button>
//                         <Button
//                             variant="outlined"
//                             onClick={() => navigate('/dashboard/users')}
//                             disabled={loading}
//                         >
//                             Cancelar
//                         </Button>
//                     </Box>
//                 </form>
//             </Card>
//         </>
//     );
// };

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Box, Card, TextField, Button, Typography, FormControlLabel, Checkbox } from '@mui/material';
// import { userService } from '../../services/userService';
// import { useSnackbar } from '../../components/common/Snackbar';
// import { Loading } from '../../components/common/Loading';
// import { validateAndFormatInput} from "../../utils/index.js";
//
// export const UserForm = () => {
//     const navigate = useNavigate();
//     const { showSnackbar } = useSnackbar();
//     const [loading, setLoading] = useState(false);
//     const [formData, setFormData] = useState({
//         email: '',
//         full_name: '',
//         employee_id: '',
//         password: '',
//         is_active: true
//     });
//
//     const [errors, setErrors] = useState({
//         email: '',
//         full_name: '',
//         password: '',
//         employee_id: ''
//     });
//
//     const validateForm = () => {
//
//         const newErrors = {};
//
//         // Validar nombre
//         const nameValidation = validateAndFormatInput.validateName(formData.full_name);
//         if (!formData.full_name.trim()) {
//             newErrors.full_name = 'El nombre es requerido';
//         } else if (!nameValidation.isValid) {
//             newErrors.full_name = nameValidation.error;
//         }
//
//         //if (!formData.full_name.trim()) throw new Error('El nombre es requerido');
//         if (!formData.email.trim()) throw new Error('El email es requerido');
//         if (!formData.employee_id.trim()) throw new Error('El ID de empleado es requerido');
//         if (!formData.password) throw new Error('La contraseña es requerida');
//         if (formData.password.length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres');
//         if (!validateAndFormatInput.validateEmail(formData.email)) throw new Error('Email inválido');
//
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };
//
//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();
//     //     setLoading(true);
//     //     try {
//     //         validateForm();
//     //
//     //         // Format and sanitize data before sending
//     //         const sanitizedData = {
//     //             ...formData,
//     //             email: validateAndFormatInput.formatEmail(formData.email),
//     //             full_name: validateAndFormatInput.capitalizeNames(formData.full_name),
//     //             employee_id: validateAndFormatInput.sanitizeInput(formData.employee_id),
//     //             password: validateAndFormatInput.sanitizeInput(formData.password)
//     //         };
//     //
//     //         await userService.createUser(sanitizedData);
//     //         showSnackbar('Usuario creado exitosamente', 'success');
//     //         navigate('/dashboard/users');
//     //     } catch (error) {
//     //         console.error('Error creating user:', error);
//     //         showSnackbar(error.response?.data?.detail || error.message || 'Error al crear usuario', 'error');
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) {
//             return;
//         }
//
//         setLoading(true);
//         try {
//             // Formatear datos solo al enviar
//             const formattedData = {
//                 ...formData,
//                 email: validateAndFormatInput.formatEmail(formData.email),
//                 full_name: validateAndFormatInput.formatName(formData.full_name),
//                 employee_id: validateAndFormatInput.sanitizeInput(formData.employee_id),
//                 password: validateAndFormatInput.sanitizeInput(formData.password)
//             };
//
//             await userService.createUser(formattedData);
//             showSnackbar('Usuario creado exitosamente', 'success');
//             navigate('/dashboard/users');
//         } catch (error) {
//             console.error('Error creating user:', error);
//             showSnackbar(error.response?.data?.detail || error.message || 'Error al crear usuario', 'error');
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     // const handleInputChange = (field, value) => {
//     //     let formattedValue = validateAndFormatInput.sanitizeInput(value);
//     //
//     //     // Apply specific formatting for email and name fields
//     //     if (field === 'email') {
//     //         formattedValue = formattedValue.toLowerCase();
//     //     } else if (field === 'full_name') {
//     //         formattedValue = validateAndFormatInput.capitalizeNames(formattedValue);
//     //     }
//     //
//     //     setFormData({...formData, [field]: formattedValue});
//     // };
//     const handleInputChange = (field, value) => {
//         // Permitir escritura libre, solo sanitizar caracteres SQL peligrosos
//         let sanitizedValue = validateAndFormatInput.sanitizeInput(value);
//
//         setFormData(prev => ({
//             ...prev,
//             [field]: sanitizedValue
//         }));
//
//         // Validación en tiempo real para mostrar mensajes de ayuda
//         if (field === 'password') {
//             const validation = validateAndFormatInput.validatePassword(sanitizedValue);
//             setErrors(prev => ({
//                 ...prev,
//                 password: validation.error || ''
//             }));
//         } else if (field === 'full_name') {
//             const validation = validateAndFormatInput.validateName(sanitizedValue);
//             setErrors(prev => ({
//                 ...prev,
//                 full_name: validation.error || ''
//             }));
//         }
//     };
//
//     return (
//         <>
//             <Loading open={loading} />
//             <Card sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
//                 <Typography variant="h6" mb={3}>Nuevo Usuario</Typography>
//                 <form onSubmit={handleSubmit}>
//                     {/*<TextField*/}
//                     {/*    fullWidth*/}
//                     {/*    label="Nombre Completo"*/}
//                     {/*    margin="normal"*/}
//                     {/*    value={formData.full_name}*/}
//                     {/*    onChange={(e) => handleInputChange('full_name', e.target.value)}*/}
//                     {/*    required*/}
//                     {/*    error={formData.full_name.trim() === ''}*/}
//                     {/*    helperText={formData.full_name.trim() === '' ? 'El nombre es requerido' : ''}*/}
//                     {/*/>*/}
//                     <TextField
//                         fullWidth
//                         label="Nombre Completo"
//                         margin="normal"
//                         value={formData.full_name}
//                         onChange={(e) => handleInputChange('full_name', e.target.value)}
//                         required
//                         error={!!errors.full_name}
//                         helperText={errors.full_name || 'El nombre será formateado automáticamente'}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Email"
//                         margin="normal"
//                         value={formData.email}
//                         onChange={(e) => handleInputChange('email', e.target.value)}
//                         required
//                         type="email"
//                         error={!validateAndFormatInput.validateEmail(formData.email) && formData.email !== ''}
//                         helperText={!validateAndFormatInput.validateEmail(formData.email) && formData.email !== '' ? 'Email inválido' : ''}
//                     />
//                     <TextField
//                         fullWidth
//                         label="ID Empleado"
//                         margin="normal"
//                         value={formData.employee_id}
//                         onChange={(e) => handleInputChange('employee_id', e.target.value)}
//                         required
//                         error={formData.employee_id.trim() === ''}
//                         helperText={formData.employee_id.trim() === '' ? 'El ID de empleado es requerido' : ''}
//                     />
//                     <TextField
//                         fullWidth
//                         label="Contraseña"
//                         type="password"
//                         margin="normal"
//                         value={formData.password}
//                         onChange={(e) => handleInputChange('password', e.target.value)}
//                         required
//                         error={formData.password.length > 0 && formData.password.length < 6}
//                         helperText={formData.password.length > 0 && formData.password.length < 6 ?
//                             'La contraseña debe tener al menos 6 caracteres' : ''}
//                     />
//                     <FormControlLabel
//                         control={
//                             <Checkbox
//                                 checked={formData.is_active}
//                                 onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
//                                 color="primary"
//                             />
//                         }
//                         label="Usuario Activo"
//                         sx={{ mt: 2 }}
//                     />
//                     <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
//                         <Button
//                             type="submit"
//                             variant="contained"
//                             disabled={loading}
//                         >
//                             Crear Usuario
//                         </Button>
//                         <Button
//                             variant="outlined"
//                             onClick={() => navigate('/dashboard/users')}
//                             disabled={loading}
//                         >
//                             Cancelar
//                         </Button>
//                     </Box>
//                 </form>
//             </Card>
//         </>
//     );
// };

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, TextField, Button, Typography, FormControlLabel, Checkbox, FormHelperText } from '@mui/material';
import { userService } from '../../services/userService';
import { useSnackbar } from '../../components/common/Snackbar';
import { Loading } from '../../components/common/Loading';
import { validateAndFormatInput } from "../../utils/index.js";

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
                    <FormHelperText>
                        La contraseña debe contener:
                        <ul>
                            <li>Al menos 6 caracteres</li>
                            <li>Al menos una letra mayúscula</li>
                            <li>Al menos una letra minúscula</li>
                            <li>Al menos un número</li>
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