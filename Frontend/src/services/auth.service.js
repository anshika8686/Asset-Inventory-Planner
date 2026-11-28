
import api from "../config/api";

const signup = (userData) => {
  return api.post("/auth/signup", userData);
};

const login = (credentials) => {
  return api.post("/auth/login", credentials);
};

const getMe = () => {
  return api.get("/auth/get-me");
};

const logout = () => {
  return api.post("/auth/logout");
};

const authService = {
  signup,
  login,
  getMe,
  logout,
};

export default authService;
