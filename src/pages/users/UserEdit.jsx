// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Box, Card, TextField, Button, Typography } from '@mui/material';
// import { userService } from '../../services/userService';
// import { useSnackbar } from '../../components/common/Snackbar';
// import { Loading } from '../../components/common/Loading';
//
// export const UserEdit = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { showSnackbar } = useSnackbar();
//     const [loading, setLoading] = useState(false);
//     const [user, setUser] = useState({
//         full_name: '',
//         email: '',
//         employee_id: '',
//         is_active: true
//     });
//
//     useEffect(() => {
//         const fetchUser = async () => {
//             setLoading(true);
//             try {
//                 const userData = await userService.getUser(id);
//                 setUser(userData);
//             } catch (error) {
//                 console.error('Error fetching user:', error);
//                 showSnackbar('Error al cargar usuario', 'error');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchUser();
//     }, [id]);
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             await userService.updateUser(id, user);
//             showSnackbar('Usuario actualizado exitosamente', 'success');
//             navigate('/dashboard/users');
//         } catch (error) {
//             console.error('Error updating user:', error);
//             showSnackbar('Error al actualizar usuario', 'error');
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return (
//         <>
//             <Loading open={loading} />
//             <Card sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
//                 <Typography variant="h6" mb={3}>Editar Usuario</Typography>
//                 <form onSubmit={handleSubmit}>
//                     <TextField
//                         fullWidth
//                         label="Nombre Completo"
//                         margin="normal"
//                         value={user.full_name}
//                         onChange={(e) => setUser({...user, full_name: e.target.value})}
//                         required
//                     />
//                     <TextField
//                         fullWidth
//                         label="Email"
//                         margin="normal"
//                         value={user.email}
//                         onChange={(e) => setUser({...user, email: e.target.value})}
//                         required
//                         type="email"
//                     />
//                     <TextField
//                         fullWidth
//                         label="ID Empleado"
//                         margin="normal"
//                         value={user.employee_id}
//                         onChange={(e) => setUser({...user, employee_id: e.target.value})}
//                         required
//                     />
//                     <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
//                         <Button type="submit" variant="contained">
//                             Guardar
//                         </Button>
//                         <Button
//                             variant="outlined"
//                             onClick={() => navigate('/dashboard/users')}
//                         >
//                             Cancelar
//                         </Button>
//                     </Box>
//                 </form>
//             </Card>
//         </>
//     );
// };

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Card, TextField, Button, Typography, FormControlLabel, Checkbox } from '@mui/material';
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

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const userData = await userService.getUser(id);
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user:', error);
                showSnackbar('Error al cargar usuario', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id, showSnackbar]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Validaciones básicas
            if (!user.full_name.trim() || !user.email.trim() || !user.employee_id.trim()) {
                throw new Error('Todos los campos son requeridos');
            }

            // Validación de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(user.email)) {
                throw new Error('Email inválido');
            }

            await userService.updateUser(id, user);
            showSnackbar('Usuario actualizado exitosamente', 'success');
            navigate('/dashboard/users');
        } catch (error) {
            console.error('Error updating user:', error);
            showSnackbar(error.response?.data?.detail || error.message || 'Error al actualizar usuario', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Loading open={loading} />
            <Card sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
                <Typography variant="h6" mb={3}>Editar Usuario</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Nombre Completo"
                        margin="normal"
                        value={user.full_name}
                        onChange={(e) => setUser({...user, full_name: e.target.value})}
                        required
                        error={user.full_name.trim() === ''}
                        helperText={user.full_name.trim() === '' ? 'El nombre es requerido' : ''}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        required
                        type="email"
                        error={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)}
                        helperText={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email) ? 'Email inválido' : ''}
                    />
                    <TextField
                        fullWidth
                        label="ID Empleado"
                        margin="normal"
                        value={user.employee_id}
                        onChange={(e) => setUser({...user, employee_id: e.target.value})}
                        required
                        error={user.employee_id.trim() === ''}
                        helperText={user.employee_id.trim() === '' ? 'El ID de empleado es requerido' : ''}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={user.is_active}
                                onChange={(e) => setUser({...user, is_active: e.target.checked})}
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
                            Guardar
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