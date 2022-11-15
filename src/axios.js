import axios from "axios";
// import jwt_decode from 'jwt-decode'

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


function isTokenExpired(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  const data = JSON.parse(jsonPayload);
  const expirationDate = data.exp;
  const currentDate = new Date().getTime() / 1000;
  return currentDate >= expirationDate;
}

axiosClient.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("AccessToken");
    // if token is expired we refresh the token
    if (token) {
      const isExpired = isTokenExpired(token);
      if (isExpired) {
        this.$store.commit("info/resetInfo");
          this.$store.dispatch("account/logout");
          this.$router.reload()
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// axiosClient.interceptors.response.use(response => {
//     return response;
// }, error => {
//     if (error.response.status === 404) {
//         console.log('token expired',error.response)
//         /* THIS WORKS BUT BREAKS THE LOGIN ERROR HANDLING */

//     }
//     return Promise.reject(error);
// });

export default axiosClient;
