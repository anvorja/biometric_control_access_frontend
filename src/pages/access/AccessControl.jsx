// src/pages/access/AccessControl.jsx
import { useState } from 'react';
import { Card, Box, Button, Typography, Grid, Container } from '@mui/material';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import {accessService} from "../../services/accessService.js";

export const AccessControl = () => {
    const [verifying, setVerifying] = useState(false);

    const handleVerification = async (type) => {
        setVerifying(true);
        try {
            await accessService.recordAccess(type);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setVerifying(false);
        }
    };

//     return (
//         <Grid container spacing={3} justifyContent="center">
//             <Grid item xs={12} md={6}>
//                 <Card sx={{ p: 4, textAlign: 'center' }}>
//                     <FingerprintIcon sx={{ fontSize: 60, mb: 2 }} />
//                     <Typography variant="h5" gutterBottom>Control de Acceso</Typography>
//                     <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             disabled={verifying}
//                             onClick={() => handleVerification('entry')}
//                         >
//                             Registrar Entrada
//                         </Button>
//                         <Button
//                             variant="contained"
//                             color="secondary"
//                             disabled={verifying}
//                             onClick={() => handleVerification('exit')}
//                         >
//                             Registrar Salida
//                         </Button>
//                     </Box>
//                 </Card>
//             </Grid>
//         </Grid>
//     );
// };
    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={8} md={6}>
                    <Card
                        elevation={3}
                        sx={{
                            p: 4,
                            textAlign: 'center',
                            maxWidth: '100%',
                            mx: 'auto',
                            borderRadius: 2
                        }}
                    >
                        <FingerprintIcon
                            sx={{
                                fontSize: 80,
                                mb: 2,
                                color: 'primary.main'
                            }}
                        />
                        <Typography
                            variant="h5"
                            gutterBottom
                            sx={{
                                fontWeight: 500,
                                mb: 3
                            }}
                        >
                            Control de Acceso
                        </Typography>
                        <Box sx={{
                            mt: 3,
                            display: 'flex',
                            gap: 2,
                            justifyContent: 'center',
                            flexDirection: { xs: 'column', sm: 'row' }
                        }}>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={verifying}
                                onClick={() => handleVerification('entry')}
                                sx={{ py: 1.5, px: 4 }}
                            >
                                Registrar Entrada
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                disabled={verifying}
                                onClick={() => handleVerification('exit')}
                                sx={{ py: 1.5, px: 4 }}
                            >
                                Registrar Salida
                            </Button>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};