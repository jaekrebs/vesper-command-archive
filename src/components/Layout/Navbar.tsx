
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, LogOut, Home, Calendar, BookOpen, Archive, Clock, Settings } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAuth();
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "DASHBOARD", path: "/dashboard", icon: <Home size={18} /> },
    { name: "BATTLE PLAN", path: "/battle-plan", icon: <Calendar size={18} /> },
    { name: "CHARACTER SHEETS", path: "/characters", icon: <BookOpen size={18} /> },
    { name: "ARCHIVES", path: "/archives", icon: <Archive size={18} /> },
    { name: "LOGS", path: "/logs", icon: <Clock size={18} /> },
    { name: "SETTINGS", path: "/settings", icon: <Settings size={18} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-vesper-black bg-opacity-95 backdrop-blur-md border-b border-vesper-navy/30 sticky top-0 z-50">
      <div className="vesper-container py-3">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-vesper-gold animate-pulse-glow"></div>
            <span className="font-mono text-lg text-vesper-gold">VESPERCORE</span>
          </Link>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path}
                className={`font-mono text-sm flex items-center gap-2 transition-colors duration-300 ${
                  isActive(item.path) 
                    ? "text-vesper-gold" 
                    : "text-gray-400 hover:text-vesper-teal"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            
            <button 
              onClick={logout} 
              className="font-mono text-sm text-vesper-accent flex items-center gap-2 hover:text-red-400 transition-colors duration-300"
            >
              <LogOut size={18} />
              LOGOUT
            </button>
          </div>
          
          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden text-gray-300 hover:text-vesper-gold transition-colors duration-300"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-vesper-navy/30 pt-4 space-y-4">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path}
                className={`font-mono text-sm flex items-center gap-2 transition-colors duration-300 py-2 ${
                  isActive(item.path) 
                    ? "text-vesper-gold" 
                    : "text-gray-400 hover:text-vesper-teal"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            
            <button 
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }} 
              className="font-mono text-sm text-vesper-accent flex items-center gap-2 hover:text-red-400 transition-colors duration-300 py-2 w-full"
            >
              <LogOut size={18} />
              LOGOUT
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
