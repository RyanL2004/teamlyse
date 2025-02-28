// client/src/hooks/useAuth.js
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { logout as apiLogout } from '../api/auth'; // your logout API function
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await apiLogout(); // Call the api logout endpoint
      setUser(null); // Clear the User session state 
      navigate('/login'); // Redirect to the login page after user session is cleared
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  return { logout };
}
