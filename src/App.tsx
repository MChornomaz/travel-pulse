import React, { useEffect, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Spinner from './UI/Spinner/Spinner';
import SinglePost from './pages/SinglePost/SinglePost';
import PlacesPage from './pages/PlacesPage/PlacesPage';
import Sidebar from './components/SideBar/SideBar';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { selectSearch, selectUser } from './store/store';
import { userActions } from './store/user/userSlice';
import { ROUTES } from './constants';

import './App.css';

const MainPage = React.lazy(() => import('./pages/MainPage/MainPage'));
const StoriesPage = React.lazy(() => import('./pages/StoriesPage/StoriesPage'));
const DestinationPage = React.lazy(() => import('./pages/Destination/DestinationPage'));
const ReviewsPage = React.lazy(() => import('./pages/ReviewsPage/ReviewsPage'));
const Page404 = React.lazy(() => import('./pages/Page404/Page404'));
const SearchResultsPage = React.lazy(() => import('./pages/SearchResultsPage/SearchResultsPage'));

function App() {
    const { searchString } = useAppSelector(selectSearch);

    const { isAuth, role } = useAppSelector(selectUser);
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

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
            <Suspense
                fallback={
                    <div className="fallback">
                        <Spinner />
                    </div>
                }
            >
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
            </Suspense>
            <Footer />
        </>
    );
}

export default App;
