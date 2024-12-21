import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Enables session management
});

export const login = (data) => api.post('/login', data);




export const getUser = () => api.get('/user');

export const logout = () => api.post('/logout');

export const startTimer = (can_id, table_id) => api.post('/start_timer', { can_id, table_id });

export const getTimerStatus = (can_id) => api.get(`/get_timer_status/${can_id}`);

export const endTimer = (can_id) => api.post(`/end_timer/${can_id}`);

export const getTimerDuration = () => api.get('/get_timer_duration');

export const updateTimerDuration = (duration) => api.post('/update_timer_duration', { duration });

export const countOccupiedTables = () => api.get('/count_occupied_tables');

export const setTableVacant = (table_id) => api.post('/set_table_vacant', { table_id });
