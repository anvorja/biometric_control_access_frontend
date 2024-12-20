// // initial design
// import { useState, useEffect } from 'react';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Button,
//     Chip
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { userService } from '../../services/userService';
// import CancelIcon from '@mui/icons-material/Cancel';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import { Edit as EditIcon, Fingerprint as FingerprintIcon } from '@mui/icons-material';
// import { Add as AddIcon } from '@mui/icons-material';
// import { Link } from 'react-router-dom';
//
// export const UserList = () => {
//     const [users, setUsers] = useState([]);
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const data = await userService.getUsers();
//                 //console.log('Users data:', data);
//                 setUsers(data);
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//             }
//         };
//         fetchUsers();
//     }, []);
//
//     const handleEdit = (userId) => {
//         navigate(`/dashboard/users/edit/${userId}`);
//     };
//
//     const handleFingerprintRegistration = (userId) => {
//         navigate(`/dashboard/users/fingerprint/${userId}`);
//     };
//
//     return (
//         <>
//             <Button
//                 component={Link}
//                 to="/dashboard/users/new"
//                 variant="contained"
//                 startIcon={<AddIcon />}
//                 sx={{ mb: 2 }}
//             >
//                 Nuevo Usuario
//             </Button>
//             <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>ID</TableCell>
//                             <TableCell>Nombre</TableCell>
//                             <TableCell>Email</TableCell>
//                             <TableCell>Estado</TableCell>
//                             <TableCell>Huella</TableCell>
//                             <TableCell>Acciones</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {users.map((user) => (
//                             <TableRow key={user.id}>
//                                 <TableCell>{user.id}</TableCell>
//                                 <TableCell>{user.full_name}</TableCell>
//                                 <TableCell>{user.email}</TableCell>
//                                 <TableCell>
//                                     <Chip
//                                         label={user.is_active ? 'Activo' : 'Inactivo'}
//                                         size="small"
//                                         color={user.is_active ? "success" : "error"}
//                                         sx={{
//                                             backgroundColor: user.is_active ? '#e8f5e9' : '#ffebee',
//                                             color: user.is_active ? '#2e7d32' : '#d32f2f'
//                                         }}
//                                     />
//                                 </TableCell>
//                                 <TableCell>
//                                     {user.fingerprint_template ? (
//                                         <Chip
//                                             icon={<CheckCircleIcon color="success" />}
//                                             label="Registrada"
//                                             variant="outlined"
//                                             color="success"
//                                         />
//                                     ) : (
//                                         <Chip
//                                             icon={<CancelIcon color="disabled" />}
//                                             label="Sin registro"
//                                             variant="outlined"
//                                             color="default"
//                                         />
//                                     )}
//                                 </TableCell>
//                                 <TableCell>
//                                     <Button
//                                         variant="outlined"
//                                         size="small"
//                                         startIcon={<EditIcon />}
//                                         onClick={() => handleEdit(user.id)}
//                                         sx={{ mr: 1 }}
//                                     >
//                                         Editar
//                                     </Button>
//                                     <Button
//                                         variant="outlined"
//                                         size="small"
//                                         startIcon={<FingerprintIcon />}
//                                         onClick={() => handleFingerprintRegistration(user.id)}
//                                         color={user.fingerprint_template ? "primary" : "success"}
//                                     >
//                                         {user.fingerprint_template ? 'Modificar Huella' : 'Registrar Huella'}
//                                     </Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </>
//     );
// };



// // diseño nn1
// import { useState, useEffect } from 'react';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Button,
//     Chip,
//     Card,
//     TextField,
//     InputAdornment,
//     Box,
//     Typography,
//     Divider,
//     TablePagination,
//     useTheme
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { userService } from '../../services/userService';
// import {
//     Cancel as CancelIcon,
//     CheckCircle as CheckCircleIcon,
//     Edit as EditIcon,
//     Fingerprint as FingerprintIcon,
//     Add as AddIcon,
//     Search as SearchIcon
// } from '@mui/icons-material';
// import { Link } from 'react-router-dom';
//
// export const UserList = () => {
//     const theme = useTheme();
//     const navigate = useNavigate();
//     const [users, setUsers] = useState([]);
//     const [filteredUsers, setFilteredUsers] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//
//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const data = await userService.getUsers();
//                 setUsers(data);
//                 setFilteredUsers(data);
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//             }
//         };
//         fetchUsers();
//     }, []);
//
//     useEffect(() => {
//         const filtered = users.filter(user => {
//             const searchLower = searchTerm.toLowerCase();
//             return (
//                 user.full_name?.toLowerCase().includes(searchLower) ||
//                 user.id?.toString().includes(searchTerm)
//             );
//         });
//         setFilteredUsers(filtered);
//         setPage(0); // Reset to first page when filtering
//     }, [searchTerm, users]);
//
//     const handleEdit = (userId) => {
//         navigate(`/dashboard/users/edit/${userId}`);
//     };
//
//     const handleFingerprintRegistration = (userId) => {
//         navigate(`/dashboard/users/fingerprint/${userId}`);
//     };
//
//     return (
//         <Box sx={{ maxWidth: '100%', mb: 4 }}>
//             <Card sx={{ mb: 3, p: 3 }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//                     <Typography variant="h6" color="primary">
//                         Gestión de Usuarios
//                     </Typography>
//                     <Button
//                         component={Link}
//                         to="/dashboard/users/new"
//                         variant="contained"
//                         startIcon={<AddIcon />}
//                     >
//                         Nuevo Usuario
//                     </Button>
//                 </Box>
//                 <TextField
//                     fullWidth
//                     variant="outlined"
//                     placeholder="Buscar por nombre o ID de empleado..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     InputProps={{
//                         startAdornment: (
//                             <InputAdornment position="start">
//                                 <SearchIcon color="action" />
//                             </InputAdornment>
//                         ),
//                     }}
//                     sx={{ mb: 2 }}
//                 />
//             </Card>
//
//             <Card>
//                 <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <Typography variant="h6" color="primary">
//                         Lista de Usuarios
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary">
//                         Total de usuarios: {filteredUsers.length}
//                     </Typography>
//                 </Box>
//                 <Divider />
//                 <TableContainer>
//                     <Table>
//                         <TableHead>
//                             <TableRow sx={{ backgroundColor: theme.palette.grey[50] }}>
//                                 <TableCell>ID</TableCell>
//                                 <TableCell>Nombre</TableCell>
//                                 <TableCell>Email</TableCell>
//                                 <TableCell align="center">Estado</TableCell>
//                                 <TableCell align="center">Huella</TableCell>
//                                 <TableCell align="right">Acciones</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {filteredUsers
//                                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                 .map((user) => (
//                                     <TableRow
//                                         key={user.id}
//                                         hover
//                                         sx={{
//                                             '&:nth-of-type(odd)': {
//                                                 backgroundColor: theme.palette.grey[50]
//                                             }
//                                         }}
//                                     >
//                                         <TableCell>{user.id}</TableCell>
//                                         <TableCell>
//                                             <Typography variant="body2">
//                                                 {user.full_name}
//                                             </Typography>
//                                         </TableCell>
//                                         <TableCell>{user.email}</TableCell>
//                                         <TableCell align="center">
//                                             <Chip
//                                                 label={user.is_active ? 'Activo' : 'Inactivo'}
//                                                 size="small"
//                                                 sx={{
//                                                     backgroundColor: user.is_active ? '#e8f5e9' : '#ffebee',
//                                                     color: user.is_active ? '#2e7d32' : '#d32f2f',
//                                                     minWidth: '80px'
//                                                 }}
//                                             />
//                                         </TableCell>
//                                         <TableCell align="center">
//                                             {user.fingerprint_template ? (
//                                                 <Chip
//                                                     icon={<CheckCircleIcon />}
//                                                     label="Registrada"
//                                                     variant="outlined"
//                                                     color="success"
//                                                     sx={{ minWidth: '120px' }}
//                                                 />
//                                             ) : (
//                                                 <Chip
//                                                     icon={<CancelIcon />}
//                                                     label="Sin registro"
//                                                     variant="outlined"
//                                                     color="default"
//                                                     sx={{ minWidth: '120px' }}
//                                                 />
//                                             )}
//                                         </TableCell>
//                                         <TableCell align="right">
//                                             <Button
//                                                 variant="outlined"
//                                                 size="small"
//                                                 startIcon={<EditIcon />}
//                                                 onClick={() => handleEdit(user.id)}
//                                                 sx={{ mr: 1 }}
//                                             >
//                                                 Editar
//                                             </Button>
//                                             <Button
//                                                 variant="outlined"
//                                                 size="small"
//                                                 startIcon={<FingerprintIcon />}
//                                                 onClick={() => handleFingerprintRegistration(user.id)}
//                                                 color={user.fingerprint_template ? "primary" : "success"}
//                                             >
//                                                 {user.fingerprint_template ? 'Modificar Huella' : 'Registrar Huella'}
//                                             </Button>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//                 <TablePagination
//                     component="div"
//                     count={filteredUsers.length}
//                     page={page}
//                     onPageChange={(event, newPage) => setPage(newPage)}
//                     rowsPerPage={rowsPerPage}
//                     onRowsPerPageChange={(event) => {
//                         setRowsPerPage(parseInt(event.target.value, 10));
//                         setPage(0);
//                     }}
//                     labelRowsPerPage="Filas por página"
//                 />
//             </Card>
//         </Box>
//     );
// };


