
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { startOfWeek, addDays, format } from "date-fns";

const WeeklyCalendar = () => {
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 }); // Start on Monday
  const weekDays = Array.from({ length: 5 }).map((_, index) => 
    addDays(startDate, index)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {weekDays.map((date) => (
        <Card key={date.toString()} className="bg-vesper-navy/20 border-vesper-navy/30">
          <CardContent className="p-4">
            <div className="text-vesper-teal font-mono mb-2">
              {format(date, "EEEE").toUpperCase()}
            </div>
            <div className="text-sm text-gray-400">
              {format(date, "MMM d")}
            </div>
            <div className="mt-4 text-sm text-gray-300">
              No events scheduled
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WeeklyCalendar;
