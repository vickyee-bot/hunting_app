import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Import AuthContext to get user info

const Greeting = () => {
  const { user } = useAuth(); // Get user from AuthContext
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const getGreeting = () => {
      const hours = new Date().getHours();

      if (hours < 12) return "Good Morning";
      if (hours < 18) return "Good Afternoon";
      return "Good Evening";
    };

    setGreeting(getGreeting()); // Set initial greeting

    // Update greeting every minute in case the time changes
    const interval = setInterval(() => setGreeting(getGreeting()), 60000);

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  return (
    <h2 className="text-xl font-semibold">
      {greeting}, {user?.firstName || "Guest"}
    </h2>
  );
};

export default Greeting;