// // MISTRAL v1
// import { useState, useEffect } from 'react';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Button,
//     Chip,
//     Card,
//     TextField,
//     InputAdornment,
//     Box,
//     Typography,
//     TablePagination,
//     useTheme,
//     Tooltip,
//     Paper
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { userService } from '../../services/userService';
// import {
//     Cancel as CancelIcon,
//     CheckCircle as CheckCircleIcon,
//     Edit as EditIcon,
//     Fingerprint as FingerprintIcon,
//     Add as AddIcon,
//     Search as SearchIcon
// } from '@mui/icons-material';
// import { Link } from 'react-router-dom';
//
// export const UserList = () => {
//     const theme = useTheme();
//     const navigate = useNavigate();
//     const [users, setUsers] = useState([]);
//     const [filteredUsers, setFilteredUsers] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//
//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const data = await userService.getUsers();
//                 setUsers(data);
//                 setFilteredUsers(data);
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//             }
//         };
//         fetchUsers();
//     }, []);
//
//     useEffect(() => {
//         const filtered = users.filter(user => {
//             const searchLower = searchTerm.toLowerCase();
//             return (
//                 user.full_name?.toLowerCase().includes(searchLower) ||
//                 user.id?.toString().includes(searchTerm)
//             );
//         });
//         setFilteredUsers(filtered);
//         setPage(0);
//     }, [searchTerm, users]);
//
//     const handleEdit = (userId) => {
//         navigate(`/dashboard/users/edit/${userId}`);
//     };
//
//     const handleFingerprintRegistration = (userId) => {
//         navigate(`/dashboard/users/fingerprint/${userId}`);
//     };
//
//     return (
//         <Box sx={{ maxWidth: '1200px', margin: '0 auto', p: 3 }}>
//             <Card>
//                 {/* Header Section */}
//                 <Box sx={{
//                     p: 3,
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     borderBottom: `1px solid ${theme.palette.divider}`
//                 }}>
//                     <Typography variant="h6" color="primary">
//                         Gestión de Usuarios
//                     </Typography>
//                     <Button
//                         component={Link}
//                         to="/dashboard/users/new"
//                         variant="contained"
//                         startIcon={<AddIcon />}
//                         size="large"
//                     >
//                         Nuevo Usuario
//                     </Button>
//                 </Box>
//
//                 {/* Search Section */}
//                 <Box sx={{ px: 3, py: 2, maxWidth: '600px', mx: 'auto' }}>
//                     <TextField
//                         fullWidth
//                         size="medium"
//                         variant="outlined"
//                         placeholder="Buscar por nombre o ID de empleado..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <SearchIcon color="action" />
//                                 </InputAdornment>
//                             ),
//                         }}
//                     />
//                 </Box>
//
//                 {/* Users List Section */}
//                 <Box sx={{ p: 3 }}>
//                     <Box sx={{
//                         mb: 2,
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                         alignItems: 'center'
//                     }}>
//                         <Typography variant="subtitle1" color="primary">
//                             Lista de Usuarios
//                         </Typography>
//                         <Typography variant="body2" color="textSecondary">
//                             Total de usuarios: {filteredUsers.length}
//                         </Typography>
//                     </Box>
//
//                     <TableContainer component={Paper}>
//                         <Table>
//                             <TableHead>
//                                 <TableRow sx={{
//                                     backgroundColor: theme.palette.grey[50],
//                                     '& th': { fontWeight: 'bold' }
//                                 }}>
//                                     <TableCell width="8%">ID</TableCell>
//                                     <TableCell width="20%">Nombre</TableCell>
//                                     <TableCell width="25%">Email</TableCell>
//                                     <TableCell width="12%" align="center">Estado</TableCell>
//                                     <TableCell width="15%" align="center">Huella</TableCell>
//                                     <TableCell width="20%" align="right">Acciones</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {filteredUsers
//                                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                     .map((user) => (
//                                         <TableRow
//                                             key={user.id}
//                                             hover
//                                             sx={{
//                                                 '&:nth-of-type(odd)': {
//                                                     backgroundColor: theme.palette.grey[50]
//                                                 }
//                                             }}
//                                         >
//                                             <TableCell>{user.id}</TableCell>
//                                             <TableCell>{user.full_name}</TableCell>
//                                             <TableCell>{user.email}</TableCell>
//                                             <TableCell align="center">
//                                                 <Chip
//                                                     label={user.is_active ? 'Activo' : 'Inactivo'}
//                                                     size="small"
//                                                     sx={{
//                                                         minWidth: '90px',
//                                                         backgroundColor: user.is_active ? '#e8f5e9' : '#ffebee',
//                                                         color: user.is_active ? '#2e7d32' : '#d32f2f'
//                                                     }}
//                                                 />
//                                             </TableCell>
//                                             <TableCell align="center">
//                                                 {user.fingerprint_template ? (
//                                                     <Chip
//                                                         icon={<CheckCircleIcon fontSize="small" />}
//                                                         label="Registrada"
//                                                         size="small"
//                                                         variant="outlined"
//                                                         color="success"
//                                                         sx={{ minWidth: '120px' }}
//                                                     />
//                                                 ) : (
//                                                     <Chip
//                                                         icon={<CancelIcon fontSize="small" />}
//                                                         label="Sin registro"
//                                                         size="small"
//                                                         variant="outlined"
//                                                         color="default"
//                                                         sx={{ minWidth: '120px' }}
//                                                     />
//                                                 )}
//                                             </TableCell>
//                                             <TableCell align="right">
//                                                 <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//                                                     <Tooltip title="Editar usuario">
//                                                         <Button
//                                                             variant="outlined"
//                                                             size="small"
//                                                             startIcon={<EditIcon />}
//                                                             onClick={() => handleEdit(user.id)}
//                                                             sx={{ mr: 1, minWidth: '120px' }}
//                                                         >
//                                                             Editar
//                                                         </Button>
//                                                     </Tooltip>
//                                                     <Tooltip title={user.fingerprint_template ? "Modificar Huella" : "Registrar Huella"}>
//                                                         <Button
//                                                             variant="outlined"
//                                                             size="small"
//                                                             startIcon={<FingerprintIcon />}
//                                                             onClick={() => handleFingerprintRegistration(user.id)}
//                                                             color={user.fingerprint_template ? "primary" : "success"}
//                                                             sx={{ minWidth: '120px' }}
//                                                         >
//                                                             {user.fingerprint_template ? 'Modificar Huella' : 'Registrar Huella'}
//                                                         </Button>
//                                                     </Tooltip>
//                                                 </Box>
//                                             </TableCell>
//                                         </TableRow>
//                                     ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//
//                     <TablePagination
//                         component="div"
//                         count={filteredUsers.length}
//                         page={page}
//                         onPageChange={(event, newPage) => setPage(newPage)}
//                         rowsPerPage={rowsPerPage}
//                         onRowsPerPageChange={(event) => {
//                             setRowsPerPage(parseInt(event.target.value, 10));
//                             setPage(0);
//                         }}
//                         labelRowsPerPage="Filas por página"
//                     />
//                 </Box>
//             </Card>
//         </Box>
//     );
// };


