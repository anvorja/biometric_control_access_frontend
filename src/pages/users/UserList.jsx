import {useState, useEffect, useCallback, useRef, useMemo} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Box,
    Typography,
    TablePagination,
    useTheme,
    Paper,
    IconButton,
    Skeleton,
    Alert,
    useMediaQuery,
    TextField,
    InputAdornment,
    Tooltip,
    Divider,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { userService } from '../../services/userService';
import {
    CheckCircle as CheckCircleIcon,
    Edit as EditIcon,
    Fingerprint as FingerprintIcon,
    Add as AddIcon,
    Search as SearchIcon,
    Refresh as RefreshIcon,
    Clear as ClearIcon,
    Cancel as CancelIcon
} from '@mui/icons-material';
import { debounce } from 'lodash';
import { normalizeString } from '../../utils';


export const UserList = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const searchInputRef = useRef(null);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(new Date());
    const [isRefreshing, setIsRefreshing] = useState(false);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const fetchUsers = async () => {
        setIsRefreshing(true);
        setLoading(true);
        setError(null);
        try {
            const data = await userService.getUsers();
            setUsers(data);
            setFilteredUsers([...data].sort((a, b) => a.id - b.id)); // Ordenamos por ID
            setLastUpdate(new Date());
        } catch (error) {
            setError('Error al cargar usuarios. Por favor, intente nuevamente. Revisar BD');
            console.error('Error fetching users:', error);
        } finally {
            setIsRefreshing(false);
            setLoading(false);
        }
    };

    const getTimeAgo = (date) => {
        const seconds = Math.floor((new Date() - date) / 1000);
        if (seconds < 60) return 'hace menos de un minuto';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
        return date.toLocaleString();
    };

    // Hook de efecto inicial
    useEffect(() => {
        fetchUsers();
    }, []);

    const filterUsers = useCallback((searchValue, userList) => {
        if (!searchValue) return [...userList].sort((a, b) => a.id - b.id);

        const searchNormalized = normalizeString(searchValue);
        const filtered = userList.filter(user => (
            normalizeString(user.full_name || '').includes(searchNormalized) ||
            user.id?.toString().includes(searchValue) ||
            user.employee_id?.toString().includes(searchValue) ||
            normalizeString(user.email || '').includes(searchNormalized)
        ));
        return [...filtered].sort((a, b) => a.id - b.id);
    }, []);

    // Luego, creamos el debounced filter como una función memoizada
    const debouncedFilter = useMemo(
        () => debounce((searchValue, userList) => {
            const filtered = filterUsers(searchValue, userList);
            setFilteredUsers(filtered);
            setPage(0);
        }, 300),
        [filterUsers]
    );

    // Efecto para manejar el filtrado
    useEffect(() => {
        debouncedFilter(searchTerm, users);

        // Cleanup function
        return () => {
            debouncedFilter.cancel();
        };
    }, [searchTerm, users, debouncedFilter]);


    const handleClearSearch = () => {
        setSearchTerm('');
        searchInputRef.current?.focus();
    };

    const handleEdit = (userId) => {
        navigate(`/dashboard/users/edit/${userId}`);
    };

    const handleFingerprintRegistration = (userId) => {
        navigate(`/dashboard/users/fingerprint/${userId}`);
    };

    return (
        <Box sx={{ maxWidth: '1200px', margin: '0 auto', p: { xs: 1, sm: 2, md: 3 } }}>
            <Paper elevation={2}>
                {/* Header Section */}
                <Box sx={{
                    p: { xs: 2, sm: 3 },
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2,
                    justifyContent: 'space-between',
                    alignItems: { xs: 'stretch', sm: 'center' },
                    borderBottom: `1px solid ${theme.palette.divider}`
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="h5" color="primary" sx={{ fontWeight: 600 }}>
                            Gestión de Usuarios
                        </Typography>
                        {!loading && (
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                ml: 2,
                                color: 'text.secondary'
                            }}>
                                <Typography variant="body2">
                                    ({filteredUsers.length} usuarios)
                                </Typography>
                                <Tooltip title={lastUpdate.toLocaleString()}>
                                    <Typography variant="caption">
                                        Actualizado {getTimeAgo(lastUpdate)}
                                    </Typography>
                                </Tooltip>
                            </Box>
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Actualizar lista">
                        <span>
                            <IconButton
                                color="primary"
                                onClick={fetchUsers}
                                disabled={loading || isRefreshing}
                                sx={{
                                    alignSelf: 'center',
                                    transition: 'all 0.3s ease',
                                    animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
                                    opacity: (loading || isRefreshing) ? 0.6 : 1,
                                    '@keyframes spin': {
                                        '0%': { transform: 'rotate(0deg)' },
                                        '100%': { transform: 'rotate(360deg)' }
                                    },
                                    '&:hover': {
                                        backgroundColor: 'rgba(25, 118, 210, 0.04)'
                                    }
                                }}
                            >
                                <RefreshIcon />
                            </IconButton>
                        </span>
                        </Tooltip>
                        <Button
                            component={Link}
                            to="/dashboard/users/new"
                            variant="contained"
                            startIcon={<AddIcon />}
                            size={isSmallScreen ? "medium" : "large"}
                            fullWidth={isSmallScreen}
                        >
                            Nuevo Usuario
                        </Button>
                    </Box>
                </Box>

                {/* Search Section */}
                <Box sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
                    <TextField
                        inputRef={searchInputRef}
                        fullWidth
                        size="medium"
                        variant="outlined"
                        placeholder="Buscar por nombre, ID o email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                            endAdornment: searchTerm && (
                                <InputAdornment position="end">
                                    <Tooltip title="Limpiar búsqueda">
                                        <IconButton
                                            onClick={handleClearSearch}
                                            edge="end"
                                            size="small"
                                            sx={{
                                                transition: 'opacity 0.2s',
                                                '&:hover': {
                                                    opacity: 0.8,
                                                }
                                            }}
                                        >
                                            <ClearIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            ),
                            sx: {
                                transition: 'background-color 0.2s',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.01)'
                                }
                            }
                        }}
                    />
                </Box>

                {/* Error Message */}
                {error && (
                    <Box sx={{ px: 3, pb: 2 }}>
                        <Alert severity="error" onClose={() => setError(null)}>
                            {error}
                        </Alert>
                    </Box>
                )}

                {/* Table */}
                <TableContainer>
                    <Table size={isSmallScreen ? "small" : "medium"}>
                        <TableHead>
                            <TableRow sx={{
                                backgroundColor: theme.palette.grey[50],
                                '& th': {
                                    fontWeight: 600,
                                    color: theme.palette.text.primary
                                }
                            }}>
                                <TableCell>ID</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>ID Empleado</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell align="center">Estado</TableCell>
                                <TableCell align="center">Huella</TableCell>
                                <TableCell align="right">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                Array.from(new Array(rowsPerPage)).map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell><Skeleton /></TableCell>
                                        <TableCell><Skeleton /></TableCell>
                                        <TableCell><Skeleton /></TableCell>
                                        <TableCell><Skeleton /></TableCell>
                                        <TableCell><Skeleton /></TableCell>
                                        <TableCell><Skeleton /></TableCell>
                                        <TableCell><Skeleton /></TableCell>
                                    </TableRow>
                                ))
                            ) : filteredUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                                        <Typography variant="body1" color="text.secondary">
                                            No se encontraron usuarios
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredUsers
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((user) => (
                                        <TableRow
                                            key={user.id}
                                            hover
                                            sx={{
                                                '&:nth-of-type(odd)': {
                                                    backgroundColor: theme.palette.grey[50]
                                                }
                                            }}
                                        >
                                            <TableCell>{user.id}</TableCell>
                                            <TableCell>
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                    {user.full_name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>{user.employee_id || '-'}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell align="center">
                                                <Box
                                                    sx={{
                                                        backgroundColor: user.is_active ? '#e8f5e9' : '#ffebee',
                                                        color: user.is_active ? '#2e7d32' : '#d32f2f',
                                                        py: 0.5,
                                                        px: 1,
                                                        borderRadius: 1,
                                                        display: 'inline-block',
                                                        fontSize: '0.875rem'
                                                    }}
                                                >
                                                    {user.is_active ? 'Activo' : 'Inactivo'}
                                                </Box>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Tooltip title={user.fingerprint_template ? "Huella Registrada" : "Sin Registro"}>
                                                    <IconButton
                                                        size="small"
                                                        sx={{
                                                            color: user.fingerprint_template
                                                                ? theme.palette.success.main
                                                                : theme.palette.grey[400],
                                                            '&:hover': {
                                                                backgroundColor: 'transparent'
                                                            },
                                                            cursor: 'default'
                                                        }}
                                                        disableRipple
                                                    >
                                                        {user.fingerprint_template
                                                            ? <CheckCircleIcon />
                                                            : <CancelIcon />}
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                                                <Tooltip title="Editar usuario">
                                                    <IconButton
                                                        onClick={() => handleEdit(user.id)}
                                                        size="small"
                                                        sx={{ mr: 1 }}
                                                        color="primary"
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title={user.fingerprint_template ? "Modificar huella" : "Registrar huella"}>
                                                    <IconButton
                                                        onClick={() => handleFingerprintRegistration(user.id)}
                                                        size="small"
                                                        color={user.fingerprint_template ? "primary" : "success"}
                                                    >
                                                        <FingerprintIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Divider />

                <TablePagination
                    component="div"
                    count={filteredUsers.length}
                    page={page}
                    onPageChange={(event, newPage) => setPage(newPage)}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(event) => {
                        setRowsPerPage(parseInt(event.target.value, 10));
                        setPage(0);
                    }}
                    labelRowsPerPage="Filas por página"
                    labelDisplayedRows={({ from, to, count }) =>
                        `${from}-${to} de ${count}`}
                />
            </Paper>
        </Box>
    );
};