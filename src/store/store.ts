import { configureStore } from '@reduxjs/toolkit';
import infoReducer from './info/infoSlice';
import storiesReducer from './stories/storiesSlice';
import destinationsReducer from './destinations/destinationsSlice';
import placesReducer from './places/placesSlice';
import reviewsReducer from './reviews/reviewsSlice';
import searchReducer from './search/searchSlice';
import userReducer from './user/userSlice';

export const store = configureStore({
    reducer: {
        info: infoReducer,
        stories: storiesReducer,
        destinations: destinationsReducer,
        places: placesReducer,
        reviews: reviewsReducer,
        search: searchReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const selectInfo = (state: RootState) => state.info;
export const selectStories = (state: RootState) => state.stories;
export const selectDestinations = (state: RootState) => state.destinations;
export const selectPlaces = (state: RootState) => state.places;
export const selectReviews = (state: RootState) => state.reviews;
export const selectSearch = (state: RootState) => state.search;
export const selectUser = (state: RootState) => state.user;
