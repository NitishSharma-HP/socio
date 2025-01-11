export class ApiService{
    constructor(){
        this.baseURL = 'http://localhost:4000'; 
    }
    async request(endpoint, options = {}) {
        const res = {
          success: true,
          data: null,
          message: null,
          error: null
        };
    
        try {
          const response = await fetch(`${this.baseURL}/${endpoint}`, options);
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
      }

      async get(endpoint, req = {}) {
        return this.request(endpoint, { ...req, method: 'GET' });
      }
    
      async post(endpoint, req = {}) {
        return this.request(endpoint, { ...req, method: 'POST' });
      }
}