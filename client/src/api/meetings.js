const API_URL = import.meta.env.VITE_API_URL


// Fetch Scheduled Meetings
export async function fetchUpcomingMeetings() {
    try {
        const response = await fetch(`${API_URL}/api/meetings/upcoming`, {
            credentials: 'include'
        });

        if (!response.ok){
            throw new Error('Failed to fetch upcoming meetings');
        }


        const data = await response.json();
        console.log("Meetings received from API:", data); // Debuging the API response 
        return data;

    } catch (error) {
        console.error('Error fetching upcoming meetings:', error);
        throw error;
    }
};

// Fetch Create a new meeting 
export async function createMeeting(meetingData) {
    try {
        console.log("1 SendingMeeting Data to Backend:", meetingData);
    // Create the server's response behaviour
    const response = await fetch(`${API_URL}/api/meetings`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(meetingData),
    });

    // Check if server is responding to req
    if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Server Error Response:", errorResponse); // Print the server error 
        throw new Error('Failder to create meeting');
    };
    return await response.json();

    }
    catch (error) {
        console.error('Error Creating a new meeting', error)
        throw error;
    }
};

// fetch Update an existing meeting

export async function updateMeeting( meetingId, updateData ) {
    try {

        const response = await fetch(`${API_URL}/api/meetings/${meetingId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(updateData),
        });

        if (!response.ok) {
            throw new Error ('Failed to update the meeting')
        };

        return await response.json();

    }
    catch (error) {
        console.error('Failed to update the scheduled meeting', error);
        throw error;
    }
};

// Fetch Delete Meeting 
export async function deleteMeeting (meetingId) {
    try {

        const response = await fetch (`${API_URL}/api/meetings/${meetingId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type' : 'application/json'
            },

        });

        if (!response.ok) {
            throw new Error ('Failed to delete the chosen meeting');
        }

        return await response.json();
    }
    catch (error) {
        console.error('Failed to delete the meeting', error);
        throw error;
    }
}