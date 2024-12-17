import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Login } from './pages/auth/Login';
import { DashboardLayout } from './layouts/DashboardLayout';
import { UserList } from './pages/users/UserList';
import { UserForm } from './pages/users/UserForm';
import { theme } from './config/theme';
import {AccessControl} from "./pages/access/AccessControl.jsx";
import {AccessHistory} from "./pages/access/AccessHistory.jsx";
import {Reports} from "./pages/reports/Reports.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import {PrivateRoute} from "./components/PrivateRoute.jsx";
import {SnackbarProvider} from "./components/common/Snackbar.jsx";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <AuthProvider>
                    <SnackbarProvider>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/dashboard" element={
                                <PrivateRoute>
                                    <DashboardLayout />
                                </PrivateRoute>
                            }>
                                <Route index element={<Navigate to="users" replace />} />
                                <Route path="users" element={<UserList />} />
                                <Route path="users/new" element={<UserForm />} />
                                <Route path="access" element={<AccessControl />} />
                                <Route path="access/history" element={<AccessHistory />} />
                                <Route path="reports" element={<Reports />} />
                            </Route>
                            <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        </Routes>
                    </SnackbarProvider>
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
