import React, { createContext, useState, useEffect } from 'react';


export const UserContext = createContext(null);
const UserProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [loading, setLoading] = useState(true);

    //Fetch the current user profile if there's an active session
    useEffect(() => {
        fetch('/api/users/profile', { credentials: 'include' })
        .then((res) => {
            if (res.ok) return res.json();
            throw new Error('Not authenticated');
        })
        .then((data) => {
            setUser(data),
            setLoading(false);
        })
        .catch((err) => {
            console.log('No active session found:', err.message);
            setUser(null);
            setLoading(false);
        });
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
}
export default UserProvider;