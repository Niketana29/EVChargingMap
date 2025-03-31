import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

export const fetchChargingStations = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/charging-stations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching charging stations:', error);
    return [];
  }
};
