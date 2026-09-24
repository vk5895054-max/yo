import { apiClient, handleRequest } from './apiClient';

/**
 * Public Job API Endpoints
 */
export const getPublicJobsAPI = async (search = '', departmentTrack = '') => {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (departmentTrack && departmentTrack !== 'all') params.append('departmentTrack', departmentTrack);
  const queryString = params.toString() ? `?${params.toString()}` : '';
  return handleRequest(apiClient.get(`/jobs${queryString}`));
};

export const getPublicJobByIdAPI = async (id: string) => {
  return handleRequest(apiClient.get(`/jobs/${id}`));
};

/**
 * Admin Job API Endpoints
 */
export const getAdminJobsAPI = async () => {
  return handleRequest(apiClient.get('/admin/jobs'));
};

export const getAdminJobByIdAPI = async (id: string) => {
  return handleRequest(apiClient.get(`/admin/jobs/${id}`));
};

export const createJobAPI = async (jobData: any) => {
  return handleRequest(apiClient.post('/admin/jobs', jobData));
};

export const updateJobAPI = async (id: string, jobData: any) => {
  return handleRequest(apiClient.put(`/admin/jobs/${id}`, jobData));
};

export const deleteJobAPI = async (id: string) => {
  return handleRequest(apiClient.delete(`/admin/jobs/${id}`));
};
