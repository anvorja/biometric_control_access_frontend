import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { DatePicker } from '@mui/x-date-pickers';

export const AccessFilters = ({ onFilter }) => {
    const [filters, setFilters] = useState({
        startDate: null,
        endDate: null,
        userId: '',
        accessType: '',
        deviceId: '',
        status: ''
    });

    const handleFilter = () => {
        onFilter(filters);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
                mb: 3
            }}
        >
            <Box sx={{ width: { xs: '100%', sm: '48%', md: '23%' } }}>
                <DatePicker
                    label="Fecha Inicio"
                    value={filters.startDate}
                    onChange={(date) => setFilters({...filters, startDate: date})}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                />
            </Box>
            <Box sx={{ width: { xs: '100%', sm: '48%', md: '23%' } }}>
                <DatePicker
                    label="Fecha Fin"
                    value={filters.endDate}
                    onChange={(date) => setFilters({...filters, endDate: date})}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                />
            </Box>
            <Box sx={{ width: '100%' }}>
                <Button
                    variant="contained"
                    onClick={handleFilter}
                    fullWidth
                >
                    Aplicar Filtros
                </Button>
            </Box>
        </Box>
    );
};

// Añadimos PropTypes
AccessFilters.propTypes = {
    onFilter: PropTypes.func.isRequired,
};