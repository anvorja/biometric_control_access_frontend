// src/services/biometricService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/biometric';

const getHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const biometricService = {
    registerFingerprint: async (userId) => {
        const response = await axios.post(
            `${API_URL}/users/${userId}/fingerprint`,
            {},
            getHeaders()
        );
        return response.data;
    },

    // Aquí podrás añadir más funciones relacionadas con biometría
    // Por ejemplo:
    verifyFingerprint: async (userId) => {
        const response = await axios.post(
            `${API_URL}/verify/${userId}`,
            {},
            getHeaders()
        );
        return response.data;
    }
};