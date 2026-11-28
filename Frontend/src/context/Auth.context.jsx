
import { createContext, useEffect, useState } from "react";
import authService from "../services/auth.service"

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication when app loads
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await authService.getMe();
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  // Login
  async function login(credentials) {
    const response = await authService.login(credentials);
    setUser(response.data.user);
    return response.data;
  }

  // Signup
  async function signup(userData) {
    const response = await authService.signup(userData);
    return response.data;
  }

  // Logout
  async function logout() {
    await authService.logout();
    setUser(null);
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
