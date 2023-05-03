import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import MainPage from './pages/MainPage/MainPage';
import Footer from './components/Footer/Footer';
import DestinationPage from './pages/Destination/DestinationPage';
import StoriesPage from './pages/StoriesPage/StoriesPage';
import ReviewsPage from './pages/ReviewsPage/ReviewsPage';
import SinglePost from './pages/SinglePost/SinglePost';
import Page404 from './pages/Page404/Page404';
import PlacesPage from './pages/PlacesPage/PlacesPage';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import Sidebar from './components/SideBar/SideBar';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { selectSearch, selectUser } from './store/store';
import { userActions } from './store/user/userSlice';
import { ROUTES } from './constants';

import './App.css';

function App() {
    const { searchString } = useAppSelector(selectSearch);

    const { isAuth, role } = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isAuth) {
            const userName = localStorage.getItem('userName');
            const role = localStorage.getItem('role');
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');
            if (userName && role && token && email) {
                const user = {
                    userName,
                    role,
                    token,
                    email,
                };
                dispatch(userActions.setUser(user));
            }
        }
    }, []);

    return (
        <>
            <Header />
            <Sidebar />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path={ROUTES.DESTINATIONS} element={<DestinationPage />} />
                <Route path={`${ROUTES.DESTINATIONS}/:postId`} element={<SinglePost />} />
                <Route path={ROUTES.STORIES} element={<StoriesPage />} />
                <Route path={`${ROUTES.STORIES}/:postId`} element={<SinglePost />} />
                <Route path={`${ROUTES.REVIEWS}/`} element={<ReviewsPage />}>
                    {isAuth && <Route path={ROUTES.ADD_REVIEW} element={<ReviewsPage />} />}
                    {isAuth && role === 'admin' && (
                        <Route path={`${ROUTES.UPDATE_REVIEW}/:reviewId`} element={<ReviewsPage />} />
                    )}
                </Route>
                <Route path={`${ROUTES.REVIEWS}/:postId`} element={<SinglePost />} />
                <Route path={`${ROUTES.INFO}/:postId`} element={<SinglePost />} />
                <Route path={ROUTES.PLACES} element={<PlacesPage />} />
                {searchString.trim().length > 0 && <Route path={ROUTES.RESULTS} element={<SearchResultsPage />} />}
                <Route path={`${ROUTES.PLACES}/:postId`} element={<SinglePost />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
