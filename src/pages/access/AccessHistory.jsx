// import { useState, useEffect } from 'react';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Card,
//     Grid,
//     TextField,
//     Button,
//     InputAdornment,
//     Typography,
//     Divider,
//     Chip,
//     Box,
//     TablePagination,
//     useTheme
// } from '@mui/material';
// import {
//     CalendarMonth,
//     Search,
//     Clear,
//     CheckCircle,
//     Cancel,
//     ArrowForward,
//     ArrowBack
// } from '@mui/icons-material';
// import { accessService } from '../../services/accessService';
// import { LoginOutlined, LogoutOutlined } from '@mui/icons-material';
// import { South, North } from '@mui/icons-material';
// import { MeetingRoom, NoMeetingRoom } from '@mui/icons-material';
//
//
// export const AccessHistory = () => {
//     const theme = useTheme();
//     const [history, setHistory] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//     const [filters, setFilters] = useState({
//         start: '',
//         end: '',
//         employeeId: '',
//         email: '',
//         fullName: '',
//         accessType: '',
//         deviceId: '',
//         status: ''
//     });
//
//     const handleFilterChange = (field) => (event) => {
//         setFilters({
//             ...filters,
//             [field]: event.target.value
//         });
//     };
//
//     const handleDateClick = (inputId) => () => {
//         document.getElementById(inputId)?.showPicker();
//     };
//
//     const clearFilters = () => {
//         setFilters({
//             start: '',
//             end: '',
//             employeeId: '',
//             email: '',
//             fullName: '',
//             accessType: '',
//             deviceId: '',
//             status: ''
//         });
//     };
//
//     const fetchHistory = async () => {
//         try {
//             setLoading(true);
//             const data = await accessService.getFilteredHistory({
//                 start_date: filters.start || undefined,
//                 end_date: filters.end || undefined,
//                 employee_id: filters.employeeId ? parseInt(filters.employeeId) : undefined,
//                 email: filters.email || undefined,
//                 full_name: filters.fullName || undefined,
//                 access_type: filters.accessType || undefined,
//                 device_id: filters.deviceId || undefined,
//                 status: filters.status || undefined
//             });
//             setHistory(data);
//             setPage(0);
//         } catch (error) {
//             console.error('Error fetching history:', error);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     useEffect(() => {
//         fetchHistory();
//     }, []);
//
//     const handleSearch = () => {
//         fetchHistory();
//     };
//
//     const getStatusColor = (status) => {
//         return status === 'success' ? theme.palette.success.main : theme.palette.error.main;
//     };
//
//     const getStatusIcon = (status) => {
//         return status === 'success' ? <CheckCircle fontSize="small" /> : <Cancel fontSize="small" />;
//     };
//
//     // const formatAccessType = (type) => {
//     //     switch(type) {
//     //         case 'entry':
//     //             return <Chip
//     //                 icon={<ArrowForward fontSize="small" />}
//     //                 label="Entrada"
//     //                 size="small"
//     //                 color="primary"
//     //             />;
//     //         case 'exit':
//     //             return <Chip
//     //                 icon={<ArrowBack fontSize="small" />}
//     //                 label="Salida"
//     //                 size="small"
//     //                 color="secondary"
//     //             />;
//     //         default:
//     //             return type;
//     //     }
//     // };
//
//     const formatAccessType = (type) => {
//         switch(type) {
//             case 'entry':
//                 return <Chip
//                     icon={<LoginOutlined fontSize="small" />}
//                     label="Entrada"
//                     size="small"
//                     sx={{
//                         minWidth: '100px',
//                         backgroundColor: '#e3f2fd', // Azul claro
//                         color: '#1976d2',
//                         '& .MuiChip-icon': {
//                             color: '#1976d2'
//                         }
//                     }}
//                 />;
//             case 'exit':
//                 return <Chip
//                     icon={<LogoutOutlined fontSize="small" />}
//                     label="Salida"
//                     size="small"
//                     sx={{
//                         minWidth: '100px',
//                         backgroundColor: '#fce4ec', // Rosa claro
//                         color: '#d81b60',
//                         '& .MuiChip-icon': {
//                             color: '#d81b60'
//                         }
//                     }}
//                 />;
//             default:
//                 return type;
//         }
//     };
//
//     // const formatAccessType = (type) => {
//     //     switch(type) {
//     //         case 'entry':
//     //             return <Chip
//     //                 icon={<LoginOutlined fontSize="small" />}
//     //                 label="Entrada"
//     //                 size="small"
//     //                 color="primary"
//     //                 sx={{ minWidth: '100px' }}
//     //             />;
//     //         case 'exit':
//     //             return <Chip
//     //                 icon={<LogoutOutlined fontSize="small" />}
//     //                 label="Salida"
//     //                 size="small"
//     //                 color="secondary"
//     //                 sx={{ minWidth: '100px' }}
//     //             />;
//     //         default:
//     //             return type;
//     //     }
//     // };
//
//     // const formatAccessType = (type) => {
//     //     switch(type) {
//     //         case 'entry':
//     //             return <Chip
//     //                 icon={<South fontSize="small" />}
//     //                 label="Entrada"
//     //                 size="small"
//     //                 sx={{
//     //                     minWidth: '100px',
//     //                     backgroundColor: '#e3f2fd', // Azul claro
//     //                     color: '#1976d2',
//     //                     '& .MuiChip-icon': {
//     //                         color: '#1976d2'
//     //                     }
//     //                 }}
//     //             />;
//     //         case 'exit':
//     //             return <Chip
//     //                 icon={<North fontSize="small" />}
//     //                 label="Salida"
//     //                 size="small"
//     //                 sx={{
//     //                     minWidth: '100px',
//     //                     backgroundColor: '#fce4ec', // Rosa claro
//     //                     color: '#d81b60',
//     //                     '& .MuiChip-icon': {
//     //                         color: '#d81b60'
//     //                     }
//     //                 }}
//     //             />;
//     //         default:
//     //             return type;
//     //     }
//     // };
//
//     return (
//         <Grid container spacing={3}>
//             <Grid item xs={12}>
//                 <Card sx={{ p: 3, mb: 3 }}>
//                     <Typography variant="h6" gutterBottom>
//                         Filtros de Búsqueda
//                     </Typography>
//                     <Divider sx={{ mb: 3 }} />
//
//                     <Grid container spacing={2} alignItems="center">
//                         <Grid item xs={12} container spacing={2}>
//                             <Grid item xs={12} md={3}>
//                                 <TextField
//                                     id="start-date"
//                                     fullWidth
//                                     type="date"
//                                     label="Fecha Inicio"
//                                     InputLabelProps={{ shrink: true }}
//                                     value={filters.start}
//                                     onChange={handleFilterChange('start')}
//                                     InputProps={{
//                                         endAdornment: (
//                                             <InputAdornment
//                                                 position="end"
//                                                 sx={{ cursor: 'pointer' }}
//                                                 onClick={handleDateClick('start-date')}
//                                             >
//                                                 <CalendarMonth />
//                                             </InputAdornment>
//                                         ),
//                                         sx: {
//                                             '& input::-webkit-calendar-picker-indicator': {
//                                                 display: 'none'
//                                             }
//                                         }
//                                     }}
//                                 />
//                             </Grid>
//                             <Grid item xs={12} md={3}>
//                                 <TextField
//                                     id="end-date"
//                                     fullWidth
//                                     type="date"
//                                     label="Fecha Fin"
//                                     InputLabelProps={{ shrink: true }}
//                                     value={filters.end}
//                                     onChange={handleFilterChange('end')}
//                                     InputProps={{
//                                         endAdornment: (
//                                             <InputAdornment
//                                                 position="end"
//                                                 sx={{ cursor: 'pointer' }}
//                                                 onClick={handleDateClick('end-date')}
//                                             >
//                                                 <CalendarMonth />
//                                             </InputAdornment>
//                                         ),
//                                         sx: {
//                                             '& input::-webkit-calendar-picker-indicator': {
//                                                 display: 'none'
//                                             }
//                                         }
//                                     }}
//                                 />
//                             </Grid>
//                             <Grid item xs={12} md={3}>
//                                 <TextField
//                                     fullWidth
//                                     type="number"
//                                     label="ID de Empleado"
//                                     value={filters.employeeId}
//                                     onChange={handleFilterChange('employeeId')}
//                                 />
//                             </Grid>
//                             <Grid item xs={12} md={3}>
//                                 <TextField
//                                     fullWidth
//                                     type="email"
//                                     label="Correo Electrónico"
//                                     value={filters.email}
//                                     onChange={handleFilterChange('email')}
//                                 />
//                             </Grid>
//                         </Grid>
//
//                         <Grid item xs={12} md={6}>
//                             <TextField
//                                 fullWidth
//                                 label="Nombre Completo"
//                                 value={filters.fullName}
//                                 onChange={handleFilterChange('fullName')}
//                             />
//                         </Grid>
//
//                         <Grid item xs={12} md={6} container spacing={2}>
//                             <Grid item xs={6}>
//                                 <Button
//                                     fullWidth
//                                     variant="outlined"
//                                     onClick={clearFilters}
//                                     disabled={loading}
//                                     startIcon={<Clear />}
//                                     sx={{ height: '56px' }}
//                                 >
//                                     Limpiar
//                                 </Button>
//                             </Grid>
//                             <Grid item xs={6}>
//                                 <Button
//                                     fullWidth
//                                     variant="contained"
//                                     onClick={handleSearch}
//                                     disabled={loading}
//                                     startIcon={<Search />}
//                                     sx={{ height: '56px' }}
//                                 >
//                                     {loading ? 'Buscando...' : 'Buscar'}
//                                 </Button>
//                             </Grid>
//                         </Grid>
//                     </Grid>
//                 </Card>
//             </Grid>
//
//             <Grid item xs={12}>
//                 <Card>
//                     <TableContainer>
//                         <Table>
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell>Fecha y Hora</TableCell>
//                                     <TableCell>Usuario</TableCell>
//                                     <TableCell>Email</TableCell>
//                                     <TableCell>ID Empleado</TableCell>
//                                     <TableCell align="center">Tipo</TableCell>
//                                     <TableCell>Dispositivo</TableCell>
//                                     <TableCell align="center">Estado</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {history
//                                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                     .map((record) => (
//                                         <TableRow key={record.id} hover>
//                                             <TableCell>
//                                                 <Typography variant="body2">
//                                                     {new Date(record.timestamp).toLocaleDateString()}
//                                                 </Typography>
//                                                 <Typography variant="caption" color="textSecondary">
//                                                     {new Date(record.timestamp).toLocaleTimeString()}
//                                                 </Typography>
//                                             </TableCell>
//                                             <TableCell>{record.user?.full_name}</TableCell>
//                                             <TableCell>{record.user?.email}</TableCell>
//                                             <TableCell>{record.user?.employee_id}</TableCell>
//                                             <TableCell align="center">
//                                                 {formatAccessType(record.access_type)}
//                                             </TableCell>
//                                             <TableCell>{record.device_id}</TableCell>
//                                             <TableCell align="center">
//                                                 <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
//                                                     {getStatusIcon(record.status)}
//                                                     <Typography
//                                                         variant="body2"
//                                                         sx={{ color: getStatusColor(record.status) }}
//                                                     >
//                                                         {record.status === 'success' ? 'Exitoso' : 'Denegado'}
//                                                     </Typography>
//                                                 </Box>
//                                             </TableCell>
//                                         </TableRow>
//                                     ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                     <TablePagination
//                         component="div"
//                         count={history.length}
//                         page={page}
//                         onPageChange={(event, newPage) => setPage(newPage)}
//                         rowsPerPage={rowsPerPage}
//                         onRowsPerPageChange={(event) => {
//                             setRowsPerPage(parseInt(event.target.value, 10));
//                             setPage(0);
//                         }}
//                         labelRowsPerPage="Filas por página"
//                     />
//                 </Card>
//             </Grid>
//         </Grid>
//     );
// };



