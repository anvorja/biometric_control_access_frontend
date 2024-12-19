import { useState } from 'react';
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
    InputAdornment
} from '@mui/material';
import { CalendarMonth, Close } from '@mui/icons-material';
import { accessService } from '../../services/accessService';

export const Reports = () => {
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

    const handleFilterChange = (field) => (event) => {
        setFilters({
            ...filters,
            [field]: event.target.value
        });
    };

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

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Card sx={{ p: 3 }}>
                    <Grid container spacing={2} alignItems="center">
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
                                            <CalendarMonth />
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
                                            <CalendarMonth />
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
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                label="Nombre Completo"
                                value={filters.fullName}
                                onChange={handleFilterChange('fullName')}
                            />
                        </Grid>
                        {error && (
                            <Grid item xs={12}>
                                <Alert severity="error">{error}</Alert>
                            </Grid>
                        )}
                        <Grid item xs={12} container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={handlePreview}
                                    disabled={loading}
                                    sx={{ height: '56px' }}
                                >
                                    {loading ? (
                                        <CircularProgress size={24} />
                                    ) : (
                                        'Previsualizar PDF'
                                    )}
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={handleExport}
                                    disabled={loading}
                                    sx={{ height: '56px' }}
                                >
                                    {loading ? (
                                        <CircularProgress size={24} />
                                    ) : (
                                        'Exportar PDF'
                                    )}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>

            <Dialog
                open={previewOpen}
                onClose={handleClose}
                maxWidth="lg"
                fullWidth
            >
                <DialogContent sx={{ position: 'relative', minHeight: '80vh' }}>
                    <IconButton
                        onClick={handleClose}
                        sx={{ position: 'absolute', right: 8, top: 8, zIndex: 1 }}
                    >
                        <Close />
                    </IconButton>
                    {pdfUrl && (
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
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
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
                            <CircularProgress />
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
                        {loading ? <CircularProgress size={24} /> : 'Exportar'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};