//// MISTRAL V2
// import { useState, useEffect } from 'react';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Button,
//     Chip,
//     Card,
//     TextField,
//     InputAdornment,
//     Box,
//     Typography,
//     TablePagination,
//     useTheme,
//     Tooltip,
//     Paper,
//     Grid
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { userService } from '../../services/userService';
// import {
//     Cancel as CancelIcon,
//     CheckCircle as CheckCircleIcon,
//     Edit as EditIcon,
//     Fingerprint as FingerprintIcon,
//     Add as AddIcon,
//     Search as SearchIcon
// } from '@mui/icons-material';
// import { Link } from 'react-router-dom';
//
// export const UserList = () => {
//     const theme = useTheme();
//     const navigate = useNavigate();
//     const [users, setUsers] = useState([]);
//     const [filteredUsers, setFilteredUsers] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//
//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const data = await userService.getUsers();
//                 setUsers(data);
//                 setFilteredUsers(data);
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//             }
//         };
//         fetchUsers();
//     }, []);
//
//     useEffect(() => {
//         const filtered = users.filter(user => {
//             const searchLower = searchTerm.toLowerCase();
//             return (
//                 user.full_name?.toLowerCase().includes(searchLower) ||
//                 user.id?.toString().includes(searchTerm)
//             );
//         });
//         setFilteredUsers(filtered);
//         setPage(0);
//     }, [searchTerm, users]);
//
//     const handleEdit = (userId) => {
//         navigate(`/dashboard/users/edit/${userId}`);
//     };
//
//     const handleFingerprintRegistration = (userId) => {
//         navigate(`/dashboard/users/fingerprint/${userId}`);
//     };
//
//     return (
//         <Box sx={{ maxWidth: '1200px', margin: '0 auto', p: 3 }}>
//             <Card>
//                 {/* Header Section */}
//                 <Grid container spacing={2} alignItems="center" sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
//                     <Grid item xs={12} md={6}>
//                         <Typography variant="h6" color="primary">
//                             Gestión de Usuarios
//                         </Typography>
//                     </Grid>
//                     <Grid item xs={12} md={6} display="flex" justifyContent="flex-end">
//                         <Button
//                             component={Link}
//                             to="/dashboard/users/new"
//                             variant="contained"
//                             startIcon={<AddIcon />}
//                             size="large"
//                         >
//                             Nuevo Usuario
//                         </Button>
//                     </Grid>
//                 </Grid>
//
//                 {/* Search Section */}
//                 <Box sx={{ px: 3, py: 2, maxWidth: '600px', mx: 'auto' }}>
//                     <TextField
//                         fullWidth
//                         size="medium"
//                         variant="outlined"
//                         placeholder="Buscar por nombre o ID de empleado..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <SearchIcon color="action" />
//                                 </InputAdornment>
//                             ),
//                         }}
//                     />
//                 </Box>
//
//                 {/* Users List Section */}
//                 <Box sx={{ p: 3 }}>
//                     <Box sx={{
//                         mb: 2,
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                         alignItems: 'center'
//                     }}>
//                         <Typography variant="subtitle1" color="primary">
//                             Lista de Usuarios
//                         </Typography>
//                         <Typography variant="body2" color="textSecondary">
//                             Total de usuarios: {filteredUsers.length}
//                         </Typography>
//                     </Box>
//
//                     <TableContainer component={Paper}>
//                         <Table>
//                             <TableHead>
//                                 <TableRow sx={{
//                                     backgroundColor: theme.palette.grey[50],
//                                     '& th': { fontWeight: 'bold' }
//                                 }}>
//                                     <TableCell width="8%">ID</TableCell>
//                                     <TableCell width="20%">Nombre</TableCell>
//                                     <TableCell width="25%">Email</TableCell>
//                                     <TableCell width="12%" align="center">Estado</TableCell>
//                                     <TableCell width="15%" align="center">Huella</TableCell>
//                                     <TableCell width="20%" align="right">Acciones</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {filteredUsers
//                                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                     .map((user) => (
//                                         <TableRow
//                                             key={user.id}
//                                             hover
//                                             sx={{
//                                                 '&:nth-of-type(odd)': {
//                                                     backgroundColor: theme.palette.grey[50]
//                                                 }
//                                             }}
//                                         >
//                                             <TableCell>{user.id}</TableCell>
//                                             <TableCell>{user.full_name}</TableCell>
//                                             <TableCell>{user.email}</TableCell>
//                                             <TableCell align="center">
//                                                 <Chip
//                                                     label={user.is_active ? 'Activo' : 'Inactivo'}
//                                                     size="small"
//                                                     sx={{
//                                                         minWidth: '90px',
//                                                         backgroundColor: user.is_active ? '#e8f5e9' : '#ffebee',
//                                                         color: user.is_active ? '#2e7d32' : '#d32f2f'
//                                                     }}
//                                                 />
//                                             </TableCell>
//                                             <TableCell align="center">
//                                                 {user.fingerprint_template ? (
//                                                     <Chip
//                                                         icon={<CheckCircleIcon fontSize="small" />}
//                                                         label="Registrada"
//                                                         size="small"
//                                                         variant="outlined"
//                                                         color="success"
//                                                         sx={{ minWidth: '120px' }}
//                                                     />
//                                                 ) : (
//                                                     <Chip
//                                                         icon={<CancelIcon fontSize="small" />}
//                                                         label="Sin registro"
//                                                         size="small"
//                                                         variant="outlined"
//                                                         color="default"
//                                                         sx={{ minWidth: '120px' }}
//                                                     />
//                                                 )}
//                                             </TableCell>
//                                             <TableCell align="right">
//                                                 <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//                                                     <Tooltip title="Editar usuario">
//                                                         <Button
//                                                             variant="outlined"
//                                                             size="small"
//                                                             startIcon={<EditIcon />}
//                                                             onClick={() => handleEdit(user.id)}
//                                                             sx={{ mr: 1, minWidth: '120px' }}
//                                                         >
//                                                             Editar
//                                                         </Button>
//                                                     </Tooltip>
//                                                     <Tooltip title={user.fingerprint_template ? "Modificar Huella" : "Registrar Huella"}>
//                                                         <Button
//                                                             variant="outlined"
//                                                             size="small"
//                                                             startIcon={<FingerprintIcon />}
//                                                             onClick={() => handleFingerprintRegistration(user.id)}
//                                                             color={user.fingerprint_template ? "primary" : "success"}
//                                                             sx={{ minWidth: '120px' }}
//                                                         >
//                                                             {user.fingerprint_template ? 'Modificar Huella' : 'Registrar Huella'}
//                                                         </Button>
//                                                     </Tooltip>
//                                                 </Box>
//                                             </TableCell>
//                                         </TableRow>
//                                     ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//
//                     <TablePagination
//                         component="div"
//                         count={filteredUsers.length}
//                         page={page}
//                         onPageChange={(event, newPage) => setPage(newPage)}
//                         rowsPerPage={rowsPerPage}
//                         onRowsPerPageChange={(event) => {
//                             setRowsPerPage(parseInt(event.target.value, 10));
//                             setPage(0);
//                         }}
//                         labelRowsPerPage="Filas por página"
//                     />
//                 </Box>
//             </Card>
//         </Box>
//     );
// };


// // claude v1
// import { useState, useEffect } from 'react';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Button,
//     Chip,
//     Card,
//     TextField,
//     InputAdornment,
//     Box,
//     Typography,
//     TablePagination,
//     useTheme,
//     Paper,
//     Grid,
//     Divider,
//     IconButton,
//     Skeleton,
//     Alert,
//     useMediaQuery
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { userService } from '../../services/userService';
// import {
//     Cancel as CancelIcon,
//     CheckCircle as CheckCircleIcon,
//     Edit as EditIcon,
//     Fingerprint as FingerprintIcon,
//     Add as AddIcon,
//     Search as SearchIcon,
//     Refresh as RefreshIcon
// } from '@mui/icons-material';
// import { Link } from 'react-router-dom';
//
// export const UserList = () => {
//     const theme = useTheme();
//     const navigate = useNavigate();
//     const [users, setUsers] = useState([]);
//     const [filteredUsers, setFilteredUsers] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
//
//     const fetchUsers = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const data = await userService.getUsers();
//             setUsers(data);
//             setFilteredUsers(data);
//         } catch (error) {
//             setError('Error al cargar usuarios. Por favor, intente nuevamente.');
//             console.error('Error fetching users:', error);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     useEffect(() => {
//         fetchUsers();
//     }, []);
//
//     useEffect(() => {
//         const filtered = users.filter(user => {
//             const searchLower = searchTerm.toLowerCase();
//             return (
//                 user.full_name?.toLowerCase().includes(searchLower) ||
//                 user.id?.toString().includes(searchTerm) ||
//                 user.email?.toLowerCase().includes(searchLower)
//             );
//         });
//         setFilteredUsers(filtered);
//         setPage(0);
//     }, [searchTerm, users]);
//
//     const handleEdit = (userId) => {
//         navigate(`/dashboard/users/edit/${userId}`);
//     };
//
//     const handleFingerprintRegistration = (userId) => {
//         navigate(`/dashboard/users/fingerprint/${userId}`);
//     };
//
//     return (
//         <Box sx={{ maxWidth: '1200px', margin: '0 auto', p: { xs: 1, sm: 2, md: 3 } }}>
//             <Paper elevation={2}>
//                 {/* Header Section */}
//                 <Box sx={{
//                     p: { xs: 2, sm: 3 },
//                     display: 'flex',
//                     flexDirection: { xs: 'column', sm: 'row' },
//                     gap: 2,
//                     justifyContent: 'space-between',
//                     alignItems: { xs: 'stretch', sm: 'center' },
//                     borderBottom: `1px solid ${theme.palette.divider}`
//                 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                         <Typography variant="h5" color="primary" sx={{ fontWeight: 600 }}>
//                             Gestión de Usuarios
//                         </Typography>
//                         {!loading && (
//                             <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
//                                 ({filteredUsers.length} usuarios)
//                             </Typography>
//                         )}
//                     </Box>
//                     <Box sx={{ display: 'flex', gap: 1 }}>
//                         <IconButton
//                             color="primary"
//                             onClick={fetchUsers}
//                             disabled={loading}
//                             sx={{ alignSelf: 'center' }}
//                         >
//                             <RefreshIcon />
//                         </IconButton>
//                         <Button
//                             component={Link}
//                             to="/dashboard/users/new"
//                             variant="contained"
//                             startIcon={<AddIcon />}
//                             size={isSmallScreen ? "medium" : "large"}
//                             fullWidth={isSmallScreen}
//                         >
//                             Nuevo Usuario
//                         </Button>
//                     </Box>
//                 </Box>
//
//                 {/* Search Section */}
//                 <Box sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
//                     <TextField
//                         fullWidth
//                         size="medium"
//                         variant="outlined"
//                         placeholder="Buscar por nombre, ID o email..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <SearchIcon color="action" />
//                                 </InputAdornment>
//                             ),
//                         }}
//                     />
//                 </Box>
//
//                 {/* Error Message */}
//                 {error && (
//                     <Box sx={{ px: 3, pb: 2 }}>
//                         <Alert severity="error" onClose={() => setError(null)}>
//                             {error}
//                         </Alert>
//                     </Box>
//                 )}
//
//                 {/* Users List Section */}
//                 <Box sx={{ overflowX: 'auto' }}>
//                     <Table size={isSmallScreen ? "small" : "medium"}>
//                         <TableHead>
//                             <TableRow sx={{
//                                 backgroundColor: theme.palette.grey[50],
//                                 '& th': {
//                                     fontWeight: 600,
//                                     color: theme.palette.text.primary
//                                 }
//                             }}>
//                                 <TableCell>ID</TableCell>
//                                 <TableCell>Nombre</TableCell>
//                                 <TableCell>Email</TableCell>
//                                 <TableCell align="center">Estado</TableCell>
//                                 <TableCell align="center">Huella</TableCell>
//                                 <TableCell align="right">Acciones</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {loading ? (
//                                 Array.from(new Array(rowsPerPage)).map((_, index) => (
//                                     <TableRow key={index}>
//                                         <TableCell><Skeleton /></TableCell>
//                                         <TableCell><Skeleton /></TableCell>
//                                         <TableCell><Skeleton /></TableCell>
//                                         <TableCell><Skeleton /></TableCell>
//                                         <TableCell><Skeleton /></TableCell>
//                                         <TableCell><Skeleton /></TableCell>
//                                     </TableRow>
//                                 ))
//                             ) : filteredUsers.length === 0 ? (
//                                 <TableRow>
//                                     <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
//                                         <Typography variant="body1" color="text.secondary">
//                                             No se encontraron usuarios
//                                         </Typography>
//                                     </TableCell>
//                                 </TableRow>
//                             ) : (
//                                 filteredUsers
//                                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                     .map((user) => (
//                                         <TableRow
//                                             key={user.id}
//                                             hover
//                                             sx={{
//                                                 '&:nth-of-type(odd)': {
//                                                     backgroundColor: theme.palette.grey[50]
//                                                 },
//                                                 transition: 'background-color 0.2s'
//                                             }}
//                                         >
//                                             <TableCell>{user.id}</TableCell>
//                                             <TableCell>
//                                                 <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                                                     {user.full_name}
//                                                 </Typography>
//                                             </TableCell>
//                                             <TableCell>{user.email}</TableCell>
//                                             <TableCell align="center">
//                                                 <Chip
//                                                     label={user.is_active ? 'Activo' : 'Inactivo'}
//                                                     size="small"
//                                                     sx={{
//                                                         minWidth: '90px',
//                                                         backgroundColor: user.is_active
//                                                             ? theme.palette.success.light
//                                                             : theme.palette.error.light,
//                                                         color: user.is_active
//                                                             ? theme.palette.success.dark
//                                                             : theme.palette.error.dark,
//                                                         fontWeight: 500
//                                                     }}
//                                                 />
//                                             </TableCell>
//                                             <TableCell align="center">
//                                                 <Chip
//                                                     icon={user.fingerprint_template
//                                                         ? <CheckCircleIcon fontSize="small" />
//                                                         : <CancelIcon fontSize="small" />}
//                                                     label={user.fingerprint_template
//                                                         ? "Registrada"
//                                                         : "Sin registro"}
//                                                     size="small"
//                                                     variant="outlined"
//                                                     color={user.fingerprint_template
//                                                         ? "success"
//                                                         : "default"}
//                                                     sx={{
//                                                         minWidth: '120px',
//                                                         borderWidth: 2
//                                                     }}
//                                                 />
//                                             </TableCell>
//                                             <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
//                                                 <Button
//                                                     variant="outlined"
//                                                     size="small"
//                                                     startIcon={<EditIcon />}
//                                                     onClick={() => handleEdit(user.id)}
//                                                     sx={{ mr: 1 }}
//                                                 >
//                                                     Editar
//                                                 </Button>
//                                                 <Button
//                                                     variant="outlined"
//                                                     size="small"
//                                                     startIcon={<FingerprintIcon />}
//                                                     onClick={() => handleFingerprintRegistration(user.id)}
//                                                     color={user.fingerprint_template
//                                                         ? "primary"
//                                                         : "success"}
//                                                 >
//                                                     {user.fingerprint_template
//                                                         ? 'Modificar'
//                                                         : 'Registrar'}
//                                                 </Button>
//                                             </TableCell>
//                                         </TableRow>
//                                     ))
//                             )}
//                         </TableBody>
//                     </Table>
//                 </Box>
//
//                 <Divider />
//
//                 <TablePagination
//                     component="div"
//                     count={filteredUsers.length}
//                     page={page}
//                     onPageChange={(event, newPage) => setPage(newPage)}
//                     rowsPerPage={rowsPerPage}
//                     onRowsPerPageChange={(event) => {
//                         setRowsPerPage(parseInt(event.target.value, 10));
//                         setPage(0);
//                     }}
//                     labelRowsPerPage="Filas por página"
//                     labelDisplayedRows={({ from, to, count }) =>
//                         `${from}-${to} de ${count}`}
//                 />
//             </Paper>
//         </Box>
//     );
// };


