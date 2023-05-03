import { AppDispatch } from '../store';
import { infoActions } from './infoSlice';

export const fetchInfo = () => {
    return async (dispatch: AppDispatch) => {
        const fetchData = async () => {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/info`);

            if (!response.ok) {
                throw new Error('Could not fetch info data!');
            }
            const data = await response.json();

            return data;
        };

        try {
            const infoData = await fetchData();
            dispatch(infoActions.setInfoIsLoading);
            dispatch(infoActions.setInfo(infoData));
        } catch (error) {
            dispatch(infoActions.setInfoError('Fetching info failed!'));
        }
    };
};
