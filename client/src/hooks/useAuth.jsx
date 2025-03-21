// client/src/hooks/useAuth.js
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { logout as apiLogout } from '../api/auth'; // API logout function
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearMeetings } from '@/store/meetingsSlice'; //  Import the Redux action

export function useAuth() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch(); //  Initialize dispatch from Redux

  const logout = async () => {
    try {
      await apiLogout(); //  Call the API logout function
      dispatch(clearMeetings()); //  Clear meetings from Redux store
      setUser(null); //  Clear the User session state
      localStorage.removeItem("meetings"); // Second Remove meetings from localStorage
      navigate('/login'); //  Redirect to the login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return { logout };
}