// // PROMPT CLAUDE
// import { useState, useEffect } from 'react';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Button,
//     Chip,
//     Card,
//     TextField,
//     InputAdornment,
//     Box,
//     Typography,
//     TablePagination,
//     useTheme,
//     Tooltip
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { userService } from '../../services/userService';
// import {
//     Cancel as CancelIcon,
//     CheckCircle as CheckCircleIcon,
//     Edit as EditIcon,
//     Fingerprint as FingerprintIcon,
//     Add as AddIcon,
//     Search as SearchIcon
// } from '@mui/icons-material';
// import { Link } from 'react-router-dom';
//
// export const UserList = () => {
//     const theme = useTheme();
//     const navigate = useNavigate();
//     const [users, setUsers] = useState([]);
//     const [filteredUsers, setFilteredUsers] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//
//
//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const data = await userService.getUsers();
//                 setUsers(data);
//                 setFilteredUsers(data);
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//             }
//         };
//         fetchUsers();
//     }, []);
//
//     useEffect(() => {
//         const filtered = users.filter(user => {
//             const searchLower = searchTerm.toLowerCase();
//             return (
//                 user.full_name?.toLowerCase().includes(searchLower) ||
//                 user.id?.toString().includes(searchTerm)
//             );
//         });
//         setFilteredUsers(filtered);
//         setPage(0);
//     }, [searchTerm, users]);
//
//     const handleEdit = (userId) => {
//         navigate(`/dashboard/users/edit/${userId}`);
//     };
//
//     const handleFingerprintRegistration = (userId) => {
//         navigate(`/dashboard/users/fingerprint/${userId}`);
//     };
//
//     return (
//         <Box sx={{ maxWidth: '1200px', margin: '0 auto', p: 3 }}>
//             <Card>
//                 {/* Header Section */}
//                 <Box sx={{
//                     p: 3,
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     borderBottom: `1px solid ${theme.palette.divider}`
//                 }}>
//                     <Typography variant="h6" color="primary">
//                         Gestión de Usuarios
//                     </Typography>
//                     <Button
//                         component={Link}
//                         to="/dashboard/users/new"
//                         variant="contained"
//                         startIcon={<AddIcon />}
//                         size="large"
//                     >
//                         Nuevo Usuario
//                     </Button>
//                 </Box>
//
//                 {/* Search Section */}
//                 <Box sx={{ px: 3, py: 2, maxWidth: '600px', mx: 'auto' }}>
//                     <TextField
//                         fullWidth
//                         size="medium"
//                         variant="outlined"
//                         placeholder="Buscar por nombre o ID de empleado..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <SearchIcon color="action" />
//                                 </InputAdornment>
//                             ),
//                         }}
//                     />
//                 </Box>
//
//                 {/* Users List Section */}
//                 <Box sx={{ p: 3 }}>
//                     <Box sx={{
//                         mb: 2,
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                         alignItems: 'center'
//                     }}>
//                         <Typography variant="subtitle1" color="primary">
//                             Lista de Usuarios
//                         </Typography>
//                         <Typography variant="body2" color="textSecondary">
//                             Total de usuarios: {filteredUsers.length}
//                         </Typography>
//                     </Box>
//
//                     <TableContainer>
//                         <Table>
//                             <TableHead>
//                                 <TableRow sx={{
//                                     backgroundColor: theme.palette.grey[50],
//                                     '& th': { fontWeight: 'bold' }
//                                 }}>
//                                     <TableCell width="8%">ID</TableCell>
//                                     <TableCell width="20%">Nombre</TableCell>
//                                     <TableCell width="25%">Email</TableCell>
//                                     <TableCell width="12%" align="center">Estado</TableCell>
//                                     <TableCell width="15%" align="center">Huella</TableCell>
//                                     <TableCell width="20%" align="right">Acciones</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {filteredUsers
//                                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                     .map((user) => (
//                                         <TableRow
//                                             key={user.id}
//                                             hover
//                                             sx={{
//                                                 '&\:nth-of-type(odd)': {
//                                                     backgroundColor: theme.palette.grey[50]
//                                                 }
//                                             }}
//                                         >
//                                             <TableCell>{user.id}</TableCell>
//                                             <TableCell>{user.full_name}</TableCell>
//                                             <TableCell>{user.email}</TableCell>
//                                             <TableCell align="center">
//                                                 <Chip
//                                                     label={user.is_active ? 'Activo' : 'Inactivo'}
//                                                     size="small"
//                                                     sx={{
//                                                         minWidth: '90px',
//                                                         backgroundColor: user.is_active ? '#e8f5e9' : '#ffebee',
//                                                         color: user.is_active ? '#2e7d32' : '#d32f2f'
//                                                     }}
//                                                 />
//                                             </TableCell>
//                                             <TableCell align="center">
//                                                 {user.fingerprint_template ? (
//                                                     <Chip
//                                                         icon={<CheckCircleIcon fontSize="small" />}
//                                                         label="Registrada"
//                                                         size="small"
//                                                         variant="outlined"
//                                                         color="success"
//                                                         sx={{ minWidth: '120px' }}
//                                                     />
//                                                 ) : (
//                                                     <Chip
//                                                         icon={<CancelIcon fontSize="small" />}
//                                                         label="Sin registro"
//                                                         size="small"
//                                                         variant="outlined"
//                                                         color="default"
//                                                         sx={{ minWidth: '120px' }}
//                                                     />
//                                                 )}
//                                             </TableCell>
//                                             <TableCell align="right">
//                                                 <Button
//                                                     variant="outlined"
//                                                     size="small"
//                                                     startIcon={<EditIcon />}
//                                                     onClick={() => handleEdit(user.id)}
//                                                     sx={{ mr: 1 }}
//                                                 >
//                                                     Editar
//                                                 </Button>
//                                                 <Button
//                                                     variant="outlined"
//                                                     size="small"
//                                                     startIcon={<FingerprintIcon />}
//                                                     onClick={() => handleFingerprintRegistration(user.id)}
//                                                     color={user.fingerprint_template ? "primary" : "success"}
//                                                 >
//                                                     {user.fingerprint_template ? 'Modificar Huella' : 'Registrar Huella'}
//                                                 </Button>
//                                             </TableCell>
//                                         </TableRow>
//                                     ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//
//                     <TablePagination
//                         component="div"
//                         count={filteredUsers.length}
//                         page={page}
//                         onPageChange={(event, newPage) => setPage(newPage)}
//                         rowsPerPage={rowsPerPage}
//                         onRowsPerPageChange={(event) => {
//                             setRowsPerPage(parseInt(event.target.value, 10));
//                             setPage(0);
//                         }}
//                         labelRowsPerPage="Filas por página"
//                     />
//                 </Box>
//             </Card>
//         </Box>
//     );
// };


