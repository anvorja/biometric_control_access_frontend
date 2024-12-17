import { Snackbar, Alert } from '@mui/material';
import { createContext, useContext, useState } from 'react';

const SnackbarContext = createContext(null);

export const SnackbarProvider = ({ children }) => {
    const [msg, setMsg] = useState({ text: '', type: 'success', open: false });

    const showSnackbar = (text, type = 'success') => {
        setMsg({ text, type, open: true });
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Snackbar open={msg.open} autoHideDuration={3000} onClose={() => setMsg(prev => ({ ...prev, open: false }))}>
                <Alert severity={msg.type}>{msg.text}</Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => useContext(SnackbarContext);