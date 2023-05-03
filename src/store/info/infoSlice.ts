import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SingleInfoItem } from '../../types/types';

type InfoState = {
    posts: SingleInfoItem[];
    isLoading: boolean;
    hasError: null | string;
};

const initialState: InfoState = {
    posts: [],
    isLoading: false,
    hasError: null,
};

export const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        setInfo(state, action: PayloadAction<SingleInfoItem[]>) {
            state.posts = action.payload || [];
            state.isLoading = false;
            state.hasError = null;
        },
        setInfoIsLoading(state) {
            state.isLoading = true;
            state.hasError = null;
        },
        setInfoError(state, action: PayloadAction<null | string>) {
            state.hasError = action.payload;
            state.isLoading = false;
        },
    },
});

export const infoActions = infoSlice.actions;

export default infoSlice.reducer;
