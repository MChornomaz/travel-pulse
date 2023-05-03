import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Review } from '../../types/types';

type ReviewsState = {
    reviews: Review[];
    isLoading: boolean;
    hasError: null | string;
};

const initialState: ReviewsState = {
    reviews: [],
    isLoading: false,
    hasError: null,
};

export const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        setReviews(state, action: PayloadAction<Review[]>) {
            state.reviews = action.payload || [];
            state.isLoading = false;
            state.hasError = null;
        },
        setReviewsLoading(state) {
            state.isLoading = true;
            state.hasError = null;
        },
        setReviewsError(state, action: PayloadAction<null | string>) {
            state.hasError = action.payload;
            state.isLoading = false;
        },
        addReview(state, action: PayloadAction<Review>) {
            state.reviews = [...state.reviews, action.payload];
        },
    },
});

export const reviewsActions = reviewsSlice.actions;

export default reviewsSlice.reducer;
