import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, TextField, Button, Typography } from '@mui/material';

export const UserForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        full_name: '',
        employee_id: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO: Implementar registro
        navigate('/dashboard/users');
    };

    return (
        <Card sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h6" mb={3}>Nuevo Usuario</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Nombre Completo"
                    margin="normal"
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                />
                <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <TextField
                    fullWidth
                    label="ID Empleado"
                    margin="normal"
                    value={formData.employee_id}
                    onChange={(e) => setFormData({...formData, employee_id: e.target.value})}
                />
                <TextField
                    fullWidth
                    label="Contraseña"
                    type="password"
                    margin="normal"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <Button type="submit" variant="contained">Guardar</Button>
                    <Button variant="outlined" onClick={() => navigate('/dashboard/users')}>Cancelar</Button>
                </Box>
            </form>
        </Card>
    );
};