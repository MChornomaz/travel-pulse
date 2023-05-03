import { AppDispatch } from '../store';
import { reviewsActions } from './reviewsSlice';

export const fetchReviews = () => {
    return async (dispatch: AppDispatch) => {
        const fetchData = async () => {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/reviews`);

            if (!response.ok) {
                throw new Error('Could not fetch reviews data!');
            }
            const data = await response.json();

            return data;
        };

        try {
            const reviewsData = await fetchData();
            dispatch(reviewsActions.setReviewsLoading);
            dispatch(reviewsActions.setReviews(reviewsData));
        } catch (error) {
            dispatch(reviewsActions.setReviewsError('Fetching reviews failed!'));
        }
    };
};
