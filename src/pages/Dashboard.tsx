
import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import StatusDisplay from "@/components/UI/StatusDisplay";
import CommandButton from "@/components/UI/CommandButton";
import { Calendar, BookOpen, Archive, Clock, Settings } from "lucide-react";

const Dashboard: React.FC = () => {
  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl md:text-4xl font-mono text-vesper-gold mb-2">
            Welcome, Commander S'Tari
          </h1>
          <p className="text-gray-400">
            Your private command bridge is ready. What would you like to access today?
          </p>
        </div>
        
        <StatusDisplay />
        
        <div className="vesper-panel">
          <h2 className="vesper-header text-xl mb-6">Command Modules</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/battle-plan" className="vesper-card p-6 hover:border-vesper-teal/50 transition-colors duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-vesper-navy p-3 rounded-full">
                  <Calendar className="text-vesper-gold" size={24} />
                </div>
                <div>
                  <h3 className="font-mono text-vesper-teal text-lg mb-1">Daily Battle Plan</h3>
                  <p className="text-sm text-gray-400">Manage your tasks, schedule, and energy tracking</p>
                </div>
              </div>
            </Link>
            
            <Link to="/characters" className="vesper-card p-6 hover:border-vesper-teal/50 transition-colors duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-vesper-navy p-3 rounded-full">
                  <BookOpen className="text-vesper-gold" size={24} />
                </div>
                <div>
                  <h3 className="font-mono text-vesper-teal text-lg mb-1">Character Sheets</h3>
                  <p className="text-sm text-gray-400">View and manage character profiles and abilities</p>
                </div>
              </div>
            </Link>
            
            <Link to="/archives" className="vesper-card p-6 hover:border-vesper-teal/50 transition-colors duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-vesper-navy p-3 rounded-full">
                  <Archive className="text-vesper-gold" size={24} />
                </div>
                <div>
                  <h3 className="font-mono text-vesper-teal text-lg mb-1">Archives Browser</h3>
                  <p className="text-sm text-gray-400">Access documents, notes, and reference materials</p>
                </div>
              </div>
            </Link>
            
            <Link to="/logs" className="vesper-card p-6 hover:border-vesper-teal/50 transition-colors duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-vesper-navy p-3 rounded-full">
                  <Clock className="text-vesper-gold" size={24} />
                </div>
                <div>
                  <h3 className="font-mono text-vesper-teal text-lg mb-1">Logs Timeline</h3>
                  <p className="text-sm text-gray-400">View chronological records of events and reflections</p>
                </div>
              </div>
            </Link>
            
            <Link to="/settings" className="vesper-card p-6 hover:border-vesper-teal/50 transition-colors duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-vesper-navy p-3 rounded-full">
                  <Settings className="text-vesper-gold" size={24} />
                </div>
                <div>
                  <h3 className="font-mono text-vesper-teal text-lg mb-1">Settings Panel</h3>
                  <p className="text-sm text-gray-400">Configure system preferences and user profile</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        
        <div className="vesper-panel">
          <h2 className="vesper-header text-xl mb-6">Mission Status</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-vesper-gold pl-4 py-2">
              <h3 className="font-mono text-vesper-teal">Current Mission</h3>
              <p className="text-white">Building the VESPERCORE Command Bridge</p>
              <div className="w-full bg-vesper-black rounded-full h-2 mt-2">
                <div className="bg-vesper-gold h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
              <div className="text-xs text-gray-400 mt-1">Progress: 40%</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="vesper-card p-4">
                <h4 className="text-xs font-mono text-vesper-gold mb-2">PENDING TASKS</h4>
                <ul className="list-disc list-inside text-sm space-y-1 text-gray-300">
                  <li>Complete module integration</li>
                  <li>Set up character sheet templates</li>
                  <li>Configure archive system structure</li>
                </ul>
              </div>
              
              <div className="vesper-card p-4">
                <h4 className="text-xs font-mono text-vesper-gold mb-2">SYSTEM HEALTH</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Core Systems</span>
                      <span>Optimal</span>
                    </div>
                    <div className="w-full bg-vesper-black rounded-full h-1.5 mt-1">
                      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Memory Usage</span>
                      <span>Stable</span>
                    </div>
                    <div className="w-full bg-vesper-black rounded-full h-1.5 mt-1">
                      <div className="bg-vesper-teal h-1.5 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Neural Networks</span>
                      <span>Adapting</span>
                    </div>
                    <div className="w-full bg-vesper-black rounded-full h-1.5 mt-1">
                      <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
