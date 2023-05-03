import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { StoryShort } from '../../types/types';

type StoriesState = {
    stories: StoryShort[];
    isLoading: boolean;
    hasError: null | string;
};

const initialState: StoriesState = {
    stories: [],
    isLoading: false,
    hasError: null,
};

export const storiesSlice = createSlice({
    name: 'stories',
    initialState,
    reducers: {
        setStories(state, action: PayloadAction<StoryShort[]>) {
            state.stories = action.payload || [];
            state.isLoading = false;
            state.hasError = null;
        },
        setIsLoading(state) {
            state.isLoading = true;
            state.hasError = null;
        },
        setError(state, action: PayloadAction<null | string>) {
            state.hasError = action.payload;
            state.isLoading = false;
        },
    },
});

export const storiesActions = storiesSlice.actions;

export default storiesSlice.reducer;
