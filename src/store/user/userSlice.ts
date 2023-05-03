import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserExisting, User } from '../../types/types';

const initialState: User = {
    isAuth: false,
    userName: '',
    role: '',
    token: '',
    userIsLoading: false,
    userHasError: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserExisting>) {
            state.isAuth = true;
            state.userName = action.payload.userName;
            state.role = action.payload.role;
            state.token = action.payload.token;
            state.userIsLoading = false;
            state.userHasError = null;
        },
        logOutUser(state) {
            state.isAuth = false;
            state.userName = '';
            state.role = '';
            state.token = '';
            state.userIsLoading = false;
            state.userHasError = null;
        },
        setUserLoading(state) {
            state.userIsLoading = true;
            state.userHasError = null;
        },
        setUserError(state, action: PayloadAction<null | string>) {
            state.userHasError = action.payload;
            state.userIsLoading = false;
        },
    },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
