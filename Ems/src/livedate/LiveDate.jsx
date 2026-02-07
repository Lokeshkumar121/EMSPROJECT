import React, { useState, useEffect } from 'react';

const LiveDate = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // update every second
    return () => clearInterval(timer); // cleanup
  }, []);

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return (
    <div className="text-gray-300 font-medium text-sm ">
      {currentDate.toLocaleDateString(undefined, options)} {currentDate.toLocaleTimeString()}
    </div>
  );
};

export default LiveDate;