// // mejora prompt cluade
// import { useState, useEffect } from 'react';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Button,
//     Chip,
//     Card,
//     TextField,
//     InputAdornment,
//     Box,
//     Typography,
//     TablePagination,
//     useTheme,
//     Paper,
//     Grid,
//     Divider,
//     IconButton,
//     Skeleton,
//     Alert,
//     useMediaQuery
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { userService } from '../../services/userService';
// import {
//     Cancel as CancelIcon,
//     CheckCircle as CheckCircleIcon,
//     Edit as EditIcon,
//     Fingerprint as FingerprintIcon,
//     Add as AddIcon,
//     Search as SearchIcon,
//     Refresh as RefreshIcon
// } from '@mui/icons-material';
// import { Link } from 'react-router-dom';
//
// export const UserList = () => {
//     const theme = useTheme();
//     const navigate = useNavigate();
//     const [users, setUsers] = useState([]);
//     const [filteredUsers, setFilteredUsers] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
//
//     const fetchUsers = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const data = await userService.getUsers();
//             setUsers(data);
//             setFilteredUsers(data);
//         } catch (error) {
//             setError('Error al cargar usuarios. Por favor, intente nuevamente.');
//             console.error('Error fetching users:', error);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     useEffect(() => {
//         fetchUsers();
//     }, []);
//
//     useEffect(() => {
//         const filtered = users.filter(user => {
//             const searchLower = searchTerm.toLowerCase();
//             return (
//                 user.full_name?.toLowerCase().includes(searchLower) ||
//                 user.id?.toString().includes(searchTerm) ||
//                 user.email?.toLowerCase().includes(searchLower)
//             );
//         });
//         setFilteredUsers(filtered);
//         setPage(0);
//     }, [searchTerm, users]);
//
//     const handleEdit = (userId) => {
//         navigate(`/dashboard/users/edit/${userId}`);
//     };
//
//     const handleFingerprintRegistration = (userId) => {
//         navigate(`/dashboard/users/fingerprint/${userId}`);
//     };
//
//     return (
//         <Box sx={{ maxWidth: '1200px', margin: '0 auto', p: { xs: 1, sm: 2, md: 3 } }}>
//             <Paper elevation={2}>
//                 {/* Header Section */}
//                 <Box sx={{
//                     p: { xs: 2, sm: 3 },
//                     display: 'flex',
//                     flexDirection: { xs: 'column', sm: 'row' },
//                     gap: 2,
//                     justifyContent: 'space-between',
//                     alignItems: { xs: 'stretch', sm: 'center' },
//                     borderBottom: `1px solid ${theme.palette.divider}`
//                 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                         <Typography variant="h5" color="primary" sx={{ fontWeight: 600 }}>
//                             Gestión de Usuarios
//                         </Typography>
//                         {!loading && (
//                             <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
//                                 ({filteredUsers.length} usuarios)
//                             </Typography>
//                         )}
//                     </Box>
//                     <Box sx={{ display: 'flex', gap: 1 }}>
//                         <IconButton
//                             color="primary"
//                             onClick={fetchUsers}
//                             disabled={loading}
//                             sx={{ alignSelf: 'center' }}
//                         >
//                             <RefreshIcon />
//                         </IconButton>
//                         <Button
//                             component={Link}
//                             to="/dashboard/users/new"
//                             variant="contained"
//                             startIcon={<AddIcon />}
//                             size={isSmallScreen ? "medium" : "large"}
//                             fullWidth={isSmallScreen}
//                         >
//                             Nuevo Usuario
//                         </Button>
//                     </Box>
//                 </Box>
//
//                 {/* Search Section */}
//                 <Box sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
//                     <TextField
//                         fullWidth
//                         size="medium"
//                         variant="outlined"
//                         placeholder="Buscar por nombre, ID o email..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <SearchIcon color="action" />
//                                 </InputAdornment>
//                             ),
//                         }}
//                     />
//                 </Box>
//
//                 {/* Error Message */}
//                 {error && (
//                     <Box sx={{ px: 3, pb: 2 }}>
//                         <Alert severity="error" onClose={() => setError(null)}>
//                             {error}
//                         </Alert>
//                     </Box>
//                 )}
//
//                 {/* Users List Section */}
//                 <Box sx={{ overflowX: 'auto' }}>
//                     <Table size={isSmallScreen ? "small" : "medium"}>
//                         <TableHead>
//                             <TableRow sx={{
//                                 backgroundColor: theme.palette.grey[50],
//                                 '& th': {
//                                     fontWeight: 600,
//                                     color: theme.palette.text.primary
//                                 }
//                             }}>
//                                 <TableCell>ID</TableCell>
//                                 <TableCell>Nombre</TableCell>
//                                 <TableCell>Email</TableCell>
//                                 <TableCell align="center">Estado</TableCell>
//                                 <TableCell align="center">Huella</TableCell>
//                                 <TableCell align="right">Acciones</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {loading ? (
//                                 Array.from(new Array(rowsPerPage)).map((_, index) => (
//                                     <TableRow key={index}>
//                                         <TableCell><Skeleton /></TableCell>
//                                         <TableCell><Skeleton /></TableCell>
//                                         <TableCell><Skeleton /></TableCell>
//                                         <TableCell><Skeleton /></TableCell>
//                                         <TableCell><Skeleton /></TableCell>
//                                         <TableCell><Skeleton /></TableCell>
//                                     </TableRow>
//                                 ))
//                             ) : filteredUsers.length === 0 ? (
//                                 <TableRow>
//                                     <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
//                                         <Typography variant="body1" color="text.secondary">
//                                             No se encontraron usuarios
//                                         </Typography>
//                                     </TableCell>
//                                 </TableRow>
//                             ) : (
//                                 filteredUsers
//                                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                     .map((user) => (
//                                         <TableRow
//                                             key={user.id}
//                                             hover
//                                             sx={{
//                                                 '&:nth-of-type(odd)': {
//                                                     backgroundColor: theme.palette.grey[50]
//                                                 },
//                                                 transition: 'background-color 0.2s'
//                                             }}
//                                         >
//                                             <TableCell>{user.id}</TableCell>
//                                             <TableCell>
//                                                 <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                                                     {user.full_name}
//                                                 </Typography>
//                                             </TableCell>
//                                             <TableCell>{user.email}</TableCell>
//                                             <TableCell align="center">
//                                                 <Chip
//                                                     label={user.is_active ? 'Activo' : 'Inactivo'}
//                                                     size="small"
//                                                     sx={{
//                                                         minWidth: '90px',
//                                                         backgroundColor: user.is_active ? '#e8f5e9' : '#ffebee',
//                                                         color: user.is_active ? '#2e7d32' : '#d32f2f'
//                                                     }}
//                                                 />
//                                             </TableCell>
//                                             <TableCell align="center">
//                                                 {user.fingerprint_template ? (
//                                                     <Chip
//                                                         icon={<CheckCircleIcon fontSize="small" />}
//                                                         label="Registrada"
//                                                         size="small"
//                                                         variant="outlined"
//                                                         color="success"
//                                                         sx={{ minWidth: '120px' }}
//                                                     />
//                                                 ) : (
//                                                     <Chip
//                                                         icon={<CancelIcon fontSize="small" />}
//                                                         label="Sin registro"
//                                                         size="small"
//                                                         variant="outlined"
//                                                         color="default"
//                                                         sx={{ minWidth: '120px' }}
//                                                     />
//                                                 )}
//                                             </TableCell>
//                                             <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
//                                                 <Button
//                                                     variant="outlined"
//                                                     size="small"
//                                                     startIcon={<EditIcon />}
//                                                     onClick={() => handleEdit(user.id)}
//                                                     sx={{ mr: 1 }}
//                                                 >
//                                                     Editar
//                                                 </Button>
//                                                 <Button
//                                                     variant="outlined"
//                                                     size="small"
//                                                     startIcon={<FingerprintIcon />}
//                                                     onClick={() => handleFingerprintRegistration(user.id)}
//                                                     color={user.fingerprint_template
//                                                         ? "primary"
//                                                         : "success"}
//                                                 >
//                                                     {user.fingerprint_template
//                                                         ? 'Modificar'
//                                                         : 'Registrar'}
//                                                 </Button>
//                                             </TableCell>
//                                         </TableRow>
//                                     ))
//                             )}
//                         </TableBody>
//                     </Table>
//                 </Box>
//
//                 <Divider />
//
//                 <TablePagination
//                     component="div"
//                     count={filteredUsers.length}
//                     page={page}
//                     onPageChange={(event, newPage) => setPage(newPage)}
//                     rowsPerPage={rowsPerPage}
//                     onRowsPerPageChange={(event) => {
//                         setRowsPerPage(parseInt(event.target.value, 10));
//                         setPage(0);
//                     }}
//                     labelRowsPerPage="Filas por página"
//                     labelDisplayedRows={({ from, to, count }) =>
//                         `${from}-${to} de ${count}`}
//                 />
//             </Paper>
//         </Box>
//     );
// };

