import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCompanions, getCompanionById } from '../api/companion';

export const loadCompanions = createAsyncThunk(

    'companions/load',
    async (_, thunkAPI) => {
        try {
            const data = await fetchCompanions();
            return data.companions; // assuming the API returns { companions: [...] }  
            
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)


const companionsSlice = createSlice({
    name: "companion",
    initialState: {
        companionsList: [],
        selectedCompanionId: null,
        loading: false,
        error: null,
    },
    reducers: {
        setSelectedCompanionId(state, action) {
            state.selectedCompanionId = action.payload;
        },
        clearSelectedCompanion: (state) => {
            state.selectedCompanionId = null;
        },
        hydrateSelectedCompanion: (state, action) => {
            const savedId = localStorage.getItem('selectedCompanionId');
            if (savedId) {
                state.selectedCompanionId = savedId;
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadCompanions.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loadCompanions.fulfilled, (state, action) => {
            state.loading = false;
            state.companionsList = action.payload;
        })
        .addCase(loadCompanions.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload;
        });    
    },
});


export const {setSelectedCompanionId, clearSelectedCompanion, hydrateSelectedCompanion } = companionsSlice.actions;
export default companionsSlice.reducer;
