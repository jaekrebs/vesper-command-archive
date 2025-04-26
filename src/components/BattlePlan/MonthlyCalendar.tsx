
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";

interface MonthlyCalendarProps {
  selectedDate?: Date;
  onDateChange?: (date: Date | undefined) => void;
}

const MonthlyCalendar: React.FC<MonthlyCalendarProps> = ({ 
  selectedDate = new Date(),
  onDateChange 
}) => {
  return (
    <Card className="bg-vesper-navy/20 border-vesper-navy/30">
      <CardContent className="p-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateChange}
          className="p-3 pointer-events-auto rounded-md border-vesper-navy/30 bg-vesper-navy/10"
          classNames={{
            day_selected: "bg-vesper-gold text-black hover:bg-vesper-gold hover:text-black",
            day_today: "bg-vesper-navy text-vesper-teal",
            caption_label: "text-vesper-teal font-mono",
            head_cell: "text-vesper-teal/60 font-mono",
          }}
        />
      </CardContent>
    </Card>
  );
};

export default MonthlyCalendar;
