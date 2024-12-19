import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../services/userService';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Edit as EditIcon, Fingerprint as FingerprintIcon } from '@mui/icons-material';
import { Add as AddIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export const UserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await userService.getUsers();
                //console.log('Users data:', data);
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleEdit = (userId) => {
        navigate(`/dashboard/users/edit/${userId}`);
    };

    const handleFingerprintRegistration = (userId) => {
        navigate(`/dashboard/users/fingerprint/${userId}`);
    };

    return (
        <>
            <Button
                component={Link}
                to="/dashboard/users/new"
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ mb: 2 }}
            >
                Nuevo Usuario
            </Button>
            <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Huella</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.full_name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={user.is_active ? 'Activo' : 'Inactivo'}
                                        size="small"
                                        color={user.is_active ? "success" : "error"}
                                        sx={{
                                            backgroundColor: user.is_active ? '#e8f5e9' : '#ffebee',
                                            color: user.is_active ? '#2e7d32' : '#d32f2f'
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    {user.fingerprint_template ? (
                                        <Chip
                                            icon={<CheckCircleIcon color="success" />}
                                            label="Registrada"
                                            variant="outlined"
                                            color="success"
                                        />
                                    ) : (
                                        <Chip
                                            icon={<CancelIcon color="disabled" />}
                                            label="Sin registro"
                                            variant="outlined"
                                            color="default"
                                        />
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        startIcon={<EditIcon />}
                                        onClick={() => handleEdit(user.id)}
                                        sx={{ mr: 1 }}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        startIcon={<FingerprintIcon />}
                                        onClick={() => handleFingerprintRegistration(user.id)}
                                        color={user.fingerprint_template ? "primary" : "success"}
                                    >
                                        {user.fingerprint_template ? 'Modificar Huella' : 'Registrar Huella'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};