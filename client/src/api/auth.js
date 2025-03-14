// Get the API URL from the environment variable
// DRY: Create a function that handles the fetch User api logic and make it reusable accross different components 
const API_URL = import.meta.env.VITE_API_URL;


console.log('API_URL:', import.meta.env.VITE_API_URL)
// Function to fetch User sign up 
export async function signUp (name, email, password) {
    const response = await fetch(`${API_URL}/api/users/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ name, email, password }),
    });

    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Sign-up failded');
    }

    return response.json();  // Returns the user data if sign-up is successful
}

// Function to fetch User sign in
export async function signIn (email, password) {
    const response = await fetch(`${API_URL}/api/users/signin`, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        credentials: 'include', // Use of cookies/session
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error( errorData.error || 'Sign-in failed');
    }

    return response.json();
}


// Function to fetch the current user's profile 
export async function fetchUserProfile() {
    const response = await fetch(`${API_URL}/api/users/profile`, {
        credentials: 'include'
    });

    if(!response.ok) {
        throw new Error('Not authenticated');
    }
    return response.json();
}

// Function to Logout, fetch and Kill User Session

export async function logout() {
    try {
        const response = await fetch(`${API_URL}/api/users/logout`, {
            method: 'POST',
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Logout failed");
        }

        
        return response.json();
    }
    catch (error) {
        console.error("Logout Error", error);
        throw error;
    }
}
  