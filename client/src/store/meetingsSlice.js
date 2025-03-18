import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
     fetchUpcomingMeetings as fetchMeetingsAPI,
     createMeeting as createMeetingAPI,
     updateMeeting as updateMeetingAPI,
     deleteMeeting as deleteMeetingAPI,
     } from '@/api/meetings';


     // State for Fetch upcoming meetings 
export const fetchUpcomingMeetings = createAsyncThunk(
    'meetings/fetchUpcoming',
    async (_, thunkAPI) => {
        try {
            const data = await fetchMeetingsAPI();
            return data;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// State for Fetch create a new meeting 
export const createMeeting = createAsyncThunk(
    'meeting/create',
    async (meetingData, thunkAPI) => {
        try{ 
            const response = await createMeetingAPI(meetingData);

            //response.meeting should contain the new meeting and its data 
            return response.meeting
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// State for Fetch update a meeting 
export const updateMeetingThunk = createAsyncThunk(
    'meetings/update',
    async ({ meetingId, updateData }, thunkAPI) => {
        try {
            const updatedMeeting = await updateMeetingAPI(meetingId, updateData);
            // response.updatedMeeting should contain the new updated meeting data
            return updatedMeeting
        }
        catch (error) {
           return thunkAPI.rejectWithValue(error.message);
        }
    }
)

// State for Fetch delete a meeting 
export const deleteMeetingThunk = createAsyncThunk (
    'meetings/delete', 
    async (meetingId, thunkAPI) => {
        try{ 
            await deleteMeetingAPI (meetingId);

            //return the meetingId so we can remove it from the state 
            return meetingId
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const loadState = () => {
    try {
        const serializedState = localStorage.getItem("meetings");
        if (serializedState) {
            const parsedState = JSON.parse(serializedState);
            return Array.isArray(parsedState) ? parsedState : [];
        }
        return [];
    } catch (error) {
        console.error("Failed to load state from localStorage", error);
        return [];
    }
};



    // TODO: Analyse that further 
const meetingsSlice = createSlice({
    name: 'meetings',
    initialState: {
        meetings: loadState(), // load from localStorage
        loading: false,
        error: null,
    },
    reducers: {
        addMeeting: (state, action) => {
            state.meetings.push(action.payload);
        },

        //Add reducer to clear meetings from localStorage after user logout
        clearMeetings: (state) => {
            state.meetings = [];
            localStorage.removeItem("meetings"); // Remove from l0cal Storage 
        }

        // TODO: Other reducers as needed
    },
    extraReducers: (builder) => {
        builder

        //fetch meetings 
        .addCase(fetchUpcomingMeetings.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(fetchUpcomingMeetings.fulfilled, (state, action) => {
            state.loading = false;
            
            if (Array.isArray(action.payload.meetings) && action.payload.meetings.length > 0) {
                console.log(" Updating Redux Store with Fetched Meetings:", action.payload.meetings);  
                
                state.meetings = action.payload.meetings;  //  Update Redux store correctly
        
                try {
                    localStorage.setItem("meetings", JSON.stringify(action.payload.meetings));  // ✅ Save to localStorage
                } catch (error) {
                    console.error(" Failed to save meetings to localStorage", error);
                }
            } else {
                console.warn("⚠ No meetings found in API response, clearing state.");
                state.meetings = [];
                localStorage.removeItem("meetings");  //  Remove stored data if empty
            }
        })
        
        
        .addCase(fetchUpcomingMeetings.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // Create meeting 
        .addCase(createMeeting.fulfilled, (state, action) => {
            if (action.payload) {
                console.log("New Meeting Added:", action.payload); //  Debugging
                state.meetings.push(action.payload); //  Add new meeting directly
                state.meetings.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                // UF: 10RLAO01YU04
                // Store in localStorage immediately
                try {
                    localStorage.setItem("meetings", JSON.stringify(state.meetings));
                } catch (error) {
                    console.error("Failed to save meeting to localStorage", error);
                }
            }
        })
        

        //Update meeting 
        .addCase(updateMeetingThunk.fulfilled, (state, action) => {
            const index = state.meetings.findIndex(
                (meeting) => meeting._id === action.payload
            );
            if (index !== -1) {
                state.meetings[index] = action.payload;
            }
        })


        // Delete meeting 
        .addCase(deleteMeetingThunk.fulfilled, (state, action) => {
            state.meetings = state.meetings.filter(
                (meeting) => meeting._id !== action.payload
            );
        });
    },
});

export const { addMeeting, clearMeetings } = meetingsSlice.actions;
export default meetingsSlice.reducer;