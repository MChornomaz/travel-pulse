import React, { useEffect, useState } from 'react';

import MainScreen from '../../components/MainScreen/MainScreen';
import FeaturedBlock from './components/FeaturedBlock/FeaturedBlock';
import PlacesSlider from '../../components/PageSlider/PlacesSlider';
import InfoBlock from '../../components/InfoBlock/InfoBlock';
import StoriesBlock from '../../components/StoriesBlock/StoriesBlock';
import Spinner from '../../UI/Spinner/Spinner';

import { Destination, Place, StoryShort } from '../../types/types';

import { LOCATIONS_BASE_ON_SEARCH, MEDIAS, PLAN_TRIP, TOP_LOCATIONS, TOP_STORIES } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectDestinations, selectPlaces, selectStories } from '../../store/store';
import { fetchStories } from '../../store/stories/stories-actions';
import { fetchDestinations } from '../../store/destinations/destinations-actions';
import { fetchPlaces } from '../../store/places/places-actions';
import { chooseRandomElements } from '../../helpers/chooseRandomElements';
import { mergeArrays } from '../../helpers/mergeArrays';

const MainPage = () => {
    const [topStories, setTopStories] = useState<StoryShort[]>([]);
    const [topDestinations, setTopDestinations] = useState<Destination[]>([]);
    const { stories, hasError: storiesHaveError, isLoading: storiesLoading } = useAppSelector(selectStories);
    const {
        destinations,
        isLoading: destinationsLoading,
        hasError: destinationsHaveError,
    } = useAppSelector(selectDestinations);
    const dispatch = useAppDispatch();
    const { places, isLoading: placesLoading, hasError: placesError } = useAppSelector(selectPlaces);
    const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
    const [searchedDestinations, setSearchedDestinations] = useState<Destination[]>([]);

    useEffect(() => {
        dispatch(fetchStories());
    }, []);

    useEffect(() => {
        if (stories.length > 0) {
            setTopStories(stories);
        }
    }, [stories]);

    useEffect(() => {
        dispatch(fetchPlaces());
        setTopStories(stories);
    }, []);

    useEffect(() => {
        dispatch(fetchDestinations());
        if (destinations.length > 0) {
            setTopDestinations(destinations);
        }
    }, []);

    useEffect(() => {
        setTopDestinations(destinations);
    }, [destinations]);

    useEffect(() => {
        if (places.length > 0) {
            const randomPlaces = chooseRandomElements(places, 3);
            setSelectedPlaces(randomPlaces);
        }
    }, [places]);

    const searchHistory = localStorage.getItem('search');

    useEffect(() => {
        if (searchHistory && destinations.length > 0) {
            const resultByPlace = destinations.filter((el) =>
                el.place.toLowerCase().includes(searchHistory.toLowerCase()),
            );
            const resultByRegion = destinations.filter((el) =>
                el.region.toLowerCase().includes(searchHistory.toLowerCase()),
            );
            const resultByCountry = destinations.filter((el) =>
                el.country.toLowerCase().includes(searchHistory.toLowerCase()),
            );
            const resultByLocation = destinations.filter((el) =>
                el.location.toLowerCase().includes(searchHistory.toLowerCase()),
            );

            if (
                resultByPlace.length > 0 ||
                resultByRegion.length > 0 ||
                resultByCountry.length > 0 ||
                resultByLocation.length > 0
            ) {
                const newArr = mergeArrays<Destination>(
                    resultByPlace,
                    resultByRegion,
                    resultByCountry,
                    resultByLocation,
                );
                setSearchedDestinations(newArr);
            }
        }
    }, [destinations, searchHistory]);

    if (storiesHaveError || destinationsHaveError || placesError) {
        return <h2>Something went wrong</h2>;
    }

    if (storiesLoading || destinationsLoading || placesLoading) {
        return <Spinner />;
    }

    return (
        <div>
            <MainScreen heading="Discover New Places and Create Unforgettable Memories" />
            <FeaturedBlock media={MEDIAS} />
            <InfoBlock towns={selectedPlaces} info={PLAN_TRIP} />
            {destinations.length > 0 && (
                <PlacesSlider
                    destinations={topDestinations}
                    title={TOP_LOCATIONS.title}
                    subtitle={TOP_LOCATIONS.subtitle}
                />
            )}
            {searchedDestinations.length > 0 && (
                <PlacesSlider
                    destinations={searchedDestinations}
                    title={LOCATIONS_BASE_ON_SEARCH.title}
                    subtitle={LOCATIONS_BASE_ON_SEARCH.subtitle}
                />
            )}
            {topStories.length > 0 && (
                <StoriesBlock title={TOP_STORIES.title} data={TOP_STORIES} stories={topStories} numberOfPosts={4} />
            )}
        </div>
    );
};

export default MainPage;
