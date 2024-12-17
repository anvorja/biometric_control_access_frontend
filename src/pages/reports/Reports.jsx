import { useState } from 'react';
import { Card, Grid, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { accessService } from '../../services/accessService';

export const Reports = () => {
    const [dateRange, setDateRange] = useState({ start: '', end: '' });

    const handleExport = async () => {
        try {
            await accessService.exportPdf(dateRange.start, dateRange.end);
        } catch (error) {
            console.error('Error exporting:', error);
        }
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Card sx={{ p: 3 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Fecha Inicio"
                                InputLabelProps={{ shrink: true }}
                                value={dateRange.start}
                                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Fecha Fin"
                                InputLabelProps={{ shrink: true }}
                                value={dateRange.end}
                                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Button variant="contained" onClick={handleExport}>
                                Exportar PDF
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    );
};