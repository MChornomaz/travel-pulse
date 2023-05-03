import { AppDispatch } from '../store';
import { destinationsActions } from './destinationsSlice';

export const fetchDestinations = () => {
    return async (dispatch: AppDispatch) => {
        const fetchData = async () => {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/destinations`);

            if (!response.ok) {
                throw new Error('Could not fetch info data!');
            }
            const data = await response.json();

            return data;
        };

        try {
            const destinationsData = await fetchData();
            dispatch(destinationsActions.setDestinationsLoading);
            dispatch(destinationsActions.setDestinations(destinationsData));
        } catch (error) {
            dispatch(destinationsActions.setDestinationsError('Fetching info failed!'));
        }
    };
};
