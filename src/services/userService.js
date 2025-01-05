import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/auth';

const getHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const userService = {

    getUsers: async () => {
        const response = await axios.get(
            `${API_URL}/users`,
            getHeaders());
        return response.data;
    },

    createUser: async (userData) => {
        const response = await axios.post(
            `${API_URL}/register`,
            userData,
            getHeaders());
        return response.data;
    },

    getUser: async (id) => {
        const response = await axios.get(`${API_URL}/users/${id}`, getHeaders());
        return response.data;
    },

    updateUser: async (id, userData) => {
        const response = await axios.put(
            `${API_URL}/users/${id}`,
            userData,
            getHeaders());
        return response.data;
    },

    registerFingerprint: async (userId) => {
        const response = await axios.post(
            `${API_URL}/biometric/users/${userId}/fingerprint`,
            {},
            getHeaders()
        );
        return response.data;
    }

};