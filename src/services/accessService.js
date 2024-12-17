import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

export const accessService = {
    recordAccess: async (type) => {
        const response = await axios.post(`${API_URL}/access/record`, {
            access_type: type,
            device_id: "MAIN_DOOR"
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    },

    getHistory: async () => {
        const response = await axios.get(`${API_URL}/access/admin/logs`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    },

    exportPdf: async (startDate, endDate) => {
        const response = await axios.get(
            `${API_URL}/access/admin/export-pdf`,
            {
                params: {start_date: startDate, end_date: endDate},
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Accept': 'application/pdf'
                },
                responseType: 'blob'
            }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `access_report_${startDate}-${endDate}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
};