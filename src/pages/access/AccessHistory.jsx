import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { accessService } from '../../services/accessService';

export const AccessHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const data = await accessService.getHistory();
            setHistory(data);
        };
        fetchHistory();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Usuario</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Estado</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {history.map((record) => (
                        <TableRow key={record.id}>
                            <TableCell>{new Date(record.timestamp).toLocaleString()}</TableCell>
                            <TableCell>{record.user?.full_name}</TableCell>
                            <TableCell>{record.access_type}</TableCell>
                            <TableCell>{record.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};