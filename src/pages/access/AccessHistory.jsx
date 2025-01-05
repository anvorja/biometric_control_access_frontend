// import { useState, useEffect, useCallback, useRef } from 'react';
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
//     useTheme,
//     Tooltip,
//     IconButton
// } from '@mui/material';
// import {
//     CalendarMonth,
//     Search as SearchIcon,
//     Clear as ClearIcon,
//     Refresh as RefreshIcon,
//     CheckCircleOutline,
//     CancelOutlined,
//     LoginOutlined,
//     LogoutOutlined,
//     MeetingRoom,
//     NoMeetingRoom,
// } from '@mui/icons-material';
// import { accessService } from '../../services/accessService';
// import { debounce } from 'lodash';
// import { normalizeString } from '../../utils';
//
// export const AccessHistory = () => {
//     const theme = useTheme();
//     const searchInputRef = useRef(null);
//     const [history, setHistory] = useState([]);
//     const [filteredHistory, setFilteredHistory] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [isRefreshing, setIsRefreshing] = useState(false);
//     const [lastUpdate, setLastUpdate] = useState(new Date());
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
//     const fetchHistory = async () => {
//         try {
//             setLoading(true);
//             setIsRefreshing(true);
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
//             setFilteredHistory(data);
//             setLastUpdate(new Date());
//         } catch (error) {
//             console.error('Error fetching history:', error);
//         } finally {
//             setLoading(false);
//             setIsRefreshing(false);
//         }
//     };
//
//     const handleRefresh = async () => {
//         setIsRefreshing(true);
//         await fetchHistory();
//     };
//
//     const getTimeAgo = (date) => {
//         const seconds = Math.floor((new Date() - date) / 1000);
//         if (seconds < 60) return 'hace menos de un minuto';
//         const minutes = Math.floor(seconds / 60);
//         if (minutes < 60) return `hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
//         const hours = Math.floor(minutes / 60);
//         if (hours < 24) return `hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
//         return date.toLocaleString();
//     };
//
//     const filterRecords = (searchValue, records) => {
//         if (!searchValue) return records;
//
//         const searchNormalized = normalizeString(searchValue);
//
//         return records.filter(record => (
//             normalizeString(record.user?.full_name || '').includes(searchNormalized) ||
//             record.user?.employee_id?.toString().includes(searchValue) ||
//             normalizeString(record.user?.email || '').includes(searchNormalized)
//         ));
//     };
//
//     const debouncedFilter = useCallback(
//         debounce((searchValue, records) => {
//             const filtered = filterRecords(searchValue, records);
//             setFilteredHistory(filtered);
//             setPage(0);
//         }, 300),
//         []
//     );
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
//     const handleClearSearch = () => {
//         setSearchTerm('');
//         searchInputRef.current?.focus();
//     };
//
//     useEffect(() => {
//         fetchHistory();
//     }, []);
//
//     useEffect(() => {
//         debouncedFilter(searchTerm, history);
//         return () => {
//             debouncedFilter.cancel();
//         };
//     }, [searchTerm, history, debouncedFilter]);
//
//     const getDeviceLabel = (deviceId) => {
//         const deviceMap = {
//             'MAIN_DOOR': 'Puerta Principal',
//             'SIDE_DOOR': 'Puerta Lateral',
//             'GARAGE': 'Garaje'
//         };
//         return deviceMap[deviceId] || deviceId;
//     };
//
//     const getDeviceIcon = (deviceId) => {
//         return deviceId.includes('DOOR') ? <MeetingRoom fontSize="small"/> : <NoMeetingRoom fontSize="small"/>;
//     };
//
//     const formatAccessType = (type) => {
//         switch (type) {
//             case 'entry':
//                 return (
//                     <Tooltip title="Entrada al edificio">
//                         <Chip
//                             icon={<LoginOutlined fontSize="small"/>}
//                             label="Entrada"
//                             size="small"
//                             sx={{
//                                 minWidth: '90px',
//                                 backgroundColor: '#e3f2fd',
//                                 color: '#1976d2',
//                                 '& .MuiChip-icon': {
//                                     color: '#1976d2'
//                                 },
//                                 fontWeight: 500
//                             }}
//                         />
//                     </Tooltip>
//                 );
//             case 'exit':
//                 return (
//                     <Tooltip title="Salida del edificio">
//                         <Chip
//                             icon={<LogoutOutlined fontSize="small"/>}
//                             label="Salida"
//                             size="small"
//                             sx={{
//                                 minWidth: '90px',
//                                 backgroundColor: '#fce4ec',
//                                 color: '#d81b60',
//                                 '& .MuiChip-icon': {
//                                     color: '#d81b60'
//                                 },
//                                 fontWeight: 500
//                             }}
//                         />
//                     </Tooltip>
//                 );
//             default:
//                 return type;
//         }
//     };
//
//     const getStatusChip = (status) => {
//         const isSuccess = status === 'success';
//         return (
//             <Tooltip title={isSuccess ? 'Acceso permitido' : 'Acceso denegado'}>
//                 <Chip
//                     icon={isSuccess ? <CheckCircleOutline fontSize="small"/> : <CancelOutlined fontSize="small"/>}
//                     label={isSuccess ? 'Exitoso' : 'Denegado'}
//                     size="small"
//                     color={isSuccess ? 'success' : 'error'}
//                     variant="outlined"
//                     sx={{
//                         minWidth: '100px',
//                         fontWeight: 500
//                     }}
//                 />
//             </Tooltip>
//         );
//     };
//
//     return (
//         <Grid container spacing={3}>
//             {/* Sección de Tabla */}
//             <Grid item xs={12}>
//                 <Card>
//                     <Box sx={{
//                         p: 2,
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                         alignItems: 'center',
//                         flexDirection: { xs: 'column', sm: 'row' },
//                         gap: 2
//                     }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                             <Typography variant="h6" color="primary">
//                                 Historial de Accesos
//                             </Typography>
//                             <Box sx={{
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 gap: 2,
//                                 ml: 2,
//                                 color: 'text.secondary'
//                             }}>
//                                 <Typography variant="body2">
//                                     ({filteredHistory.length} registros)
//                                 </Typography>
//                                 <Tooltip title={lastUpdate.toLocaleString()}>
//                                     <Typography variant="caption">
//                                         Actualizado {getTimeAgo(lastUpdate)}
//                                     </Typography>
//                                 </Tooltip>
//                             </Box>
//                         </Box>
//                         <Tooltip title="Actualizar historial">
//                         <span>
//                             <IconButton
//                                 color="primary"
//                                 onClick={handleRefresh}
//                                 disabled={loading || isRefreshing}
//                                 sx={{
//                                     transition: 'all 0.3s ease',
//                                     animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
//                                     opacity: (loading || isRefreshing) ? 0.6 : 1,
//                                     '@keyframes spin': {
//                                         '0%': { transform: 'rotate(0deg)' },
//                                         '100%': { transform: 'rotate(360deg)' }
//                                     },
//                                     '&:hover': {
//                                         backgroundColor: 'rgba(25, 118, 210, 0.04)'
//                                     }
//                                 }}
//                             >
//                                 <RefreshIcon />
//                             </IconButton>
//                         </span>
//                         </Tooltip>
//                     </Box>
//
//                     <Box sx={{ px: 2, pb: 2, display: 'flex', gap: 2 }}>
//                         {/* Campo Fecha Inicio */}
//                         <TextField
//                             id="start-date"
//                             type="date"
//                             label="Fecha Inicio"
//                             size="medium"
//                             InputLabelProps={{shrink: true}}
//                             value={filters.start}
//                             onChange={handleFilterChange('start')}
//                             sx={{ width: '250px' }}
//                             InputProps={{
//                                 endAdornment: (
//                                     <InputAdornment position="end">
//                                         {filters.start && (
//                                             <Tooltip title="Limpiar fecha">
//                                                 <IconButton
//                                                     size="small"
//                                                     onClick={() => handleFilterChange('start')({ target: { value: '' }})}
//                                                 >
//                                                     <ClearIcon fontSize="small" />
//                                                 </IconButton>
//                                             </Tooltip>
//                                         )}
//                                         <Tooltip title="Seleccionar fecha">
//                                             <IconButton
//                                                 size="small"
//                                                 onClick={handleDateClick('start-date')}
//                                             >
//                                                 <CalendarMonth color="action"/>
//                                             </IconButton>
//                                         </Tooltip>
//                                     </InputAdornment>
//                                 ),
//                                 sx: {
//                                     '& input::-webkit-calendar-picker-indicator': {
//                                         display: 'none'
//                                     }
//                                 }
//                             }}
//                         />
//
//                         {/* Campo Fecha Fin */}
//                         <TextField
//                             id="end-date"
//                             type="date"
//                             label="Fecha Fin"
//                             size="medium"
//                             InputLabelProps={{shrink: true}}
//                             value={filters.end}
//                             onChange={handleFilterChange('end')}
//                             sx={{ width: '250px' }}
//                             InputProps={{
//                                 endAdornment: (
//                                     <InputAdornment position="end">
//                                         {filters.end && (
//                                             <Tooltip title="Limpiar fecha">
//                                                 <IconButton
//                                                     size="small"
//                                                     onClick={() => handleFilterChange('end')({ target: { value: '' }})}
//                                                 >
//                                                     <ClearIcon fontSize="small" />
//                                                 </IconButton>
//                                             </Tooltip>
//                                         )}
//                                         <Tooltip title="Seleccionar fecha">
//                                             <IconButton
//                                                 size="small"
//                                                 onClick={handleDateClick('end-date')}
//                                             >
//                                                 <CalendarMonth color="action"/>
//                                             </IconButton>
//                                         </Tooltip>
//                                     </InputAdornment>
//                                 ),
//                                 sx: {
//                                     '& input::-webkit-calendar-picker-indicator': {
//                                         display: 'none'
//                                     }
//                                 }
//                             }}
//                         />
//
//                         {/* Barra de búsqueda */}
//                         <TextField
//                             inputRef={searchInputRef}
//                             fullWidth
//                             size="medium"
//                             variant="outlined"
//                             placeholder="Buscar por nombre, ID o email..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             sx={{ flex: '1 1 auto', maxWidth: '400px' }}
//                             InputProps={{
//                                 startAdornment: (
//                                     <InputAdornment position="start">
//                                         <SearchIcon color="action" />
//                                     </InputAdornment>
//                                 ),
//                                 endAdornment: searchTerm && (
//                                     <InputAdornment position="end">
//                                         <Tooltip title="Limpiar búsqueda">
//                                             <IconButton
//                                                 onClick={handleClearSearch}
//                                                 edge="end"
//                                                 size="small"
//                                             >
//                                                 <ClearIcon fontSize="small" />
//                                             </IconButton>
//                                         </Tooltip>
//                                     </InputAdornment>
//                                 )
//                             }}
//                         />
//
//                         {/* Botón de Búsqueda */}
//                         <Tooltip title="Buscar por fechas">
//                             <Button
//                                 variant="contained"
//                                 onClick={fetchHistory}
//                                 disabled={loading}
//                                 sx={{ minWidth: '100px' }}
//                             >
//                                 Buscar
//                             </Button>
//                         </Tooltip>
//                     </Box>
//
//                     <Divider />
//                     <TableContainer>
//                         <Table>
//                             <TableHead>
//                                 <TableRow sx={{ backgroundColor: theme.palette.grey[50] }}>
//                                     <TableCell>Fecha y Hora</TableCell>
//                                     <TableCell>Usuario</TableCell>
//                                     <TableCell>Email</TableCell>
//                                     <TableCell>ID Empleado</TableCell>
//                                     <TableCell align="center">Tipo</TableCell>
//                                     <TableCell align="center">Dispositivo</TableCell>
//                                     <TableCell align="center">Estado</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {filteredHistory
//                                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                     .map((record) => (
//                                         <TableRow
//                                             key={record.id}
//                                             hover
//                                             sx={{
//                                                 '&:nth-of-type(odd)': {
//                                                     backgroundColor: theme.palette.grey[50]
//                                                 }
//                                             }}
//                                         >
//                                             <TableCell>
//                                                 <Typography variant="body2" fontWeight="medium">
//                                                     {new Date(record.timestamp).toLocaleDateString()}
//                                                 </Typography>
//                                                 <Typography variant="caption" color="textSecondary">
//                                                     {new Date(record.timestamp).toLocaleTimeString()}
//                                                 </Typography>
//                                             </TableCell>
//                                             <TableCell>
//                                                 <Typography variant="body2">
//                                                     {record.user?.full_name || 'Usuario Inactivo'}
//                                                 </Typography>
//                                             </TableCell>
//                                             <TableCell>{record.user?.email}</TableCell>
//                                             <TableCell>
//                                                 <Typography variant="body2" fontWeight="medium">
//                                                     {record.user?.employee_id}
//                                                 </Typography>
//                                             </TableCell>
//                                             <TableCell align="center">
//                                                 {formatAccessType(record.access_type)}
//                                             </TableCell>
//                                             <TableCell align="center">
//                                                 <Tooltip title={getDeviceLabel(record.device_id)}>
//                                                     <Chip
//                                                         icon={getDeviceIcon(record.device_id)}
//                                                         label={getDeviceLabel(record.device_id)}
//                                                         size="small"
//                                                         variant="outlined"
//                                                         sx={{ minWidth: '130px' }}
//                                                     />
//                                                 </Tooltip>
//                                             </TableCell>
//                                             <TableCell align="center">
//                                                 {getStatusChip(record.status)}
//                                             </TableCell>
//                                         </TableRow>
//                                     ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                     <TablePagination
//                         component="div"
//                         count={filteredHistory.length}
//                         page={page}
//                         onPageChange={(event, newPage) => setPage(newPage)}
//                         rowsPerPage={rowsPerPage}
//                         onRowsPerPageChange={(event) => {
//                             setRowsPerPage(parseInt(event.target.value, 10));
//                             setPage(0);
//                         }}
//                         labelRowsPerPage="Filas por página"
//                         labelDisplayedRows={({ from, to, count }) =>
//                             `${from}-${to} de ${count}`}
//                     />
//                 </Card>
//             </Grid>
//         </Grid>
//     );
//
// }

