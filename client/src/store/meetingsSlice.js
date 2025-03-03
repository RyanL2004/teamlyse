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




    // TODO: Analyse that further 
const meetingsSlice = createSlice({
    name: 'meetings',
    initialState: {
        meetings: [],
        loading: false,
        error: null,
    },
    reducers: {
        addMeeting: (state, action) => {
            state.meetings.push(action.payload);
        },

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
            state.meetings = action.payload;
        })
        .addCase(fetchUpcomingMeetings.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // Create meeting 
        .addCase(createMeeting.fulfilled, (state, action) => {
            state.meetings.push(action.payload);
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

export const { addMeeting } = meetingsSlice.actions;
export default meetingsSlice.reducer;