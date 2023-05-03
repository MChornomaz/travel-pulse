import { AppDispatch } from '../store';
import { storiesActions } from './storiesSlice';

export const fetchStories = () => {
    return async (dispatch: AppDispatch) => {
        const fetchData = async () => {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/stories`);

            if (!response.ok) {
                throw new Error('Could not fetch stories!');
            }
            const data = await response.json();

            return data;
        };

        try {
            const storiesData = await fetchData();
            dispatch(storiesActions.setIsLoading);
            dispatch(storiesActions.setStories(storiesData));
        } catch (error) {
            dispatch(storiesActions.setError('Fetching stories failed!'));
        }
    };
};