// // mejora 2 prompt claude
// import { useState, useEffect } from 'react';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Button,
//     Box,
//     Typography,
//     TablePagination,
//     useTheme,
//     Paper,
//     IconButton,
//     Skeleton,
//     Alert,
//     useMediaQuery,
//     TextField,
//     InputAdornment,
//     Tooltip,
//     Divider
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { userService } from '../../services/userService';
// import {
//     CheckCircle as CheckCircleIcon,
//     Edit as EditIcon,
//     Fingerprint as FingerprintIcon,
//     Add as AddIcon,
//     Search as SearchIcon,
//     Refresh as RefreshIcon,
//     Cancel as CancelIcon
// } from '@mui/icons-material';
// import { Link } from 'react-router-dom';
//
// export const UserList = () => {
//     const theme = useTheme();
//     const navigate = useNavigate();
//     const [users, setUsers] = useState([]);
//     const [filteredUsers, setFilteredUsers] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
//
//     const fetchUsers = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const data = await userService.getUsers();
//             setUsers(data);
//             setFilteredUsers(data);
//         } catch (error) {
//             setError('Error al cargar usuarios. Por favor, intente nuevamente.');
//             console.error('Error fetching users:', error);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     useEffect(() => {
//         fetchUsers();
//     }, []);
//
//     useEffect(() => {
//         const filtered = users.filter(user => {
//             const searchLower = searchTerm.toLowerCase();
//             return (
//                 user.full_name?.toLowerCase().includes(searchLower) ||
//                 user.id?.toString().includes(searchTerm) ||
//                 user.email?.toLowerCase().includes(searchLower)
//             );
//         });
//         setFilteredUsers(filtered);
//         setPage(0);
//     }, [searchTerm, users]);
//
//     const handleEdit = (userId) => {
//         navigate(`/dashboard/users/edit/${userId}`);
//     };
//
//     const handleFingerprintRegistration = (userId) => {
//         navigate(`/dashboard/users/fingerprint/${userId}`);
//     };
//
//     return (
//         <Box sx={{ maxWidth: '1200px', margin: '0 auto', p: { xs: 1, sm: 2, md: 3 } }}>
//             <Paper elevation={2}>
//                 {/* Header Section - Mantiene el mismo diseño */}
//                 <Box sx={{
//                     p: { xs: 2, sm: 3 },
//                     display: 'flex',
//                     flexDirection: { xs: 'column', sm: 'row' },
//                     gap: 2,
//                     justifyContent: 'space-between',
//                     alignItems: { xs: 'stretch', sm: 'center' },
//                     borderBottom: `1px solid ${theme.palette.divider}`
//                 }}>
//                     {/* ... contenido del header igual ... */}
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                         <Typography variant="h5" color="primary" sx={{ fontWeight: 600 }}>
//                             Gestión de Usuarios
//                         </Typography>
//                         {!loading && (
//                             <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
//                                 ({filteredUsers.length} usuarios)
//                             </Typography>
//                         )}
//                     </Box>
//                     <Box sx={{ display: 'flex', gap: 1 }}>
//                         <IconButton
//                             color="primary"
//                             onClick={fetchUsers}
//                             disabled={loading}
//                             sx={{ alignSelf: 'center' }}
//                         >
//                             <RefreshIcon />
//                         </IconButton>
//                         <Button
//                             component={Link}
//                             to="/dashboard/users/new"
//                             variant="contained"
//                             startIcon={<AddIcon />}
//                             size={isSmallScreen ? "medium" : "large"}
//                             fullWidth={isSmallScreen}
//                         >
//                             Nuevo Usuario
//                         </Button>
//                     </Box>
//                 </Box>
//
//                 {/* Search Section */}
//                 <Box sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
//                     <TextField
//                         fullWidth
//                         size="medium"
//                         variant="outlined"
//                         placeholder="Buscar por nombre, ID o email..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <SearchIcon color="action" />
//                                 </InputAdornment>
//                             ),
//                         }}
//                     />
//                 </Box>
//
//                 {/* Error Message */}
//                 {error && (
//                     <Box sx={{ px: 3, pb: 2 }}>
//                         <Alert severity="error" onClose={() => setError(null)}>
//                             {error}
//                         </Alert>
//                     </Box>
//                 )}
//
//                 {/* Users List Section */}
//                 <TableContainer>
//                     <Table size={isSmallScreen ? "small" : "medium"}>
//                         <TableHead>
//                             <TableRow sx={{
//                                 backgroundColor: theme.palette.grey[50],
//                                 '& th': {
//                                     fontWeight: 600,
//                                     color: theme.palette.text.primary
//                                 }
//                             }}>
//                                 <TableCell>ID</TableCell>
//                                 <TableCell>Nombre</TableCell>
//                                 <TableCell>Email</TableCell>
//                                 <TableCell align="center">Estado</TableCell>
//                                 <TableCell align="center">Huella</TableCell>
//                                 <TableCell align="right">Acciones</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {loading ? (
//                                 Array.from(new Array(rowsPerPage)).map((_, index) => (
//                                     <TableRow key={index}>
//                                         <TableCell><Skeleton /></TableCell>
//                                         <TableCell><Skeleton /></TableCell>
//                                         <TableCell><Skeleton /></TableCell>
//                                         <TableCell><Skeleton /></TableCell>
//                                         <TableCell><Skeleton /></TableCell>
//                                         <TableCell><Skeleton /></TableCell>
//                                     </TableRow>
//                                 ))
//                             ) : filteredUsers.length === 0 ? (
//                                 <TableRow>
//                                     <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
//                                         <Typography variant="body1" color="text.secondary">
//                                             No se encontraron usuarios
//                                         </Typography>
//                                     </TableCell>
//                                 </TableRow>
//                             ) : (
//                                 filteredUsers
//                                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                     .map((user) => (
//                                         <TableRow
//                                             key={user.id}
//                                             hover
//                                             sx={{
//                                                 '&:nth-of-type(odd)': {
//                                                     backgroundColor: theme.palette.grey[50]
//                                                 }
//                                             }}
//                                         >
//                                             <TableCell>{user.id}</TableCell>
//                                             <TableCell>
//                                                 <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                                                     {user.full_name}
//                                                 </Typography>
//                                             </TableCell>
//                                             <TableCell>{user.email}</TableCell>
//                                             <TableCell align="center">
//                                                 <Box
//                                                     sx={{
//                                                         backgroundColor: user.is_active ? '#e8f5e9' : '#ffebee',
//                                                         color: user.is_active ? '#2e7d32' : '#d32f2f',
//                                                         py: 0.5,
//                                                         px: 1,
//                                                         borderRadius: 1,
//                                                         display: 'inline-block',
//                                                         fontSize: '0.875rem'
//                                                     }}
//                                                 >
//                                                     {user.is_active ? 'Activo' : 'Inactivo'}
//                                                 </Box>
//                                             </TableCell>
//                                             <TableCell align="center">
//                                                 <Tooltip title={user.fingerprint_template ? "Huella Registrada" : "Sin Registro"}>
//                                                     <IconButton
//                                                         size="small"
//                                                         sx={{
//                                                             color: user.fingerprint_template
//                                                                 ? theme.palette.success.main
//                                                                 : theme.palette.grey[400],
//                                                             '&:hover': {
//                                                                 backgroundColor: 'transparent'
//                                                             },
//                                                             cursor: 'default'
//                                                         }}
//                                                         disableRipple
//                                                     >
//                                                         {user.fingerprint_template
//                                                             ? <CheckCircleIcon />
//                                                             : <CancelIcon />}
//                                                     </IconButton>
//                                                 </Tooltip>
//                                             </TableCell>
//                                             <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
//                                                 <Tooltip title="Editar usuario">
//                                                     <IconButton
//                                                         onClick={() => handleEdit(user.id)}
//                                                         size="small"
//                                                         sx={{ mr: 1 }}
//                                                         color="primary"
//                                                     >
//                                                         <EditIcon />
//                                                     </IconButton>
//                                                 </Tooltip>
//                                                 <Tooltip title={user.fingerprint_template ? "Modificar huella" : "Registrar huella"}>
//                                                     <IconButton
//                                                         onClick={() => handleFingerprintRegistration(user.id)}
//                                                         size="small"
//                                                         color={user.fingerprint_template ? "primary" : "success"}
//                                                     >
//                                                         <FingerprintIcon />
//                                                     </IconButton>
//                                                 </Tooltip>
//                                             </TableCell>
//                                         </TableRow>
//                                     ))
//                             )}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//
//                 <Divider />
//
//                 <TablePagination
//                     component="div"
//                     count={filteredUsers.length}
//                     page={page}
//                     onPageChange={(event, newPage) => setPage(newPage)}
//                     rowsPerPage={rowsPerPage}
//                     onRowsPerPageChange={(event) => {
//                         setRowsPerPage(parseInt(event.target.value, 10));
//                         setPage(0);
//                     }}
//                     labelRowsPerPage="Filas por página"
//                     labelDisplayedRows={({ from, to, count }) =>
//                         `${from}-${to} de ${count}`}
//                 />
//             </Paper>
//         </Box>
//     );
// };

