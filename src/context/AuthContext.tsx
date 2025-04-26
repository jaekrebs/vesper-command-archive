
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const COMMANDER_PASSWORD = "vespercore"; // In a real app, you'd use a proper auth system with hashing

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if we have a saved auth state in localStorage
    const savedAuth = localStorage.getItem("vesper-auth");
    if (savedAuth === "authenticated") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (password: string): Promise<boolean> => {
    // Simulate a brief delay for authentication
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (password === COMMANDER_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("vesper-auth", "authenticated");
      toast.success("Access granted, Commander.");
      navigate("/dashboard");
      return true;
    } else {
      toast.error("Access denied. Invalid credentials.");
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("vesper-auth");
    toast.info("You have been logged out.");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
