import React, { useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import { fetchUserProfile } from '../api/auth';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to revalidate the session and update state
  const revalidateUser = () => {
    fetchUserProfile()
      .then((data) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setLoading(false);
      })
      .catch((err) => {
        console.log("No active session found:", err.message);
        setUser(null);
        localStorage.removeItem("user");
        setLoading(false);
      });
  };

  useEffect(() => {
    // Check localStorage for cached user data
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    }
    // Revalidate with the backend
    revalidateUser();

    // Listen for history changes (back/forward navigation)
    const handlePopState = () => {
      revalidateUser();
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
