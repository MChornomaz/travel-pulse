import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import MainPage from './pages/MainPage/MainPage';
import Footer from './components/Footer/Footer';
import DestinationPage from './pages/Destination/DestinationPage';
import StoriesPage from './pages/StoriesPage/StoriesPage';
import ReviewsPage from './pages/ReviewsPage/ReviewsPage';
import SinglePost from './pages/SinglePost/SinglePost';

import './App.css';

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/destination" element={<DestinationPage />} />
                <Route path="/destination/:postId" element={<SinglePost />} />
                <Route path="/stories" element={<StoriesPage />} />
                <Route path="/stories/:postId" element={<SinglePost />} />
                <Route path="/reviews/" element={<ReviewsPage />}>
                    <Route path="/reviews/add" element={<ReviewsPage />} />
                </Route>
                <Route path="/reviews/:postId" element={<SinglePost />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
