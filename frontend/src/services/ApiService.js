import {useUserContext} from '../utils/session/UserContext';

const useApiService = () => {
  const { userToken } = useUserContext(); // Access userToken from context
  
  // Method to handle the API request
  const request = async (endpoint, options = {}) => {
    const res = {
      success: true,
      data: null,
      message: null,
      error: null,
    };
    try {
      // Add Authorization header if userToken is available
      const headers = userToken
        ? {
            'Authorization': `Bearer ${userToken}`,
            ...options.headers, // Keep existing headers if any
          }
        : options.headers;
      const response = await fetch(endpoint, {
        ...options,
        headers,
      });
      const jsonRes = await response.json();
      if (response.ok) {
        try {
          res.data = jsonRes;
        } catch (e) {
          res.success = false;
          res.message = "Failed to parse JSON response.";
        }
      } else {
        res.success = false;
        res.message = `Request to ${endpoint} failed with status ${jsonRes.status}.`;
        res.error = jsonRes.error ?? jsonRes.message ?? null;
      }
    } catch (e) {
      res.success = false;
      res.message = `Network error: ${e.message}`;
    }

    return res;
  };

  // GET request method
  const get = async (endpoint, req = {}) => {
    return request(endpoint, { ...req, method: 'GET' });
  };

  // POST request method
  const post = async (endpoint, req = {}) => {
    return request(endpoint, { ...req, method: 'POST' });
  };

  // Return methods and baseURL update function
  return { get, post };
};

export default useApiService;
