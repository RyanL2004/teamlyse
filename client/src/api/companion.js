const API_URL = import.meta.env.VITE_API_URL

// Fetch Companions API
export async function fetchCompanions() {
    try {
        const response = await fetch(`${API_URL}/api/companions`, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch companions');
        }
        const data = await response.json();
        return data;
    }
    
    catch (error) {
        console.error('Error fetching companions:', error);
        throw error;
    }
}

//fetch a single companion by ID
export async function getCompanionById(companionId) {
    try{
        const response = await fetch(`${API_URL}/api/companions/${companionId}`, {
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch companion details');
        }
        const data = await response.json();
        return data; // companion object expected to be returned

    }
    catch (error) {
        console.error('Error fetching companion by ID:', error);
        throw error;
    }
}