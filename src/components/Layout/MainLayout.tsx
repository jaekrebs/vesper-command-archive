import React from "react";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "@/context/AuthContext";
interface MainLayoutProps {
  children: React.ReactNode;
}
const MainLayout: React.FC<MainLayoutProps> = ({
  children
}) => {
  const {
    isAuthenticated
  } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow vesper-container py-8">
        {children}
      </main>
      <footer className="border-t border-vesper-navy/30 py-4">
        <div className="vesper-container">
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">VESPERCORE / COMMANDER</div>
            <div className="text-xs text-gray-500">
              PRIVATE COMMAND ARCHIVE
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default MainLayout;