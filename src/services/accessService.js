import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para añadir el token automáticamente
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const accessService = {

    checkRecords: async (filters = {}) => {
        try {
            const queryParams = new URLSearchParams();

            if (filters.start_date) queryParams.append('start_date', filters.start_date);
            if (filters.end_date) queryParams.append('end_date', filters.end_date);
            if (filters.employee_id) queryParams.append('employee_id', filters.employee_id);
            if (filters.full_name) queryParams.append('full_name', filters.full_name);

            const response = await axiosInstance.get(
                `/access/admin/check-records?${queryParams.toString()}`
            );

            return response.data.hasRecords;
        } catch (error) {
            console.error('Error checking records:', error);
            throw error;
        }
    },

    recordAccess: async (type) => {
        const response = await axiosInstance.post('/access/record', {
            access_type: type,
            device_id: "MAIN_DOOR"
        });
        return response.data;
    },

    getHistory: async () => {
        const response = await axiosInstance.get('/access/admin/logs');
        return response.data;
    },

    getFilteredHistory: async (filters = {}) => {
        try {
            const queryParams = new URLSearchParams();

            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== '') {
                    queryParams.append(key, value);
                }
            });

            const response = await axiosInstance.get(
                `/access/history/filtered?${queryParams.toString()}`
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },


    exportPdf: async (filters = {}) => {
        try {
            const queryParams = new URLSearchParams();

            if (filters.start_date) queryParams.append('start_date', filters.start_date);
            if (filters.end_date) queryParams.append('end_date', filters.end_date);
            if (filters.employee_id) queryParams.append('employee_id', filters.employee_id);
            if (filters.full_name) queryParams.append('full_name', filters.full_name);

            const response = await axiosInstance.get(
                `/access/admin/export-pdf?${queryParams.toString()}`,
                {
                    responseType: 'blob'
                }
            );

            // Crear y descargar el PDF
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `access_logs_${new Date().toISOString().split('T')[0]}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error exporting PDF:', error);
            throw error;
        }
    },

    getReportPreview: async (filters = {}) => {
        try {
            const queryParams = new URLSearchParams();

            if (filters.start_date) queryParams.append('start_date', filters.start_date);
            if (filters.end_date) queryParams.append('end_date', filters.end_date);
            if (filters.employee_id) queryParams.append('employee_id', filters.employee_id);
            if (filters.full_name) queryParams.append('full_name', filters.full_name);

            const response = await axiosInstance.get(
                `/access/admin/export-pdf?${queryParams.toString()}`,
                {
                    responseType: 'blob'
                }
            );

            return response.data;
        } catch (error) {
            console.error('Error getting PDF preview:', error);
            throw error;
        }
    },
};