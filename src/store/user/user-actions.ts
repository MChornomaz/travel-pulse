import { NewUser, UserLogin } from '../../types/types';
import { AppDispatch } from '../store';
import { userActions } from './userSlice';

export const signUpUser = (user: NewUser) => {
    return async (dispatch: AppDispatch) => {
        const fetchData = async (user: NewUser) => {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                });

                if (response.ok) {
                    const responseData = await response.json();
                    localStorage.setItem('userName', responseData.userName);
                    localStorage.setItem('role', responseData.role);
                    localStorage.setItem('token', responseData.token);
                    localStorage.setItem('email', responseData.email);
                    return responseData;
                }
            } catch (error) {
                console.log(error);
            }
        };

        try {
            const reviewsData = await fetchData(user);
            dispatch(userActions.setUserLoading);
            dispatch(userActions.setUser(reviewsData));
        } catch (error) {
            dispatch(userActions.setUserError('Sign up failed!'));
        }
    };
};

export const logInUser = (user: UserLogin) => {
    return async (dispatch: AppDispatch) => {
        const fetchData = async (user: UserLogin) => {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                });

                if (response.ok) {
                    const responseData = await response.json();
                    localStorage.setItem('userName', responseData.userName);
                    localStorage.setItem('role', responseData.role);
                    localStorage.setItem('token', responseData.token);
                    localStorage.setItem('email', responseData.email);
                    return responseData;
                }
            } catch (error) {
                console.log(error);
            }
        };

        try {
            const reviewsData = await fetchData(user);

            dispatch(userActions.setUserLoading);
            dispatch(userActions.setUser(reviewsData));
        } catch (error) {
            dispatch(userActions.setUserError('User was not found check email and password'));
        }
    };
};
