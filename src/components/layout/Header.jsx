import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { LogoutOutlined } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

export const Header = () => {
    const { user, logout } = useAuth();

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Control de Acceso Biométrico
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography>{user?.full_name}</Typography>
                    <IconButton color="inherit" onClick={logout}>
                        <LogoutOutlined />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};