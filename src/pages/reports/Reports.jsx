import { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Grid,
    TextField,
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    IconButton,
    Box,
    Typography,
    Alert,
    InputAdornment,
    useTheme,
    useMediaQuery,
    Stack,
    Chip,
    Autocomplete,
    LinearProgress,
    DialogTitle, Snackbar
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
    Close,
    Clear as ClearIcon,
    Search as SearchIcon,
    PictureAsPdf,
    RemoveRedEye, ClearAll,
    Description, CalendarMonth
} from '@mui/icons-material';
import { accessService } from '../../services/accessService';
import { userService } from '../../services/userService';

export const Reports = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Estados
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
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [activeFilters, setActiveFilters] = useState([]);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'info'
    });

    // Cargar usuarios al montar el componente
    useEffect(() => {
        const loadUsers = async () => {
            try {
                const users = await userService.getUsers();
                setAllUsers(users);
            } catch (err) {
                setError('Error al cargar la lista de usuarios');
            }
        };
        loadUsers();
    }, []);

    // Manejadores de eventos
    const handleDateChange = (field) => (event) => {
        const value = event.target.value;
        setFilters(prev => ({
            ...prev,
            [field]: value
        }));

        if (value) {
            setActiveFilters(prev => [
                ...prev.filter(f => f.key !== field),
                { key: field, label: `${field === 'start' ? 'Inicio' : 'Fin'}: ${value}` }
            ]);
        } else {
            setActiveFilters(prev => prev.filter(f => f.key !== field));
        }
    };

    const handleUserChange = (_, newValue) => {
        setSelectedUser(newValue);
        setFilters(prev => ({
            ...prev,
            employeeId: newValue?.employee_id || '',
            fullName: newValue?.full_name || ''
        }));

        if (newValue) {
            setActiveFilters(prev => [
                ...prev.filter(f => f.key !== 'user'),
                { key: 'user', label: `Usuario: ${newValue.full_name}` }
            ]);
        } else {
            setActiveFilters(prev => prev.filter(f => f.key !== 'user'));
        }
    };

    const handleRemoveFilter = (key) => {
        if (key === 'user') {
            setSelectedUser(null);
            setFilters(prev => ({
                ...prev,
                employeeId: '',
                fullName: ''
            }));
        } else {
            setFilters(prev => ({
                ...prev,
                [key]: ''
            }));
        }
        setActiveFilters(prev => prev.filter(f => f.key !== key));
    };

    const handlePreview = async () => {
        setLoading(true);
        setError(null);
        try {
            // Primero verificamos si hay registros
            const hasRecords = await accessService.checkRecords({
                start_date: filters.start,
                end_date: filters.end,
                employee_id: filters.employeeId,
                full_name: filters.fullName
            });

            if (!hasRecords) {
                setSnackbar({
                    open: true,
                    message: selectedUser
                        ? `${selectedUser.full_name} no tiene registros de acceso${filters.start ? ' en el rango de fechas seleccionado' : ''}`
                        : 'No hay registros para las fechas seleccionadas',
                    severity: 'warning'
                });
                return;
            }

            // Solo si hay registros, procedemos a obtener el PDF
            const blob = await accessService.getReportPreview({
                start_date: filters.start,
                end_date: filters.end,
                employee_id: filters.employeeId,
                full_name: filters.fullName
            });

            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
            setPreviewOpen(true);
        } catch (err) {
            setError('Error al cargar la previsualización del PDF');
        } finally {
            setLoading(false);
        }
    };

    // Función para cerrar el Snackbar
    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({
            ...prev,
            open: false
        }));
    };

    // Función auxiliar para verificar si se puede realizar la acción
    const canPerformAction = () => {
        // Si hay usuario seleccionado, permitir la acción sin importar las fechas
        if (selectedUser) return true;
        // Si no hay usuario, requerir ambas fechas
        return filters.start && filters.end;
    };

    const handleExport = async () => {
        setLoading(true);
        setError(null);
        try {
            // Primero verificamos si hay registros
            const hasRecords = await accessService.checkRecords({
                start_date: filters.start,
                end_date: filters.end,
                employee_id: filters.employeeId,
                full_name: filters.fullName
            });

            if (!hasRecords) {
                setSnackbar({
                    open: true,
                    message: selectedUser
                        ? `${selectedUser.full_name} no tiene registros de acceso${filters.start ? ' en el rango de fechas seleccionado' : ''}`
                        : 'No hay registros para las fechas seleccionadas',
                    severity: 'warning'
                });
                return;
            }

            // Solo si hay registros, procedemos con la exportación
            await accessService.exportPdf({
                start_date: filters.start,
                end_date: filters.end,
                employee_id: filters.employeeId,
                full_name: filters.fullName
            });
        } catch (err) {
            setError('Error al exportar el PDF');
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

    const handleClearAll = () => {
        setFilters({
            start: '',
            end: '',
            employeeId: '',
            fullName: ''
        });
        setSelectedUser(null);
        setActiveFilters([]);
    };

    return (
        // <Container maxWidth="lg" sx={{ py: 3 }}>
        <Container
            maxWidth="lg"
            sx={{
                py: 3,
                minHeight: 'calc(100vh - 64px)', // 64px es el alto típico del AppBar
                backgroundColor: 'background.default', // Asegura que use el color de fondo del tema
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {loading && (
                <LinearProgress
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: theme.zIndex.drawer + 1
                    }}
                />
            )}

            {/*<Paper elevation={0} sx={{ p: 3 }}>*/}
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    flex: 1, // Esto hará que el Paper tome todo el espacio vertical disponible
                    backgroundColor: 'background.paper'
                }}
            >
                <Stack spacing={3}>
                    {/* Título */}
                    <Typography variant="h5" color="primary">
                        Reportes de Acceso
                    </Typography>

                    {/* Mensajes de error */}
                    {error && (
                        <Alert
                            severity="error"
                            onClose={() => setError(null)}
                            action={
                                <Button color="inherit" size="small">
                                    REINTENTAR
                                </Button>
                            }
                        >
                            {error}
                        </Alert>
                    )}

                    {/* Filtros */}
                    <Stack spacing={2}>
                        <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            spacing={2}
                            alignItems="flex-start"
                            sx={{
                                '& > :nth-of-type(1), & > :nth-of-type(2)': { // Los dos campos de fecha
                                    width: '380px !important' // Reducimos el ancho de los campos de fecha
                                },
                                '& > :nth-of-type(3)': { // El Autocomplete
                                    flex: '1 1 auto', // Hará que tome el espacio restante
                                    minWidth: '300px' // Aseguramos un ancho mínimo
                                }
                            }}
                        >
                            {/* TextField Fecha Inicio */}
                            <TextField
                                id="date-start"
                                type="date"
                                label="Fecha Inicio"
                                value={filters.start}
                                onChange={handleDateChange('start')}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    endAdornment: ( // Movemos el ícono al final
                                        <InputAdornment position="end">
                                            {filters.start && (
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleDateChange('start')({ target: { value: '' } })}
                                                >
                                                    <ClearIcon />
                                                </IconButton>
                                            )}
                                            <IconButton
                                                size="small"
                                                onClick={() => {
                                                    document.getElementById('date-start').showPicker();
                                                }}
                                            >
                                                <CalendarMonth color="action" />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />

                            {/* TextField Fecha Fin */}
                            <TextField
                                id="date-end"
                                type="date"
                                label="Fecha Fin"
                                value={filters.end}
                                onChange={handleDateChange('end')}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    endAdornment: ( // Movemos el ícono al final
                                        <InputAdornment position="end">
                                            {filters.end && (
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleDateChange('end')({ target: { value: '' } })}
                                                >
                                                    <ClearIcon />
                                                </IconButton>
                                            )}
                                            <IconButton
                                                size="small"
                                                onClick={() => {
                                                    document.getElementById('date-end').showPicker();
                                                }}
                                            >
                                                <CalendarMonth color="action" />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />

                            {/* Autocomplete búsqueda de usuario (ahora más amplio) */}
                            <Autocomplete
                                fullWidth
                                options={allUsers}
                                value={selectedUser}
                                onChange={handleUserChange}
                                getOptionLabel={(option) =>
                                    `${option.full_name} (${option.employee_id})`
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Buscar usuario"
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                )}
                            />

                        </Stack>

                        {/* Chips de filtros activos */}
                        {activeFilters.length > 0 && (
                            <Stack direction="row" spacing={1} flexWrap="wrap">
                                {activeFilters.map((filter) => (
                                    <Chip
                                        key={filter.key}
                                        label={filter.label}
                                        onDelete={() => handleRemoveFilter(filter.key)}
                                        size="small"
                                    />
                                ))}
                            </Stack>
                        )}
                    </Stack>

                    {/* Botones de acción */}
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <LoadingButton
                            startIcon={<ClearAll />}
                            variant="text"
                            onClick={handleClearAll}
                            disabled={!activeFilters.length}
                            color="inherit"
                        >
                            Limpiar filtros
                        </LoadingButton>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <LoadingButton
                                loading={loading}
                                loadingPosition="start"
                                startIcon={<RemoveRedEye />}
                                variant="outlined"
                                onClick={handlePreview}
                                disabled={!canPerformAction()}
                            >
                                Previsualizar PDF
                            </LoadingButton>

                            <LoadingButton
                                loading={loading}
                                loadingPosition="start"
                                startIcon={<PictureAsPdf />}
                                variant="contained"
                                onClick={handleExport}
                                disabled={!canPerformAction()}
                            >
                                Exportar PDF
                            </LoadingButton>

                        </Stack>
                    </Stack>
                </Stack>
            </Paper>

            {/* Diálogo de previsualización */}
            <Dialog
                open={previewOpen}
                onClose={handleClose}
                fullScreen={isMobile}
                maxWidth="lg"
                fullWidth
                PaperProps={{
                    sx: {
                        m: isMobile ? 0 : 1,
                        maxHeight: '90vh',
                        borderRadius: isMobile ? 0 : 2
                    }
                }}
            >
                <DialogTitle>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography variant="h6">
                            Previsualización de Reporte
                        </Typography>
                        <IconButton
                            edge="end"
                            aria-label="cerrar"
                            onClick={handleClose}
                        >
                            <Close />
                        </IconButton>
                    </Stack>
                </DialogTitle>

                <DialogContent>
                    {pdfUrl ? (
                        <Box
                            component="iframe"
                            src={`${pdfUrl}#toolbar=0`}
                            sx={{
                                width: '100%',
                                height: '75vh',
                                border: 'none'
                            }}
                            title="PDF Preview"
                        />
                    ) : (
                        <Stack
                            alignItems="center"
                            justifyContent="center"
                            spacing={2}
                            sx={{ py: 8 }}
                        >
                            <Description
                                sx={{ fontSize: 60, color: 'text.secondary' }}
                            />
                            <Typography color="text.secondary">
                                No hay PDF para previsualizar
                            </Typography>
                        </Stack>
                    )}
                </DialogContent>

                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={handleClose}>
                        Cerrar
                    </Button>
                    <LoadingButton
                        loading={loading}
                        variant="contained"
                        onClick={handleExport}
                        disabled={!canPerformAction()}
                    >
                        Exportar PDF
                    </LoadingButton>
                </DialogActions>
            </Dialog>
            {/* Snackbar para mensajes */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%', '&.MuiAlert-standardWarning': {
                            backgroundColor: theme.palette.warning.light,
                            color: theme.palette.warning.contrastText}}}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};



