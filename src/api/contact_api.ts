import { apiClient, handleRequest } from './apiClient';

/**
 * Public Contact API Endpoint
 */
export const submitContactAPI = async (contactData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  message: string;
}) => {
  return handleRequest(apiClient.post('/contact', contactData));
};

/**
 * Admin Contact API Endpoints
 */
export const getAdminContactsAPI = async (status = '', search = '') => {
  const params = new URLSearchParams();
  if (status && status !== 'all') params.append('status', status);
  if (search) params.append('search', search);
  const queryString = params.toString() ? `?${params.toString()}` : '';
  return handleRequest(apiClient.get(`/admin/contacts${queryString}`));
};

export const getAdminContactByIdAPI = async (id: string) => {
  return handleRequest(apiClient.get(`/admin/contacts/${id}`));
};

export const deleteAdminContactAPI = async (id: string) => {
  return handleRequest(apiClient.delete(`/admin/contacts/${id}`));
};
