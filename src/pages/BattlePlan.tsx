
import React from "react";
import MainLayout from "@/components/Layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import WeeklyCalendar from "@/components/BattlePlan/WeeklyCalendar";

const BattlePlan = () => {
  const currentDate = new Date();
  
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl md:text-4xl font-mono text-vesper-gold mb-2">
            Daily Battle Plan
          </h1>
          <p className="text-gray-400">
            {format(currentDate, "MMMM d, yyyy")} • Tactical Operations Overview
          </p>
        </div>

        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="bg-vesper-navy/30 border border-vesper-navy">
            <TabsTrigger value="weekly">WEEKLY VIEW</TabsTrigger>
            <TabsTrigger value="tasks">TASKS</TabsTrigger>
            <TabsTrigger value="notes">NOTES</TabsTrigger>
            <TabsTrigger value="energy">ENERGY</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly" className="mt-6">
            <WeeklyCalendar />
          </TabsContent>
          
          <TabsContent value="tasks">
            <div className="vesper-panel">
              <h2 className="vesper-header text-xl mb-6">Tasks Module</h2>
              <p className="text-gray-400">Task management coming soon.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="notes">
            <div className="vesper-panel">
              <h2 className="vesper-header text-xl mb-6">Field Notes</h2>
              <p className="text-gray-400">Notes module coming soon.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="energy">
            <div className="vesper-panel">
              <h2 className="vesper-header text-xl mb-6">Energy Tracking</h2>
              <p className="text-gray-400">Energy tracking coming soon.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default BattlePlan;
