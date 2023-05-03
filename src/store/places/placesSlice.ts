import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Place } from '../../types/types';

type PlacesState = {
    places: Place[];
    isLoading: boolean;
    hasError: null | string;
};

const initialState: PlacesState = {
    places: [],
    isLoading: false,
    hasError: null,
};

export const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {
        setPlaces(state, action: PayloadAction<Place[]>) {
            state.places = action.payload || [];
            state.isLoading = false;
            state.hasError = null;
        },
        setPlacesLoading(state) {
            state.isLoading = true;
            state.hasError = null;
        },
        setPlacesError(state, action: PayloadAction<null | string>) {
            state.hasError = action.payload;
            state.isLoading = false;
        },
    },
});

export const placesActions = placesSlice.actions;

export default placesSlice.reducer;
