
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import CommandButton from "@/components/UI/CommandButton";
import { Lock } from "lucide-react";

const Index: React.FC = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, login } = useAuth();
  const [displayText, setDisplayText] = useState("");
  const welcomeText = "VESPERCORE v1.0 // COMMANDER S'TARI";
  
  useEffect(() => {
    // Typewriter effect for welcome text
    let index = 0;
    const timer = setInterval(() => {
      setDisplayText(welcomeText.substring(0, index));
      index++;
      
      if (index > welcomeText.length) {
        clearInterval(timer);
      }
    }, 80);
    
    return () => clearInterval(timer);
  }, []);
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(password);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-vesper-gold animate-pulse-glow"></div>
          </div>
          <h1 className="mt-6 text-2xl font-mono text-vesper-gold terminal-cursor">
            {displayText}
          </h1>
          <p className="mt-2 text-gray-400">
            Private Command Bridge - Authorized Access Only
          </p>
        </div>
        
        <div className="vesper-panel mt-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="vesper-header text-sm block mb-2">
                COMMANDER AUTHORIZATION
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="vesper-input w-full"
                required
                autoFocus
                placeholder="Enter your access code"
              />
            </div>
            
            <div>
              <CommandButton
                type="submit"
                className="w-full"
                disabled={loading}
                icon={<Lock size={16} />}
              >
                {loading ? "AUTHENTICATING..." : "ACCESS TERMINAL"}
              </CommandButton>
            </div>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              SECURE CONNECTION • ENCRYPTED CHANNEL • {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
