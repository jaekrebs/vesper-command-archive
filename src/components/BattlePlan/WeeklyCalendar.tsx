
import React from "react";
import { startOfWeek, addDays, format } from "date-fns";
import BattleDay from "./BattleDay";

interface WeeklyCalendarProps {
  selectedDate?: Date;
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ selectedDate = new Date() }) => {
  const startDate = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Start on Monday
  const weekDays = Array.from({ length: 5 }).map((_, index) => 
    addDays(startDate, index)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {weekDays.map((date) => (
        <BattleDay key={date.toString()} date={date} />
      ))}
    </div>
  );
};

export default WeeklyCalendar;
