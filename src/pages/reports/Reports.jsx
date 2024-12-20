// import {useEffect, useState} from 'react';
// import {
//     Card,
//     Grid,
//     TextField,
//     Button,
//     Dialog,
//     DialogContent,
//     DialogActions,
//     IconButton,
//     Box,
//     CircularProgress,
//     Typography,
//     Alert,
//     InputAdornment, Tooltip
// } from '@mui/material';
// import { CalendarMonth, Close } from '@mui/icons-material';
// import { accessService } from '../../services/accessService';
// import { normalizeString } from '../../utils';
// import {ClearIcon} from "@mui/x-date-pickers";
//
// export const Reports = () => {
//     const [filters, setFilters] = useState({
//         start: '',
//         end: '',
//         employeeId: '',
//         fullName: ''
//     });
//     const [previewOpen, setPreviewOpen] = useState(false);
//     const [pdfUrl, setPdfUrl] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//
//     const [searchTerm, setSearchTerm] = useState('');
//
//     const handleClearSearch = () => {
//         setSearchTerm('');
//         setFilters(prev => ({
//             ...prev,
//             employeeId: '',
//             fullName: ''
//         }));
//     };
//
//     // const handleFilterChange = (field) => (event) => {
//     //     setFilters({
//     //         ...filters,
//     //         [field]: event.target.value
//     //     });
//     // };
//     useEffect(() => {
//         if (searchTerm) {
//             const searchNormalized = normalizeString(searchTerm);
//             // Si parece ser un ID de empleado
//             if (/^\d+$/.test(searchTerm)) {
//                 setFilters(prev => ({
//                     ...prev,
//                     employeeId: searchTerm,
//                     fullName: ''
//                 }));
//             } else { // Si parece ser un nombre
//                 setFilters(prev => ({
//                     ...prev,
//                     employeeId: '',
//                     fullName: searchTerm
//                 }));
//             }
//         }
//     }, [searchTerm]);
//
//     const handleDateClick = (inputId) => () => {
//         document.getElementById(inputId)?.showPicker();
//     };
//
//     const handlePreview = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const blob = await accessService.getReportPreview({
//                 start_date: filters.start,
//                 end_date: filters.end,
//                 employee_id: filters.employeeId,
//                 full_name: filters.fullName
//             });
//             const url = URL.createObjectURL(blob);
//             setPdfUrl(url);
//             setPreviewOpen(true);
//         } catch (error) {
//             console.error('Error previewing PDF:', error);
//             setError('Error al cargar la previsualización del PDF. Por favor, intente nuevamente.');
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const handleExport = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             await accessService.exportPdf({
//                 start_date: filters.start,
//                 end_date: filters.end,
//                 employee_id: filters.employeeId,
//                 full_name: filters.fullName
//             });
//         } catch (error) {
//             console.error('Error exporting:', error);
//             setError('Error al exportar el PDF. Por favor, intente nuevamente.');
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const handleClose = () => {
//         setPreviewOpen(false);
//         if (pdfUrl) {
//             URL.revokeObjectURL(pdfUrl);
//             setPdfUrl(null);
//         }
//     };
//
//     // return (
//     //     <Grid container spacing={3}>
//     //         <Grid item xs={12}>
//     //             <Card sx={{ p: 3 }}>
//     //                 <Grid container spacing={2} alignItems="center">
//     //                     <Grid item xs={12} md={3}>
//     //                         <TextField
//     //                             id="start-date"
//     //                             fullWidth
//     //                             type="date"
//     //                             label="Fecha Inicio"
//     //                             InputLabelProps={{ shrink: true }}
//     //                             value={filters.start}
//     //                             onChange={handleFilterChange('start')}
//     //                             InputProps={{
//     //                                 endAdornment: (
//     //                                     <InputAdornment
//     //                                         position="end"
//     //                                         sx={{ cursor: 'pointer' }}
//     //                                         onClick={handleDateClick('start-date')}
//     //                                     >
//     //                                         <CalendarMonth />
//     //                                     </InputAdornment>
//     //                                 ),
//     //                                 sx: {
//     //                                     '& input::-webkit-calendar-picker-indicator': {
//     //                                         display: 'none'
//     //                                     }
//     //                                 }
//     //                             }}
//     //                         />
//     //                     </Grid>
//     //                     <Grid item xs={12} md={3}>
//     //                         <TextField
//     //                             id="end-date"
//     //                             fullWidth
//     //                             type="date"
//     //                             label="Fecha Fin"
//     //                             InputLabelProps={{ shrink: true }}
//     //                             value={filters.end}
//     //                             onChange={handleFilterChange('end')}
//     //                             InputProps={{
//     //                                 endAdornment: (
//     //                                     <InputAdornment
//     //                                         position="end"
//     //                                         sx={{ cursor: 'pointer' }}
//     //                                         onClick={handleDateClick('end-date')}
//     //                                     >
//     //                                         <CalendarMonth />
//     //                                     </InputAdornment>
//     //                                 ),
//     //                                 sx: {
//     //                                     '& input::-webkit-calendar-picker-indicator': {
//     //                                         display: 'none'
//     //                                     }
//     //                                 }
//     //                             }}
//     //                         />
//     //                     </Grid>
//     //                     <Grid item xs={12} md={3}>
//     //                         <TextField
//     //                             fullWidth
//     //                             type="text"
//     //                             label="ID de Empleado"
//     //                             value={filters.employeeId}
//     //                             onChange={handleFilterChange('employeeId')}
//     //                         />
//     //                     </Grid>
//     //                     <Grid item xs={12} md={3}>
//     //                         <TextField
//     //                             fullWidth
//     //                             label="Nombre Completo"
//     //                             value={filters.fullName}
//     //                             onChange={handleFilterChange('fullName')}
//     //                         />
//     //                     </Grid>
//     //                     {error && (
//     //                         <Grid item xs={12}>
//     //                             <Alert severity="error">{error}</Alert>
//     //                         </Grid>
//     //                     )}
//     //                     <Grid item xs={12} container spacing={2}>
//     //                         <Grid item xs={12} md={6}>
//     //                             <Button
//     //                                 fullWidth
//     //                                 variant="outlined"
//     //                                 onClick={handlePreview}
//     //                                 disabled={loading}
//     //                                 sx={{ height: '56px' }}
//     //                             >
//     //                                 {loading ? (
//     //                                     <CircularProgress size={24} />
//     //                                 ) : (
//     //                                     'Previsualizar PDF'
//     //                                 )}
//     //                             </Button>
//     //                         </Grid>
//     //                         <Grid item xs={12} md={6}>
//     //                             <Button
//     //                                 fullWidth
//     //                                 variant="contained"
//     //                                 onClick={handleExport}
//     //                                 disabled={loading}
//     //                                 sx={{ height: '56px' }}
//     //                             >
//     //                                 {loading ? (
//     //                                     <CircularProgress size={24} />
//     //                                 ) : (
//     //                                     'Exportar PDF'
//     //                                 )}
//     //                             </Button>
//     //                         </Grid>
//     //                     </Grid>
//     //                 </Grid>
//     //             </Card>
//     //         </Grid>
//     //
//     //         <Dialog
//     //             open={previewOpen}
//     //             onClose={handleClose}
//     //             maxWidth="lg"
//     //             fullWidth
//     //         >
//     //             <DialogContent sx={{ position: 'relative', minHeight: '80vh' }}>
//     //                 <IconButton
//     //                     onClick={handleClose}
//     //                     sx={{ position: 'absolute', right: 8, top: 8, zIndex: 1 }}
//     //                 >
//     //                     <Close />
//     //                 </IconButton>
//     //                 {pdfUrl && (
//     //                     <Box
//     //                         sx={{
//     //                             width: '100%',
//     //                             height: '100%',
//     //                             display: 'flex',
//     //                             justifyContent: 'center',
//     //                             alignItems: 'center'
//     //                         }}
//     //                     >
//     //                         <iframe
//     //                             src={`${pdfUrl}#toolbar=0`}
//     //                             style={{
//     //                                 width: '100%',
//     //                                 height: '75vh',
//     //                                 border: 'none'
//     //                             }}
//     //                             title="PDF Preview"
//     //                         />
//     //                     </Box>
//     //                 )}
//     //                 {!pdfUrl && !loading && (
//     //                     <Typography variant="body1" textAlign="center">
//     //                         No hay PDF para previsualizar
//     //                     </Typography>
//     //                 )}
//     //                 {loading && (
//     //                     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
//     //                         <CircularProgress />
//     //                     </Box>
//     //                 )}
//     //             </DialogContent>
//     //             <DialogActions>
//     //                 <Button onClick={handleClose}>Cerrar</Button>
//     //                 <Button
//     //                     onClick={handleExport}
//     //                     variant="contained"
//     //                     disabled={loading}
//     //                 >
//     //                     {loading ? <CircularProgress size={24} /> : 'Exportar'}
//     //                 </Button>
//     //             </DialogActions>
//     //         </Dialog>
//     //     </Grid>
//     // );
//
//     return (
//         <Grid container spacing={3}>
//             <Grid item xs={12}>
//                 <Card>
//                     {/* Header Section */}
//                     <Box sx={{
//                         p: 2,
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                         alignItems: 'center',
//                         flexDirection: { xs: 'column', sm: 'row' },
//                         gap: 2,
//                         borderBottom: `1px solid ${theme.palette.divider}`
//                     }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                             <Typography variant="h6" color="primary">
//                                 Reportes de Acceso
//                             </Typography>
//                         </Box>
//                     </Box>
//
//                     {/* Search and Filter Section */}
//                     <Box sx={{ px: 2, py: 2, display: 'flex', gap: 2 }}>
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
//                             fullWidth
//                             size="medium"
//                             variant="outlined"
//                             placeholder="Buscar por nombre o ID de empleado..."
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
//                         {/* Botones de acción */}
//                         <Tooltip title="Previsualizar reporte">
//                             <Button
//                                 variant="outlined"
//                                 onClick={handlePreview}
//                                 disabled={loading}
//                                 sx={{ minWidth: '170px' }}
//                                 startIcon={loading ? <CircularProgress size={20} /> : null}
//                             >
//                                 Previsualizar PDF
//                             </Button>
//                         </Tooltip>
//
//                         <Tooltip title="Exportar reporte">
//                             <Button
//                                 variant="contained"
//                                 onClick={handleExport}
//                                 disabled={loading}
//                                 sx={{ minWidth: '140px' }}
//                                 startIcon={loading ? <CircularProgress size={20} /> : null}
//                             >
//                                 Exportar PDF
//                             </Button>
//                         </Tooltip>
//                     </Box>
//
//                     {/* Error Message */}
//                     {error && (
//                         <Box sx={{ px: 2, pb: 2 }}>
//                             <Alert severity="error" onClose={() => setError(null)}>
//                                 {error}
//                             </Alert>
//                         </Box>
//                     )}
//                 </Card>
//             </Grid>
//
//             {/* Preview Dialog */}
//             <Dialog
//                 open={previewOpen}
//                 onClose={handleClose}
//                 maxWidth="lg"
//                 fullWidth
//             >
//                 <DialogContent sx={{ position: 'relative', minHeight: '80vh' }}>
//                     <IconButton
//                         onClick={handleClose}
//                         sx={{ position: 'absolute', right: 8, top: 8, zIndex: 1 }}
//                     >
//                         <Close />
//                     </IconButton>
//                     {pdfUrl && (
//                         <Box sx={{
//                             width: '100%',
//                             height: '100%',
//                             display: 'flex',
//                             justifyContent: 'center',
//                             alignItems: 'center'
//                         }}>
//                             <iframe
//                                 src={`${pdfUrl}#toolbar=0`}
//                                 style={{
//                                     width: '100%',
//                                     height: '75vh',
//                                     border: 'none'
//                                 }}
//                                 title="PDF Preview"
//                             />
//                         </Box>
//                     )}
//                     {!pdfUrl && !loading && (
//                         <Typography variant="body1" textAlign="center">
//                             No hay PDF para previsualizar
//                         </Typography>
//                     )}
//                     {loading && (
//                         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
//                             <CircularProgress />
//                         </Box>
//                     )}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose}>Cerrar</Button>
//                     <Button
//                         onClick={handleExport}
//                         variant="contained"
//                         disabled={loading}
//                     >
//                         {loading ? <CircularProgress size={24} /> : 'Exportar'}
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Grid>
//     );
//
// };

import {useEffect, useState} from 'react';
import {
    Card,
    Grid,
    TextField,
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    IconButton,
    Box,
    CircularProgress,
    Typography,
    Alert,
    InputAdornment,
    Tooltip,
    useTheme
} from '@mui/material';
import {
    CalendarMonth,
    Close,
    Clear as ClearIcon,
    Search as SearchIcon
} from '@mui/icons-material';
import { accessService } from '../../services/accessService';
import { userService } from '../../services/userService';
import { normalizeString } from '../../utils';

export const Reports = () => {
    const theme = useTheme();
    const [filters, setFilters] = useState({
        start: '',
        end: '',
        employeeId: '',
        fullName: ''
    });
    const [previewOpen, setPreviewOpen] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [allUsers, setAllUsers] = useState([]);


    // Cargar usuarios al montar el componente
    useEffect(() => {
        const loadUsers = async () => {
            try {
                const users = await userService.getUsers();
                setAllUsers(users);
            } catch (error) {
                console.error('Error loading users:', error);
                setError('Error al cargar la lista de usuarios');
            }
        };
        loadUsers();
    }, []);

    const handleFilterChange = (field) => (event) => {
        setFilters({
            ...filters,
            [field]: event.target.value
        });
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setFilters(prev => ({
            ...prev,
            employeeId: '',
            fullName: ''
        }));
    };

    // Efecto para manejar la búsqueda
    useEffect(() => {
        if (!searchTerm) {
            setFilters(prev => ({
                ...prev,
                employeeId: '',
                fullName: ''
            }));
            return;
        }

        const searchNormalized = normalizeString(searchTerm);
        const filtered = allUsers.filter(user =>
            normalizeString(user.full_name || '').includes(searchNormalized) ||
            user.employee_id?.toString().includes(searchTerm)
        );

        if (filtered.length > 0) {
            const firstMatch = filtered[0];
            setFilters(prev => ({
                ...prev,
                employeeId: firstMatch.employee_id?.toString() || '',
                fullName: firstMatch.full_name || ''
            }));
        }
    }, [searchTerm, allUsers]);

    const handleDateClick = (inputId) => () => {
        document.getElementById(inputId)?.showPicker();
    };

    const handlePreview = async () => {
        setLoading(true);
        setError(null);
        try {
            const blob = await accessService.getReportPreview({
                start_date: filters.start,
                end_date: filters.end,
                employee_id: filters.employeeId,
                full_name: filters.fullName
            });
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
            setPreviewOpen(true);
        } catch (error) {
            console.error('Error previewing PDF:', error);
            setError('Error al cargar la previsualización del PDF. Por favor, intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleExport = async () => {
        setLoading(true);
        setError(null);
        try {
            await accessService.exportPdf({
                start_date: filters.start,
                end_date: filters.end,
                employee_id: filters.employeeId,
                full_name: filters.fullName
            });
        } catch (error) {
            console.error('Error exporting:', error);
            setError('Error al exportar el PDF. Por favor, intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setPreviewOpen(false);
        if (pdfUrl) {
            URL.revokeObjectURL(pdfUrl);
            setPdfUrl(null);
        }
    };

    const renderDateInput = (id, label, value, onChange) => (
        <TextField
            id={id}
            type="date"
            label={label}
            size="medium"
            value={value}
            onChange={onChange}
            sx={{width: '250px'}}
            inputProps={{
                'aria-label': label
            }}
            InputLabelProps={{
                shrink: true
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        {value && (
                            <Tooltip title="Limpiar fecha">
                                <IconButton
                                    size="small"
                                    onClick={() => onChange({target: {value: ''}})}
                                >
                                    <ClearIcon fontSize="small"/>
                                </IconButton>
                            </Tooltip>
                        )}
                        <Tooltip title="Seleccionar fecha">
                            <IconButton
                                size="small"
                                onClick={handleDateClick(id)}
                            >
                                <CalendarMonth color="action"/>
                            </IconButton>
                        </Tooltip>
                    </InputAdornment>
                )
            }}
        />
    );

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Card>
                    <Box sx={{
                        p: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: {xs: 'column', sm: 'row'},
                        gap: 2,
                        borderBottom: `1px solid ${theme.palette.divider}`
                    }}>
                        <Typography variant="h6" color="primary">
                            Reportes de Acceso
                        </Typography>
                    </Box>

                    <Box sx={{px: 2, py: 2, display: 'flex', flexDirection: 'column', gap: 2}}>
                        {/* Contenedor para fechas y búsqueda */}
                        <Box sx={{display: 'flex', gap: 2, flexWrap: 'wrap'}}>
                            {renderDateInput(
                                "start-date",
                                "Fecha Inicio",
                                filters.start,
                                handleFilterChange('start')
                            )}

                            {renderDateInput(
                                "end-date",
                                "Fecha Fin",
                                filters.end,
                                handleFilterChange('end')
                            )}

                            <TextField
                                size="medium"
                                variant="outlined"
                                placeholder="Buscar por nombre o ID de empleado..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                sx={{flex: '1 1 auto', maxWidth: '400px'}}
                                inputProps={{
                                    'aria-label': 'Búsqueda'
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon color="action"/>
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
                                                    <ClearIcon fontSize="small"/>
                                                </IconButton>
                                            </Tooltip>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Box>

                        {/* Contenedor para botones */}
                        <Box sx={{display: 'flex', gap: 2, justifyContent: 'flex-end'}}>
                            <Tooltip title="Previsualizar reporte">
                            <span>
                                <Button
                                    variant="outlined"
                                    onClick={handlePreview}
                                    disabled={loading}
                                    sx={{minWidth: '170px'}}
                                    startIcon={loading ? <CircularProgress size={20}/> : null}
                                >
                                    Previsualizar PDF
                                </Button>
                            </span>
                            </Tooltip>

                            <Tooltip title="Exportar reporte">
                            <span>
                                <Button
                                    variant="contained"
                                    onClick={handleExport}
                                    disabled={loading}
                                    sx={{minWidth: '140px'}}
                                    startIcon={loading ? <CircularProgress size={20}/> : null}
                                >
                                    Exportar PDF
                                </Button>
                            </span>
                            </Tooltip>
                        </Box>
                    </Box>

                    {error && (
                        <Box sx={{px: 2, pb: 2}}>
                            <Alert severity="error" onClose={() => setError(null)}>
                                {error}
                            </Alert>
                        </Box>
                    )}
                </Card>
            </Grid>

            <Dialog
                open={previewOpen}
                onClose={handleClose}
                maxWidth="lg"
                fullWidth
            >
                <DialogContent sx={{position: 'relative', minHeight: '80vh'}}>
                    <IconButton
                        onClick={handleClose}
                        sx={{position: 'absolute', right: 8, top: 8, zIndex: 1}}
                    >
                        <Close/>
                    </IconButton>
                    {pdfUrl && (
                        <Box sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <iframe
                                src={`${pdfUrl}#toolbar=0`}
                                style={{
                                    width: '100%',
                                    height: '75vh',
                                    border: 'none'
                                }}
                                title="PDF Preview"
                            />
                        </Box>
                    )}
                    {!pdfUrl && !loading && (
                        <Typography variant="body1" textAlign="center">
                            No hay PDF para previsualizar
                        </Typography>
                    )}
                    {loading && (
                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh'}}>
                            <CircularProgress/>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cerrar</Button>
                    <Button
                        onClick={handleExport}
                        variant="contained"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24}/> : 'Exportar'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}