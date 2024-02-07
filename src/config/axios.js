import axios from "axios";

const url = import.meta.env.VITE_API_URL;

const axiosClient = axios.create({
    baseURL: `${url}/api/`,
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
});

// axiosClient.interceptors.request.use(
//     function (config) {
//       const token = localStorage.getItem('token');
//       if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//       }
//       return config;
//     },
//     function (error) {
//       return Promise.reject(error);
//     }
//   );

export default axiosClient;