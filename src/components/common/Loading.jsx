import { Backdrop, CircularProgress } from '@mui/material';
import PropTypes from "prop-types";

export const Loading = ({ open }) => (
    <Backdrop sx={{ zIndex: 9999 }} open={open}>
        <CircularProgress />
    </Backdrop>
);

Loading.propTypes = {
    open: PropTypes.bool.isRequired
};