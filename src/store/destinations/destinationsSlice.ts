import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Destination } from '../../types/types';

type DestinationsState = {
    destinations: Destination[];
    isLoading: boolean;
    hasError: string | null;
};

const initialState: DestinationsState = {
    destinations: [],
    isLoading: false,
    hasError: null,
};

export const destinationsSlice = createSlice({
    name: 'destinations',
    initialState,
    reducers: {
        setDestinations(state, action: PayloadAction<Destination[]>) {
            state.destinations = action.payload || [];
            state.isLoading = false;
            state.hasError = null;
        },
        setDestinationsLoading(state) {
            state.isLoading = true;
            state.hasError = null;
        },
        setDestinationsError(state, action: PayloadAction<null | string>) {
            state.hasError = action.payload;
            state.isLoading = false;
        },
    },
});

export const destinationsActions = destinationsSlice.actions;

export default destinationsSlice.reducer;
