import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    console.log("Checking LocalStorage on reload...");
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      try {
        const decoded = JSON.parse(atob(storedToken.split(".")[1])); // Decode JWT
        const expiryTime = decoded.exp * 1000;
        const currentTime = Date.now();

        if (currentTime >= expiryTime) {
          console.log("Token expired, logging out...");
          logout();
        } else {
          setToken(storedToken);
          setUser(storedUser ? JSON.parse(storedUser) : decoded);
          console.log("User restored successfully:", JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        logout();
      }
    } else {
      console.log("No token found, user not logged in.");
    }

    setLoading(false); // Mark as finished loading
  }, []);

  const login = (userToken, userData) => {
    localStorage.setItem("token", userToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(userToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