import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Card,
    Grid,
    TextField,
    Button,
    InputAdornment,
    Typography,
    Divider,
    Chip,
    Box,
    TablePagination,
    useTheme,
    Tooltip
} from '@mui/material';
import {
    CalendarMonth,
    Search,
    Clear,
    Cancel,
    CheckCircleOutline,
    CancelOutlined,
    LoginOutlined,
    LogoutOutlined, CheckCircle,
    MeetingRoom,
    NoMeetingRoom,
} from '@mui/icons-material';
import { accessService } from '../../services/accessService';


export const AccessHistory = () => {
    const theme = useTheme();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filters, setFilters] = useState({
        start: '',
        end: '',
        employeeId: '',
        email: '',
        fullName: '',
        accessType: '',
        deviceId: '',
        status: ''
    });

    const handleFilterChange = (field) => (event) => {
        setFilters({
            ...filters,
            [field]: event.target.value
        });
    };

    const handleDateClick = (inputId) => () => {
        document.getElementById(inputId)?.showPicker();
    };

    const clearFilters = () => {
        setFilters({
            start: '',
            end: '',
            employeeId: '',
            email: '',
            fullName: '',
            accessType: '',
            deviceId: '',
            status: ''
        });
    };

    const fetchHistory = async () => {
        try {
            setLoading(true);
            const data = await accessService.getFilteredHistory({
                start_date: filters.start || undefined,
                end_date: filters.end || undefined,
                employee_id: filters.employeeId ? parseInt(filters.employeeId) : undefined,
                email: filters.email || undefined,
                full_name: filters.fullName || undefined,
                access_type: filters.accessType || undefined,
                device_id: filters.deviceId || undefined,
                status: filters.status || undefined
            });
            setHistory(data);
            setPage(0);
        } catch (error) {
            console.error('Error fetching history:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleSearch = () => {
        fetchHistory();
    };

    const getStatusColor = (status) => {
        return status === 'success' ? theme.palette.success.main : theme.palette.error.main;
    };

    const getStatusIcon = (status) => {
        return status === 'success' ? <CheckCircle fontSize="small" /> : <Cancel fontSize="small" />;
    };

    const getDeviceLabel = (deviceId) => {
        const deviceMap = {
            'MAIN_DOOR': 'Puerta Principal',
            'SIDE_DOOR': 'Puerta Lateral',
            'GARAGE': 'Garaje'
        };
        return deviceMap[deviceId] || deviceId;
    };

    const getDeviceIcon = (deviceId) => {
        return deviceId.includes('DOOR') ? <MeetingRoom fontSize="small" /> : <NoMeetingRoom fontSize="small" />;
    };

    const formatAccessType = (type) => {
        switch(type) {
            case 'entry':
                return (
                    <Tooltip title="Entrada al edificio">
                        <Chip
                            icon={<LoginOutlined fontSize="small" />}
                            label="Entrada"
                            size="small"
                            sx={{
                                minWidth: '90px',
                                backgroundColor: '#e3f2fd',
                                color: '#1976d2',
                                '& .MuiChip-icon': {
                                    color: '#1976d2'
                                },
                                fontWeight: 500
                            }}
                        />
                    </Tooltip>
                );
            case 'exit':
                return (
                    <Tooltip title="Salida del edificio">
                        <Chip
                            icon={<LogoutOutlined fontSize="small" />}
                            label="Salida"
                            size="small"
                            sx={{
                                minWidth: '90px',
                                backgroundColor: '#fce4ec',
                                color: '#d81b60',
                                '& .MuiChip-icon': {
                                    color: '#d81b60'
                                },
                                fontWeight: 500
                            }}
                        />
                    </Tooltip>
                );
            default:
                return type;
        }
    };

    const getStatusChip = (status) => {
        const isSuccess = status === 'success';
        return (
            <Tooltip title={isSuccess ? 'Acceso permitido' : 'Acceso denegado'}>
                <Chip
                    icon={isSuccess ? <CheckCircleOutline fontSize="small" /> : <CancelOutlined fontSize="small" />}
                    label={isSuccess ? 'Exitoso' : 'Denegado'}
                    size="small"
                    color={isSuccess ? 'success' : 'error'}
                    variant="outlined"
                    sx={{
                        minWidth: '100px',
                        fontWeight: 500
                    }}
                />
            </Tooltip>
        );
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Card sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.main, mb: 2 }}>
                        Filtros de Búsqueda
                    </Typography>
                    <Divider sx={{ mb: 3 }} />

                    <Grid container spacing={3}>
                        <Grid item xs={12} container spacing={2}>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    id="start-date"
                                    fullWidth
                                    type="date"
                                    label="Fecha Inicio"
                                    InputLabelProps={{ shrink: true }}
                                    value={filters.start}
                                    onChange={handleFilterChange('start')}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment
                                                position="end"
                                                sx={{ cursor: 'pointer' }}
                                                onClick={handleDateClick('start-date')}
                                            >
                                                <CalendarMonth color="action" />
                                            </InputAdornment>
                                        ),
                                        sx: {
                                            '& input::-webkit-calendar-picker-indicator': {
                                                display: 'none'
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    id="end-date"
                                    fullWidth
                                    type="date"
                                    label="Fecha Fin"
                                    InputLabelProps={{ shrink: true }}
                                    value={filters.end}
                                    onChange={handleFilterChange('end')}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment
                                                position="end"
                                                sx={{ cursor: 'pointer' }}
                                                onClick={handleDateClick('end-date')}
                                            >
                                                <CalendarMonth color="action" />
                                            </InputAdornment>
                                        ),
                                        sx: {
                                            '& input::-webkit-calendar-picker-indicator': {
                                                display: 'none'
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    type="text"
                                    label="ID de Empleado"
                                    value={filters.employeeId}
                                    onChange={handleFilterChange('employeeId')}
                                    placeholder="Ej: 2024001"
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    type="email"
                                    label="Correo Electrónico"
                                    value={filters.email}
                                    onChange={handleFilterChange('email')}
                                    placeholder="correo@ejemplo.com"
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Nombre Completo"
                                value={filters.fullName}
                                onChange={handleFilterChange('fullName')}
                                placeholder="Nombre del empleado"
                            />
                        </Grid>

                        <Grid item xs={12} md={6} container spacing={2}>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={clearFilters}
                                    disabled={loading}
                                    startIcon={<Clear />}
                                    sx={{ height: '56px' }}
                                >
                                    Limpiar
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={handleSearch}
                                    disabled={loading}
                                    startIcon={<Search />}
                                    sx={{ height: '56px' }}
                                >
                                    {loading ? 'Buscando...' : 'Buscar'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>

            <Grid item xs={12}>
                <Card>
                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" color="primary">
                            Historial de Accesos
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Total de registros: {history.length}
                        </Typography>
                    </Box>
                    <Divider />
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: theme.palette.grey[50] }}>
                                    <TableCell>Fecha y Hora</TableCell>
                                    <TableCell>Usuario</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>ID Empleado</TableCell>
                                    <TableCell align="center">Tipo</TableCell>
                                    <TableCell align="center">Dispositivo</TableCell>
                                    <TableCell align="center">Estado</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {history
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((record) => (
                                        <TableRow
                                            key={record.id}
                                            hover
                                            sx={{
                                                '&:nth-of-type(odd)': {
                                                    backgroundColor: theme.palette.grey[50]
                                                }
                                            }}
                                        >
                                            <TableCell>
                                                <Typography variant="body2" fontWeight="medium">
                                                    {new Date(record.timestamp).toLocaleDateString()}
                                                </Typography>
                                                <Typography variant="caption" color="textSecondary">
                                                    {new Date(record.timestamp).toLocaleTimeString()}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    {record.user?.full_name || 'Usuario Inactivo'}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>{record.user?.email}</TableCell>
                                            <TableCell>
                                                <Typography variant="body2" fontWeight="medium">
                                                    {record.user?.employee_id}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                {formatAccessType(record.access_type)}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Tooltip title={getDeviceLabel(record.device_id)}>
                                                    <Chip
                                                        icon={getDeviceIcon(record.device_id)}
                                                        label={getDeviceLabel(record.device_id)}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{ minWidth: '130px' }}
                                                    />
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell align="center">
                                                {getStatusChip(record.status)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={history.length}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                        labelRowsPerPage="Filas por página"
                    />
                </Card>
            </Grid>
        </Grid>
    );
};

