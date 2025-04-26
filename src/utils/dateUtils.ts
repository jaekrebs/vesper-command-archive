
// Format the current date in standard format
export const formatCurrentDate = (): string => {
  const now = new Date();
  return now.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

// Format the current date in stardate format (loosely based on Star Trek)
export const formatStardate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  
  // Create a very simple stardate format: [YY].[MM][DD].[random digit]
  const yearDigits = year.toString().slice(-2);
  const monthDay = month.toString().padStart(2, '0') + day.toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10);
  
  return `${yearDigits}.${monthDay}.${random}`;
};

// Get the current time in 24-hour format
export const getCurrentTime = (): string => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });
};

// Get a motivational quote
export const getRandomQuote = (): { quote: string, author: string } => {
  const quotes = [
    { quote: "The stars are better off without us.", author: "Interstellar" },
    { quote: "I create myself.", author: "Doctor Who" },
    { quote: "There is a difference between knowing the path and walking the path.", author: "The Matrix" },
    { quote: "Fear is the mind-killer.", author: "Dune" },
    { quote: "Time is an illusion. Lunchtime doubly so.", author: "The Hitchhiker's Guide to the Galaxy" },
    { quote: "With great power comes great responsibility.", author: "Spider-Man" },
    { quote: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
    { quote: "Do or do not. There is no try.", author: "Yoda" },
    { quote: "It's not who I am underneath, but what I do that defines me.", author: "Batman" },
    { quote: "Every moment is a fresh beginning.", author: "T.S. Eliot" },
    { quote: "I'll be back.", author: "The Terminator" },
    { quote: "May the Force be with you.", author: "Star Wars" },
  ];
  
  return quotes[Math.floor(Math.random() * quotes.length)];
};