// // nueva columna, sorted mejora 2 prompt claude
// import { useState, useEffect } from 'react';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Button,
//     Box,
//     Typography,
//     TablePagination,
//     useTheme,
//     Paper,
//     IconButton,
//     Skeleton,
//     Alert,
//     useMediaQuery,
//     TextField,
//     InputAdornment,
//     Tooltip,
//     Divider
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { userService } from '../../services/userService';
// import {
//     CheckCircle as CheckCircleIcon,
//     Edit as EditIcon,
//     Fingerprint as FingerprintIcon,
//     Add as AddIcon,
//     Search as SearchIcon,
//     Refresh as RefreshIcon,
//     Cancel as CancelIcon
// } from '@mui/icons-material';
// import { Link } from 'react-router-dom';
//
// export const UserList = () => {
//     const theme = useTheme();
//     const navigate = useNavigate();
//     const [users, setUsers] = useState([]);
//     const [filteredUsers, setFilteredUsers] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
//
//     const fetchUsers = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const data = await userService.getUsers();
//             setUsers(data);
//             setFilteredUsers(data);
//         } catch (error) {
//             setError('Error al cargar usuarios. Por favor, intente nuevamente.');
//             console.error('Error fetching users:', error);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     useEffect(() => {
//         fetchUsers();
//     }, []);
//
//     useEffect(() => {
//         const filtered = users.filter(user => {
//             const searchLower = searchTerm.toLowerCase();
//             return (
//                 user.full_name?.toLowerCase().includes(searchLower) ||
//                 user.id?.toString().includes(searchTerm) ||
//                 user.employee_id?.toString().includes(searchTerm) ||
//                 user.email?.toLowerCase().includes(searchLower)
//             );
//         });
//         // Ordenar por ID de usuario de forma ascendente
//         const sortedUsers = [...filtered].sort((a, b) => a.id - b.id);
//         setFilteredUsers(sortedUsers);
//         setPage(0);
//     }, [searchTerm, users]);
//
//     const handleEdit = (userId) => {
//         navigate(`/dashboard/users/edit/${userId}`);
//     };
//
//     const handleFingerprintRegistration = (userId) => {
//         navigate(`/dashboard/users/fingerprint/${userId}`);
//     };
//
//     return (
//         <Box sx={{ maxWidth: '1200px', margin: '0 auto', p: { xs: 1, sm: 2, md: 3 } }}>
//             <Paper elevation={2}>
//                 {/* Header Section */}
//                 <Box sx={{
//                     p: { xs: 2, sm: 3 },
//                     display: 'flex',
//                     flexDirection: { xs: 'column', sm: 'row' },
//                     gap: 2,
//                     justifyContent: 'space-between',
//                     alignItems: { xs: 'stretch', sm: 'center' },
//                     borderBottom: `1px solid ${theme.palette.divider}`
//                 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                         <Typography variant="h5" color="primary" sx={{ fontWeight: 600 }}>
//                             Gestión de Usuarios
//                         </Typography>
//                         {!loading && (
//                             <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
//                                 ({filteredUsers.length} usuarios)
//                             </Typography>
//                         )}
//                     </Box>
//                     <Box sx={{ display: 'flex', gap: 1 }}>
//                         <IconButton
//                             color="primary"
//                             onClick={fetchUsers}
//                             disabled={loading}
//                             sx={{ alignSelf: 'center' }}
//                         >
//                             <RefreshIcon />
//                         </IconButton>
//                         <Button
//                             component={Link}
//                             to="/dashboard/users/new"
//                             variant="contained"
//                             startIcon={<AddIcon />}
//                             size={isSmallScreen ? "medium" : "large"}
//                             fullWidth={isSmallScreen}
//                         >
//                             Nuevo Usuario
//                         </Button>
//                     </Box>
//                 </Box>
//
//                 {/* Search Section */}
//                 <Box sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
//                     <TextField
//                         fullWidth
//                         size="medium"
//                         variant="outlined"
//                         placeholder="Buscar por nombre, ID o email..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <SearchIcon color="action" />
//                                 </InputAdornment>
//                             ),
//                         }}
//                     />
//                 </Box>
//
//                 {/* Error Message */}
//                 {error && (
//                     <Box sx={{ px: 3, pb: 2 }}>
//                         <Alert severity="error" onClose={() => setError(null)}>
//                             {error}
//                         </Alert>
//                     </Box>
//                 )}
//
//                 <TableContainer>
//                     <Table size={isSmallScreen ? "small" : "medium"}>
//                         <TableHead>
//                             <TableRow sx={{
//                                 backgroundColor: theme.palette.grey[50],
//                                 '& th': {
//                                     fontWeight: 600,
//                                     color: theme.palette.text.primary
//                                 }
//                             }}>
//                                 <TableCell>ID</TableCell>
//                                 <TableCell>Nombre</TableCell>
//                                 <TableCell>ID Empleado</TableCell>
//                                 <TableCell>Email</TableCell>
//                                 <TableCell align="center">Estado</TableCell>
//                                 <TableCell align="center">Huella</TableCell>
//                                 <TableCell align="right">Acciones</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {loading ? (
//                                 Array.from(new Array(rowsPerPage)).map((_, index) => (
//                                     <TableRow key={index}>
//                                         <TableCell><Skeleton /></TableCell>
//                                         <TableCell><Skeleton /></TableCell>
//                                         <TableCell><Skeleton /></TableCell>
//                                         <TableCell><Skeleton /></TableCell>
//                                         <TableCell><Skeleton /></TableCell>
//                                         <TableCell><Skeleton /></TableCell>
//                                         <TableCell><Skeleton /></TableCell>
//                                     </TableRow>
//                                 ))
//                             ) : filteredUsers.length === 0 ? (
//                                 <TableRow>
//                                     <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
//                                         <Typography variant="body1" color="text.secondary">
//                                             No se encontraron usuarios
//                                         </Typography>
//                                     </TableCell>
//                                 </TableRow>
//                             ) : (
//                                 filteredUsers
//                                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                     .map((user) => (
//                                         <TableRow
//                                             key={user.id}
//                                             hover
//                                             sx={{
//                                                 '&:nth-of-type(odd)': {
//                                                     backgroundColor: theme.palette.grey[50]
//                                                 }
//                                             }}
//                                         >
//                                             <TableCell>{user.id}</TableCell>
//                                             <TableCell>
//                                                 <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                                                     {user.full_name}
//                                                 </Typography>
//                                             </TableCell>
//                                             <TableCell>{user.employee_id || '-'}</TableCell>
//                                             <TableCell>{user.email}</TableCell>
//                                             <TableCell align="center">
//                                                 <Box
//                                                     sx={{
//                                                         backgroundColor: user.is_active ? '#e8f5e9' : '#ffebee',
//                                                         color: user.is_active ? '#2e7d32' : '#d32f2f',
//                                                         py: 0.5,
//                                                         px: 1,
//                                                         borderRadius: 1,
//                                                         display: 'inline-block',
//                                                         fontSize: '0.875rem'
//                                                     }}
//                                                 >
//                                                     {user.is_active ? 'Activo' : 'Inactivo'}
//                                                 </Box>
//                                             </TableCell>
//                                             <TableCell align="center">
//                                                 <Tooltip title={user.fingerprint_template ? "Huella Registrada" : "Sin Registro"}>
//                                                     <IconButton
//                                                         size="small"
//                                                         sx={{
//                                                             color: user.fingerprint_template
//                                                                 ? theme.palette.success.main
//                                                                 : theme.palette.grey[400],
//                                                             '&:hover': {
//                                                                 backgroundColor: 'transparent'
//                                                             },
//                                                             cursor: 'default'
//                                                         }}
//                                                         disableRipple
//                                                     >
//                                                         {user.fingerprint_template
//                                                             ? <CheckCircleIcon />
//                                                             : <CancelIcon />}
//                                                     </IconButton>
//                                                 </Tooltip>
//                                             </TableCell>
//                                             <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
//                                                 <Tooltip title="Editar usuario">
//                                                     <IconButton
//                                                         onClick={() => handleEdit(user.id)}
//                                                         size="small"
//                                                         sx={{ mr: 1 }}
//                                                         color="primary"
//                                                     >
//                                                         <EditIcon />
//                                                     </IconButton>
//                                                 </Tooltip>
//                                                 <Tooltip title={user.fingerprint_template ? "Modificar huella" : "Registrar huella"}>
//                                                     <IconButton
//                                                         onClick={() => handleFingerprintRegistration(user.id)}
//                                                         size="small"
//                                                         color={user.fingerprint_template ? "primary" : "success"}
//                                                     >
//                                                         <FingerprintIcon />
//                                                     </IconButton>
//                                                 </Tooltip>
//                                             </TableCell>
//                                         </TableRow>
//                                     ))
//                             )}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//
//                 <Divider />
//
//                 <TablePagination
//                     component="div"
//                     count={filteredUsers.length}
//                     page={page}
//                     onPageChange={(event, newPage) => setPage(newPage)}
//                     rowsPerPage={rowsPerPage}
//                     onRowsPerPageChange={(event) => {
//                         setRowsPerPage(parseInt(event.target.value, 10));
//                         setPage(0);
//                     }}
//                     labelRowsPerPage="Filas por página"
//                     labelDisplayedRows={({ from, to, count }) =>
//                         `${from}-${to} de ${count}`}
//                 />
//             </Paper>
//         </Box>
//     );
// };


