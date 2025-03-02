import React, { useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import { fetchUserProfile } from '../api/auth';
import { useLocation } from 'react-router-dom';
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Function to revalidate the session and update state
  const revalidateUser = async () => {
    setLoading(true);
    try{
      const data = await fetchUserProfile();
      setUser(data);
    }
    catch (err) {
      console.log("No active session found:", err.message);
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Always Revalidate the User session on mount or route changes
    revalidateUser();
    }, [location.pathname]);
    

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
