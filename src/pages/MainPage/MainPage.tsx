import React from 'react';

import MainScreen from '../../components/MainScreen/MainScreen';
import FeaturedBlock from './components/FeaturedBlock/FeaturedBlock';
import {
    LOCATIONS_BASE_ON_SEARCH,
    MEDIAS,
    PLAN_TRIP,
    TOP_LOCATIONS,
    TOP_STORIES,
    MAIN_SCREEN_DATA,
} from '../../constants';
import PlacesSlider from '../../components/PageSlider/PlacesSlider';
import InfoBlock from '../../components/InfoBlock/InfoBlock';
import StoriesBlock from '../../components/StoriesBlock/StoriesBlock';

const MainPage = () => {
    return (
        <div>
            <MainScreen cards={MAIN_SCREEN_DATA} heading="Discover New Places and Create Unforgettable Memories" />
            <FeaturedBlock media={MEDIAS} />
            <InfoBlock info={PLAN_TRIP} />
            <PlacesSlider sliderInfo={TOP_LOCATIONS} />
            <PlacesSlider sliderInfo={LOCATIONS_BASE_ON_SEARCH} />
            <StoriesBlock data={TOP_STORIES} numberOfPosts={4} />
        </div>
    );
};

export default MainPage;
