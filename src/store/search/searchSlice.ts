import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type ReviewsState = {
    searchString: string;
};

const initialState: ReviewsState = {
    searchString: '',
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearch(state, action: PayloadAction<string>) {
            state.searchString = action.payload;
        },
    },
});

export const searchActions = searchSlice.actions;

export default searchSlice.reducer;
