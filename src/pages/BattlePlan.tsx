
import React, { useState } from "react";
import MainLayout from "@/components/Layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import WeeklyCalendar from "@/components/BattlePlan/WeeklyCalendar";
import MonthlyCalendar from "@/components/BattlePlan/MonthlyCalendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDays, CalendarRange, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const BattlePlan = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState<"weekly" | "monthly">("weekly");
  const { toast } = useToast();
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Display toast notification
    toast({
      title: "File uploaded",
      description: `${file.name} has been uploaded. Calendar parsing functionality is coming soon.`,
      duration: 5000,
    });
    
    // Reset the input
    event.target.value = '';
  };
  
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-mono text-vesper-gold mb-2">
              Daily Battle Plan
            </h1>
            <p className="text-gray-400">
              {format(currentDate, "MMMM d, yyyy")} • Tactical Operations Overview
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex border border-vesper-navy rounded-md overflow-hidden">
              <Button 
                variant="ghost" 
                size="sm"
                className={`rounded-none ${calendarView === 'weekly' ? 'bg-vesper-navy/50' : ''}`}
                onClick={() => setCalendarView("weekly")}
              >
                <CalendarRange className="h-4 w-4 mr-2" />
                Week
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className={`rounded-none ${calendarView === 'monthly' ? 'bg-vesper-navy/50' : ''}`}
                onClick={() => setCalendarView("monthly")}
              >
                <CalendarDays className="h-4 w-4 mr-2" />
                Month
              </Button>
            </div>
            
            <div className="relative">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import
                <Input
                  type="file"
                  accept=".ics,.csv,.xlsx,.pdf"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileUpload}
                />
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          {calendarView === "weekly" ? (
            <WeeklyCalendar selectedDate={currentDate} />
          ) : (
            <MonthlyCalendar 
              selectedDate={currentDate} 
              onDateChange={(date) => date && setCurrentDate(date)} 
            />
          )}
        </div>

        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="bg-vesper-navy/30 border border-vesper-navy">
            <TabsTrigger value="weekly">WEEKLY VIEW</TabsTrigger>
            <TabsTrigger value="tasks">TASKS</TabsTrigger>
            <TabsTrigger value="notes">NOTES</TabsTrigger>
            <TabsTrigger value="energy">ENERGY</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly" className="mt-6">
            {/* Weekly calendar is now shown above the tabs */}
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
