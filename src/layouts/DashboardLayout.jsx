import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, Drawer, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Sidebar } from '../components/layout/Sidebar';
import {Header} from "../components/layout/Header.jsx";

const drawerWidth = 240;

export const DashboardLayout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <Box sx={{ display: 'flex' }}>
            <Header />
            <AppBar position="fixed" sx={{ ml: { sm: `${drawerWidth}px` } }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <Sidebar />
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    <Sidebar />
                </Drawer>
            </Box>

            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};
