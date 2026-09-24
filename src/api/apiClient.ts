/**
 * Core Web API Client & Request Handler
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://vexuslabs-backend.onrender.com/api';


const getHeaders = (customHeaders: Record<string, string> = {}) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('vexus_admin_token') || localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

export const apiClient = {
  get: async (url: string, headers = {}) => {
    const fullUrl = `${API_BASE_URL}${url.startsWith('/') ? url : `/${url}`}`;
    console.log(`🌐 [API GET] Requesting: ${fullUrl}`);
    return fetch(fullUrl, { method: 'GET', headers: getHeaders(headers) });
  },

  post: async (url: string, body?: any, headers = {}) => {
    const fullUrl = `${API_BASE_URL}${url.startsWith('/') ? url : `/${url}`}`;
    console.log(`🚀 [API POST] Requesting: ${fullUrl}`, 'Payload:', body);
    return fetch(fullUrl, {
      method: 'POST',
      headers: getHeaders(headers),
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  put: async (url: string, body?: any, headers = {}) => {
    const fullUrl = `${API_BASE_URL}${url.startsWith('/') ? url : `/${url}`}`;
    console.log(`✏️ [API PUT] Requesting: ${fullUrl}`, 'Payload:', body);
    return fetch(fullUrl, {
      method: 'PUT',
      headers: getHeaders(headers),
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  delete: async (url: string, headers = {}) => {
    const fullUrl = `${API_BASE_URL}${url.startsWith('/') ? url : `/${url}`}`;
    console.log(`🗑️ [API DELETE] Requesting: ${fullUrl}`);
    return fetch(fullUrl, { method: 'DELETE', headers: getHeaders(headers) });
  },
};

export const handleRequest = async (requestPromise: Promise<Response>) => {
  try {
    const response = await requestPromise;
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.warn(`⚠️ [API ${response.status}]:`, data.message || `Request failed with status ${response.status}`);
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    console.log(`✅ [API Success ${response.status}]:`, data);
    return data;
  } catch (error: any) {
    throw error;
  }
};

export default apiClient;
