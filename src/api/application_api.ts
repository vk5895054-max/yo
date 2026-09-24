import apiClient, { handleRequest } from './apiClient';

/**
 * Public Candidate Job Application API
 */
export const submitApplicationAPI = async (applicationData: {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  country?: string;
  jobId?: string;
  jobTitle?: string;
  department?: string;
  message?: string;
  candidateNote?: string;
  resumeFileName?: string;
  resumeFileSize?: string;
  resumeDataUrl?: string;
  portfolioUrl?: string;
}) => {
  return handleRequest(apiClient.post('/applications', applicationData));
};

/**
 * Admin Candidate Applications API
 */
export const getAdminApplicationsAPI = async (params?: { status?: string; search?: string; department?: string }) => {
  let url = '/admin/applications';
  if (params) {
    const queryParams = new URLSearchParams();
    if (params.status) queryParams.append('status', params.status);
    if (params.search) queryParams.append('search', params.search);
    if (params.department) queryParams.append('department', params.department);
    const queryString = queryParams.toString();
    if (queryString) url += `?${queryString}`;
  }
  return handleRequest(apiClient.get(url));
};

export const getAdminApplicationByIdAPI = async (id: string) => {
  return handleRequest(apiClient.get(`/admin/applications/${id}`));
};

export const deleteAdminApplicationAPI = async (id: string) => {
  return handleRequest(apiClient.delete(`/admin/applications/${id}`));
};