//

import {useState, useEffect, useCallback, useRef, useMemo} from 'react';
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
    Tooltip,
    IconButton
} from '@mui/material';
import {
    CalendarMonth,
    Search as SearchIcon,
    Clear as ClearIcon,
    Refresh as RefreshIcon,
    CheckCircleOutline,
    CancelOutlined,
    LoginOutlined,
    LogoutOutlined,
    MeetingRoom,
    NoMeetingRoom,
} from '@mui/icons-material';
import { accessService } from '../../services/accessService';
import { debounce } from 'lodash';
import { normalizeString } from '../../utils';

export const AccessHistory = () => {
    const theme = useTheme();
    const searchInputRef = useRef(null);
    const [history, setHistory] = useState([]);
    const [filteredHistory, setFilteredHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(new Date());
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

    // Memoizar filterRecords
    const filterRecords = useCallback((searchValue, records) => {
        if (!searchValue) return records;
        const searchNormalized = normalizeString(searchValue);
        return records.filter(record => (
            normalizeString(record.user?.full_name || '').includes(searchNormalized) ||
            record.user?.employee_id?.toString().includes(searchValue) ||
            normalizeString(record.user?.email || '').includes(searchNormalized)
        ));
    }, []);

    // Memoizar fetchHistory
    const fetchHistory = useCallback(async () => {
        try {
            setLoading(true);
            setIsRefreshing(true);
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
            setFilteredHistory(data);
            setLastUpdate(new Date());
        } catch (error) {
            console.error('Error fetching history:', error);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    }, [filters]);

// Memoizar la función de filtrado
    const debouncedFilterFunction = useCallback((searchValue, records) => {
        const filtered = filterRecords(searchValue, records);
        setFilteredHistory(filtered);
        setPage(0);
    }, [filterRecords, setFilteredHistory, setPage]);

// Crear la versión debounced de la función
    const debouncedFilter = useMemo(
        () => debounce(debouncedFilterFunction, 300),
        [debouncedFilterFunction]
    );


    const handleRefresh = useCallback(async () => {
        setIsRefreshing(true);
        await fetchHistory();
    }, [fetchHistory]);

    const getTimeAgo = useCallback((date) => {
        const seconds = Math.floor((new Date() - date) / 1000);
        if (seconds < 60) return 'hace menos de un minuto';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
        return date.toLocaleString();
    }, []);


    const handleFilterChange = useCallback((field) => (event) => {
        setFilters(prev => ({
            ...prev,
            [field]: event.target.value
        }));
    }, []);

    const handleDateClick = useCallback((inputId) => () => {
        document.getElementById(inputId)?.showPicker();
    }, []);

    const handleClearSearch = useCallback(() => {
        setSearchTerm('');
        searchInputRef.current?.focus();
    }, []);


    // Efectos
    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    useEffect(() => {
        debouncedFilter(searchTerm, history);
        return () => {
            debouncedFilter.cancel();
        };
    }, [searchTerm, history, debouncedFilter]);

    // Memoizar funciones de formato
    const getDeviceLabel = useCallback((deviceId) => {
        const deviceMap = {
            'MAIN_DOOR': 'Puerta Principal',
            'SIDE_DOOR': 'Puerta Lateral',
            'GARAGE': 'Garaje'
        };
        return deviceMap[deviceId] || deviceId;
    }, []);

    const getDeviceIcon = useCallback((deviceId) => {
        return deviceId.includes('DOOR') ? <MeetingRoom fontSize="small"/> : <NoMeetingRoom fontSize="small"/>;
    }, []);

    const formatAccessType = useCallback((type) => {
        const formatTypes = {
            entry: () => (
                <Tooltip title="Entrada al edificio">
                    <Chip
                        icon={<LoginOutlined fontSize="small"/>}
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
            ),
            exit: () => (
                <Tooltip title="Salida del edificio">
                    <Chip
                        icon={<LogoutOutlined fontSize="small"/>}
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
            )
        };

        return formatTypes[type]?.() || type;
    }, []); // Ahora no hay dependencias desconocidas

    const getStatusChip = useCallback((status) => {
        const isSuccess = status === 'success';
        return (
            <Tooltip title={isSuccess ? 'Acceso permitido' : 'Acceso denegado'}>
                <Chip
                    icon={isSuccess ? <CheckCircleOutline fontSize="small"/> : <CancelOutlined fontSize="small"/>}
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
    }, []);

    return (
        <Grid container spacing={3}>
            {/* Sección de Tabla */}
            <Grid item xs={12}>
                <Card>
                    <Box sx={{
                        p: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 2
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography variant="h6" color="primary">
                                Historial de Accesos
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                ml: 2,
                                color: 'text.secondary'
                            }}>
                                <Typography variant="body2">
                                    ({filteredHistory.length} registros)
                                </Typography>
                                <Tooltip title={lastUpdate.toLocaleString()}>
                                    <Typography variant="caption">
                                        Actualizado {getTimeAgo(lastUpdate)}
                                    </Typography>
                                </Tooltip>
                            </Box>
                        </Box>
                        <Tooltip title="Actualizar historial">
                        <span>
                            <IconButton
                                color="primary"
                                onClick={handleRefresh}
                                disabled={loading || isRefreshing}
                                sx={{
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
                    </Box>

                    <Box sx={{ px: 2, pb: 2, display: 'flex', gap: 2 }}>
                        {/* Campo Fecha Inicio */}
                        <TextField
                            id="start-date"
                            type="date"
                            label="Fecha Inicio"
                            size="medium"
                            InputLabelProps={{shrink: true}}
                            value={filters.start}
                            onChange={handleFilterChange('start')}
                            sx={{ width: '250px' }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {filters.start && (
                                            <Tooltip title="Limpiar fecha">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleFilterChange('start')({ target: { value: '' }})}
                                                >
                                                    <ClearIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                        <Tooltip title="Seleccionar fecha">
                                            <IconButton
                                                size="small"
                                                onClick={handleDateClick('start-date')}
                                            >
                                                <CalendarMonth color="action"/>
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                                ),
                                sx: {
                                    '& input::-webkit-calendar-picker-indicator': {
                                        display: 'none'
                                    }
                                }
                            }}
                        />

                        {/* Campo Fecha Fin */}
                        <TextField
                            id="end-date"
                            type="date"
                            label="Fecha Fin"
                            size="medium"
                            InputLabelProps={{shrink: true}}
                            value={filters.end}
                            onChange={handleFilterChange('end')}
                            sx={{ width: '250px' }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {filters.end && (
                                            <Tooltip title="Limpiar fecha">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleFilterChange('end')({ target: { value: '' }})}
                                                >
                                                    <ClearIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                        <Tooltip title="Seleccionar fecha">
                                            <IconButton
                                                size="small"
                                                onClick={handleDateClick('end-date')}
                                            >
                                                <CalendarMonth color="action"/>
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                                ),
                                sx: {
                                    '& input::-webkit-calendar-picker-indicator': {
                                        display: 'none'
                                    }
                                }
                            }}
                        />

                        {/* Barra de búsqueda */}
                        <TextField
                            inputRef={searchInputRef}
                            fullWidth
                            size="medium"
                            variant="outlined"
                            placeholder="Buscar por nombre, ID o email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{ flex: '1 1 auto', maxWidth: '400px' }}
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
                                            >
                                                <ClearIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                                )
                            }}
                        />

                        {/* Botón de Búsqueda */}
                        <Tooltip title="Buscar por fechas">
                            <Button
                                variant="contained"
                                onClick={fetchHistory}
                                disabled={loading}
                                sx={{ minWidth: '100px' }}
                            >
                                Buscar
                            </Button>
                        </Tooltip>
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
                                {filteredHistory
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
                        count={filteredHistory.length}
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
                </Card>
            </Grid>
        </Grid>
    );

}