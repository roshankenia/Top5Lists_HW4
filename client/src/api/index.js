/*
    This is our http api, which we use to send requests to
    our back-end API. Note we`re using the Axios library
    for doing this, which is an easy to use AJAX-based
    library. We could (and maybe should) use Fetch, which
    is a native (to browsers) standard, but Axios is easier
    to use when sending JSON back and forth and it`s a Promise-
    based API which helps a lot with asynchronous communication.
    
    @author McKilla Gorilla
*/

import axios from "axios";
axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /top5list). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE CALL THE payload, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES
export const createTop5List = (payload) => api.post(`/top5list/`, payload);
export const getAllTop5Lists = () => api.get(`/top5lists/`);
export const getTop5ListPairs = (payload) =>
  api.post(`/top5listpairs/`, payload);
export const updateTop5ListById = (id, payload) =>
  api.put(`/top5list/${id}`, payload);
export const deleteTop5ListById = (id, payload) => api.post(`/top5list/delete/${id}`, payload);
export const getTop5ListById = (id, payload) => api.post(`/top5list/${id}`, payload);
export const getLoggedIn = () => api.get(`/loggedIn/`);
export const registerUser = (payload) => api.post(`/register/`, payload);
export const loginUser = (payload) => api.post(`/login/`, payload);
export const logoutUser = () => api.get(`/logout/`);

const apis = {
  createTop5List,
  getAllTop5Lists,
  getTop5ListPairs,
  updateTop5ListById,
  deleteTop5ListById,
  getTop5ListById,

  getLoggedIn,
  registerUser,
  loginUser,
  logoutUser,
};

export default apis;
