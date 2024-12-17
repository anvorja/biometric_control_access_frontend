import { Backdrop, CircularProgress } from '@mui/material';

export const Loading = ({ open }) => (
    <Backdrop sx={{ zIndex: 9999 }} open={open}>
        <CircularProgress />
    </Backdrop>
);