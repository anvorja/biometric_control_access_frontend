import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Card, TextField, Button, Typography } from '@mui/material';
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
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await userService.updateUser(id, user);
            showSnackbar('Usuario actualizado exitosamente', 'success');
            navigate('/dashboard/users');
        } catch (error) {
            console.error('Error updating user:', error);
            showSnackbar('Error al actualizar usuario', 'error');
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
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        required
                        type="email"
                    />
                    <TextField
                        fullWidth
                        label="ID Empleado"
                        margin="normal"
                        value={user.employee_id}
                        onChange={(e) => setUser({...user, employee_id: e.target.value})}
                        required
                    />
                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button type="submit" variant="contained">
                            Guardar
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/dashboard/users')}
                        >
                            Cancelar
                        </Button>
                    </Box>
                </form>
            </Card>
        </>
    );
};