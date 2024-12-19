// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Box, Card, TextField, Button, Typography } from '@mui/material';
//
// export const UserForm = () => {
//     const [formData, setFormData] = useState({
//         email: '',
//         full_name: '',
//         employee_id: '',
//         password: '',
//     });
//
//     const navigate = useNavigate();
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // TODO: Implementar registro
//         navigate('/dashboard/users');
//     };
//
//     return (
//         <Card sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
//             <Typography variant="h6" mb={3}>Nuevo Usuario</Typography>
//             <form onSubmit={handleSubmit}>
//                 <TextField
//                     fullWidth
//                     label="Nombre Completo"
//                     margin="normal"
//                     value={formData.full_name}
//                     onChange={(e) => setFormData({...formData, full_name: e.target.value})}
//                 />
//                 <TextField
//                     fullWidth
//                     label="Email"
//                     margin="normal"
//                     value={formData.email}
//                     onChange={(e) => setFormData({...formData, email: e.target.value})}
//                 />
//                 <TextField
//                     fullWidth
//                     label="ID Empleado"
//                     margin="normal"
//                     value={formData.employee_id}
//                     onChange={(e) => setFormData({...formData, employee_id: e.target.value})}
//                 />
//                 <TextField
//                     fullWidth
//                     label="Contraseña"
//                     type="password"
//                     margin="normal"
//                     value={formData.password}
//                     onChange={(e) => setFormData({...formData, password: e.target.value})}
//                 />
//                 <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
//                     <Button type="submit" variant="contained">Guardar</Button>
//                     <Button variant="outlined" onClick={() => navigate('/dashboard/users')}>Cancelar</Button>
//                 </Box>
//             </form>
//         </Card>
//     );
// };
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, TextField, Button, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { userService } from '../../services/userService';
import { useSnackbar } from '../../components/common/Snackbar';
import { Loading } from '../../components/common/Loading';

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

    const validateForm = () => {
        if (!formData.full_name.trim()) throw new Error('El nombre es requerido');
        if (!formData.email.trim()) throw new Error('El email es requerido');
        if (!formData.employee_id.trim()) throw new Error('El ID de empleado es requerido');
        if (!formData.password) throw new Error('La contraseña es requerida');
        if (formData.password.length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) throw new Error('Email inválido');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            validateForm();
            await userService.createUser(formData);
            showSnackbar('Usuario creado exitosamente', 'success');
            navigate('/dashboard/users');
        } catch (error) {
            console.error('Error creating user:', error);
            showSnackbar(error.response?.data?.detail || error.message || 'Error al crear usuario', 'error');
        } finally {
            setLoading(false);
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
                        onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                        required
                        error={formData.full_name.trim() === ''}
                        helperText={formData.full_name.trim() === '' ? 'El nombre es requerido' : ''}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                        type="email"
                        error={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)}
                        helperText={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? 'Email inválido' : ''}
                    />
                    <TextField
                        fullWidth
                        label="ID Empleado"
                        margin="normal"
                        value={formData.employee_id}
                        onChange={(e) => setFormData({...formData, employee_id: e.target.value})}
                        required
                        error={formData.employee_id.trim() === ''}
                        helperText={formData.employee_id.trim() === '' ? 'El ID de empleado es requerido' : ''}
                    />
                    <TextField
                        fullWidth
                        label="Contraseña"
                        type="password"
                        margin="normal"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                        error={formData.password.length > 0 && formData.password.length < 6}
                        helperText={formData.password.length > 0 && formData.password.length < 6 ?
                            'La contraseña debe tener al menos 6 caracteres' : ''}
                    />
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