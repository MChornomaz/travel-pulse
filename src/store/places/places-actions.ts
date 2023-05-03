import { AppDispatch } from '../store';
import { placesActions } from './placesSlice';

export const fetchPlaces = () => {
    return async (dispatch: AppDispatch) => {
        const fetchData = async () => {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/places`);

            if (!response.ok) {
                throw new Error('Could not fetch places data!');
            }
            const data = await response.json();

            return data;
        };

        try {
            const placesData = await fetchData();
            dispatch(placesActions.setPlacesLoading);
            dispatch(placesActions.setPlaces(placesData));
        } catch (error) {
            dispatch(placesActions.setPlacesError('Fetching places failed!'));
        }
    };
};
