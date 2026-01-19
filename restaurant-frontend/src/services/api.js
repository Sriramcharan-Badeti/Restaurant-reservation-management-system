// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get headers with token
const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Helper function to handle responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  return data;
};

// Authentication API
export const authAPI = {
  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  },

  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(credentials)
    });
    return handleResponse(response);
  }
};

// Reservation API (Customer)
export const reservationAPI = {
  getMyReservations: async () => {
    const response = await fetch(`${API_URL}/reservations`, {
      headers: getHeaders()
    });
    return handleResponse(response);
  },

  create: async (reservationData) => {
    const response = await fetch(`${API_URL}/reservations`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(reservationData)
    });
    return handleResponse(response);
  },

  cancel: async (id) => {
    const response = await fetch(`${API_URL}/reservations/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return handleResponse(response);
  }
};

// Admin API
export const adminAPI = {
  getAllReservations: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_URL}/admin/reservations?${params}`, {
      headers: getHeaders()
    });
    return handleResponse(response);
  },

  cancelReservation: async (id) => {
    const response = await fetch(`${API_URL}/admin/reservations/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return handleResponse(response);
  },

  updateReservation: async (id, updates) => {
    const response = await fetch(`${API_URL}/admin/reservations/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updates)
    });
    return handleResponse(response);
  }
};

// Tables API
export const tablesAPI = {
  checkAvailability: async (params) => {
    const queryParams = new URLSearchParams(params);
    const response = await fetch(`${API_URL}/tables/available?${queryParams}`, {
      headers: getHeaders()
    });
    return handleResponse(response);
  },

  getTimeSlots: async () => {
    const response = await fetch(`${API_URL}/tables/timeslots`, {
      headers: getHeaders()
    });
    return handleResponse(response);
  }
};