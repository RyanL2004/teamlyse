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
      await apiLogout(); // Call the API logout
      localStorage.removeItem("user"); // Clear any cached user data
      setUser(null); // Clear the context
      // Force a full page reload so that any cached state in the browser is cleared
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  return { logout };
}
