
import React, { useEffect, useState } from "react";
import { formatCurrentDate, formatStardate, getCurrentTime, getRandomQuote } from "@/utils/dateUtils";

const StatusDisplay: React.FC = () => {
  const [time, setTime] = useState(getCurrentTime());
  const [quote, setQuote] = useState(getRandomQuote());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Change quote every 2 hours
    const quoteTimer = setInterval(() => {
      setQuote(getRandomQuote());
    }, 2 * 60 * 60 * 1000); // 2 hours in milliseconds
    
    return () => clearInterval(quoteTimer);
  }, []);

  return (
    <div className="vesper-panel animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col">
          <h2 className="text-vesper-gold font-mono text-sm">EARTH DATE</h2>
          <p className="text-vesper-teal text-xl">{formatCurrentDate()}</p>
          
          <h2 className="text-vesper-gold font-mono text-sm mt-4">STARDATE</h2>
          <p className="text-vesper-teal text-xl">{formatStardate()}</p>
          
          <h2 className="text-vesper-gold font-mono text-sm mt-4">SYSTEM TIME</h2>
          <p className="text-vesper-teal text-xl">{time}</p>
        </div>
        
        <div className="flex flex-col md:items-end md:text-right">
          <h2 className="text-vesper-gold font-mono text-sm">COMMANDER MESSAGE</h2>
          <div className="border-l-2 border-vesper-teal/30 pl-3 mt-2">
            <p className="text-white italic">"{quote.quote}"</p>
            <p className="text-vesper-teal text-sm mt-1">— {quote.author}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusDisplay;