import {useState, useEffect, useCallback, useRef} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Box,
    Typography,
    TablePagination,
    useTheme,
    Paper,
    IconButton,
    Skeleton,
    Alert,
    useMediaQuery,
    TextField,
    InputAdornment,
    Tooltip,
    Divider,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom'; // Combinamos las importaciones de react-router-dom
import { userService } from '../../services/userService';
import {
    CheckCircle as CheckCircleIcon,
    Edit as EditIcon,
    Fingerprint as FingerprintIcon,
    Add as AddIcon,
    Search as SearchIcon,
    Refresh as RefreshIcon,
    Clear as ClearIcon,
    Cancel as CancelIcon
} from '@mui/icons-material';
import { debounce } from 'lodash'; // Corrección de la importación de debounce
import { normalizeString } from '../../utils';


export const UserList = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const searchInputRef = useRef(null);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(new Date());
    const [isRefreshing, setIsRefreshing] = useState(false);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const fetchUsers = async () => {
        setIsRefreshing(true);
        setLoading(true); // Mantenemos ambos estados de carga
        setError(null);
        try {
            const data = await userService.getUsers();
            setUsers(data);
            setFilteredUsers([...data].sort((a, b) => a.id - b.id)); // Ordenamos por ID
            setLastUpdate(new Date());
        } catch (error) {
            setError('Error al cargar usuarios. Por favor, intente nuevamente.');
            console.error('Error fetching users:', error);
        } finally {
            setIsRefreshing(false);
            setLoading(false);
        }
    };

    const getTimeAgo = (date) => {
        const seconds = Math.floor((new Date() - date) / 1000);
        if (seconds < 60) return 'hace menos de un minuto';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
        return date.toLocaleString();
    };

    // Hook de efecto inicial
    useEffect(() => {
        fetchUsers();
    }, []);

    const filterUsers = (searchValue, userList) => {
        const filtered = userList.filter(user => {
            const searchNormalized = normalizeString(searchValue);
            return (
                normalizeString(user.full_name || '').includes(searchNormalized) ||
                user.id?.toString().includes(searchValue) ||
                user.employee_id?.toString().includes(searchValue) ||
                normalizeString(user.email || '').includes(searchNormalized)
            );
        });
        return [...filtered].sort((a, b) => a.id - b.id);
    };

    // Creación del debounce
    const debouncedFilter = useCallback(
        debounce((searchValue, userList) => {
            const filteredAndSorted = filterUsers(searchValue, userList);
            setFilteredUsers(filteredAndSorted);
            setPage(0);
        }, 300),
        []
    );

    // Effect para el filtrado
    useEffect(() => {
        debouncedFilter(searchTerm, users);
        // Limpieza del debounce
        return () => {
            debouncedFilter.cancel();
        };
    }, [searchTerm, users, debouncedFilter]);


    const handleClearSearch = () => {
        setSearchTerm('');
        searchInputRef.current?.focus();
    };

    const handleEdit = (userId) => {
        navigate(`/dashboard/users/edit/${userId}`);
    };

    const handleFingerprintRegistration = (userId) => {
        navigate(`/dashboard/users/fingerprint/${userId}`);
    };

    return (
        <Box sx={{ maxWidth: '1200px', margin: '0 auto', p: { xs: 1, sm: 2, md: 3 } }}>
            <Paper elevation={2}>
                {/* Header Section */}
                <Box sx={{
                    p: { xs: 2, sm: 3 },
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2,
                    justifyContent: 'space-between',
                    alignItems: { xs: 'stretch', sm: 'center' },
                    borderBottom: `1px solid ${theme.palette.divider}`
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="h5" color="primary" sx={{ fontWeight: 600 }}>
                            Gestión de Usuarios
                        </Typography>
                        {!loading && (
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                ml: 2,
                                color: 'text.secondary'
                            }}>
                                <Typography variant="body2">
                                    ({filteredUsers.length} usuarios)
                                </Typography>
                                <Tooltip title={lastUpdate.toLocaleString()}>
                                    <Typography variant="caption">
                                        Actualizado {getTimeAgo(lastUpdate)}
                                    </Typography>
                                </Tooltip>
                            </Box>
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Actualizar lista">
                        <span>
                            <IconButton
                                color="primary"
                                onClick={fetchUsers}
                                disabled={loading || isRefreshing}
                                sx={{
                                    alignSelf: 'center',
                                    transition: 'all 0.3s ease',
                                    animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
                                    opacity: (loading || isRefreshing) ? 0.6 : 1,
                                    '@keyframes spin': {
                                        '0%': { transform: 'rotate(0deg)' },
                                        '100%': { transform: 'rotate(360deg)' }
                                    },
                                    '&:hover': {
                                        backgroundColor: 'rgba(25, 118, 210, 0.04)'
                                    }
                                }}
                            >
                                <RefreshIcon />
                            </IconButton>
                        </span>
                        </Tooltip>
                        <Button
                            component={Link}
                            to="/dashboard/users/new"
                            variant="contained"
                            startIcon={<AddIcon />}
                            size={isSmallScreen ? "medium" : "large"}
                            fullWidth={isSmallScreen}
                        >
                            Nuevo Usuario
                        </Button>
                    </Box>
                </Box>

                {/* Search Section */}
                <Box sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
                    <TextField
                        inputRef={searchInputRef}
                        fullWidth
                        size="medium"
                        variant="outlined"
                        placeholder="Buscar por nombre, ID o email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                            endAdornment: searchTerm && (
                                <InputAdornment position="end">
                                    <Tooltip title="Limpiar búsqueda">
                                        <IconButton
                                            onClick={handleClearSearch}
                                            edge="end"
                                            size="small"
                                            sx={{
                                                transition: 'opacity 0.2s',
                                                '&:hover': {
                                                    opacity: 0.8,
                                                }
                                            }}
                                        >
                                            <ClearIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            ),
                            sx: {
                                transition: 'background-color 0.2s',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.01)'
                                }
                            }
                        }}
                    />
                </Box>

                {/* Error Message */}
                {error && (
                    <Box sx={{ px: 3, pb: 2 }}>
                        <Alert severity="error" onClose={() => setError(null)}>
                            {error}
                        </Alert>
                    </Box>
                )}

                {/* Table */}
                <TableContainer>
                    <Table size={isSmallScreen ? "small" : "medium"}>
                        <TableHead>
                            <TableRow sx={{
                                backgroundColor: theme.palette.grey[50],
                                '& th': {
                                    fontWeight: 600,
                                    color: theme.palette.text.primary
                                }
                            }}>
                                <TableCell>ID</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>ID Empleado</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell align="center">Estado</TableCell>
                                <TableCell align="center">Huella</TableCell>
                                <TableCell align="right">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                Array.from(new Array(rowsPerPage)).map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell><Skeleton /></TableCell>
                                        <TableCell><Skeleton /></TableCell>
                                        <TableCell><Skeleton /></TableCell>
                                        <TableCell><Skeleton /></TableCell>
                                        <TableCell><Skeleton /></TableCell>
                                        <TableCell><Skeleton /></TableCell>
                                        <TableCell><Skeleton /></TableCell>
                                    </TableRow>
                                ))
                            ) : filteredUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                                        <Typography variant="body1" color="text.secondary">
                                            No se encontraron usuarios
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredUsers
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((user) => (
                                        <TableRow
                                            key={user.id}
                                            hover
                                            sx={{
                                                '&:nth-of-type(odd)': {
                                                    backgroundColor: theme.palette.grey[50]
                                                }
                                            }}
                                        >
                                            <TableCell>{user.id}</TableCell>
                                            <TableCell>
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                    {user.full_name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>{user.employee_id || '-'}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell align="center">
                                                <Box
                                                    sx={{
                                                        backgroundColor: user.is_active ? '#e8f5e9' : '#ffebee',
                                                        color: user.is_active ? '#2e7d32' : '#d32f2f',
                                                        py: 0.5,
                                                        px: 1,
                                                        borderRadius: 1,
                                                        display: 'inline-block',
                                                        fontSize: '0.875rem'
                                                    }}
                                                >
                                                    {user.is_active ? 'Activo' : 'Inactivo'}
                                                </Box>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Tooltip title={user.fingerprint_template ? "Huella Registrada" : "Sin Registro"}>
                                                    <IconButton
                                                        size="small"
                                                        sx={{
                                                            color: user.fingerprint_template
                                                                ? theme.palette.success.main
                                                                : theme.palette.grey[400],
                                                            '&:hover': {
                                                                backgroundColor: 'transparent'
                                                            },
                                                            cursor: 'default'
                                                        }}
                                                        disableRipple
                                                    >
                                                        {user.fingerprint_template
                                                            ? <CheckCircleIcon />
                                                            : <CancelIcon />}
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                                                <Tooltip title="Editar usuario">
                                                    <IconButton
                                                        onClick={() => handleEdit(user.id)}
                                                        size="small"
                                                        sx={{ mr: 1 }}
                                                        color="primary"
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title={user.fingerprint_template ? "Modificar huella" : "Registrar huella"}>
                                                    <IconButton
                                                        onClick={() => handleFingerprintRegistration(user.id)}
                                                        size="small"
                                                        color={user.fingerprint_template ? "primary" : "success"}
                                                    >
                                                        <FingerprintIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Divider />

                <TablePagination
                    component="div"
                    count={filteredUsers.length}
                    page={page}
                    onPageChange={(event, newPage) => setPage(newPage)}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(event) => {
                        setRowsPerPage(parseInt(event.target.value, 10));
                        setPage(0);
                    }}
                    labelRowsPerPage="Filas por página"
                    labelDisplayedRows={({ from, to, count }) =>
                        `${from}-${to} de ${count}`}
                />
            </Paper>
        </Box>
    );
};