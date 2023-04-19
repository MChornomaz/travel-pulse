import React from 'react';

import MainScreen from '../../components/MainScreen/MainScreen';
import { MAIN_SCREEN_DATA, TOP_STORIES } from '../../constants';
import StoriesBlock from '../../components/StoriesBlock/StoriesBlock';

const StoriesPage = () => {
    return (
        <div>
            <MainScreen cards={MAIN_SCREEN_DATA} heading="Travel Stories from different people globally" />
            <StoriesBlock data={TOP_STORIES} numberOfPosts={10} />
        </div>
    );
};

export default StoriesPage;
