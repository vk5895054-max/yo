import { apiClient, handleRequest } from './apiClient';

/**
 * Admin Auth API Endpoints
 */
export const loginAdminAPI = async (credentials: { email: string; password: string }) => {
  return handleRequest(apiClient.post('/admin/auth/login', credentials));
};

export const getAdminProfileAPI = async () => {
  return handleRequest(apiClient.get('/admin/auth/profile'));
};
