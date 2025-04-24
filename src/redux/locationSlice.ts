import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

interface LocationState {
    destinations: string[];
    departureLocations: string[];
    loading: boolean;
    error: string | null;
}

const initialState: LocationState = {
    destinations: [],
    departureLocations: [],
    loading: false,
    error: null,
};

export const fetchLocations = createAsyncThunk(
    'location/fetchLocations',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${baseURL}/public/tours/locations`);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
);

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchLocations.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchLocations.fulfilled, (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.departureLocations = action.payload.departure_locations;
          state.destinations = action.payload.destinations;
        })
        .addCase(fetchLocations.rejected, (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
});

export default locationSlice.reducer;

