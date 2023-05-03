import React, { useEffect, useState } from 'react';

import StoriesBlock from '../../components/StoriesBlock/StoriesBlock';
import InfoBlock from '../../components/InfoBlock/InfoBlock';
import PlacesSlider from '../../components/PageSlider/PlacesSlider';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectDestinations, selectPlaces, selectSearch, selectStories } from '../../store/store';
import { DestinationInfo, Place, StoryShort } from '../../types/types';
import { fetchPlaces } from '../../store/places/places-actions';
import { fetchStories } from '../../store/stories/stories-actions';
import { fetchDestinations } from '../../store/destinations/destinations-actions';
import { mergeArrays } from '../../helpers/mergeArrays';
import { LOCATIONS_BASE_ON_SEARCH, SEARCH_PLACES, TOP_STORIES } from '../../constants';

import styles from './searchResults.module.scss';

const SearchResultsPage = () => {
    const { places } = useAppSelector(selectPlaces);
    const { stories } = useAppSelector(selectStories);
    const { destinations } = useAppSelector(selectDestinations);
    const { searchString } = useAppSelector(selectSearch);

    const [searchedPlaces, setSearchedPlaces] = useState<Place[]>([]);
    const [searchedStories, setSearchedStories] = useState<StoryShort[]>([]);
    const [searchedDestinations, setSearchedDestinations] = useState<DestinationInfo[]>([]);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (places.length === 0) {
            dispatch(fetchPlaces());
        }
        if (stories.length === 0) {
            dispatch(fetchStories());
        }
        if (destinations.length === 0) {
            dispatch(fetchDestinations());
        }
    }, []);

    useEffect(() => {
        if (searchString !== '' && places.length > 0) {
            setSearchedPlaces([]);
            const newPlaces = places.filter((el) => el.place.trim().toLowerCase().includes(searchString));
            if (newPlaces.length > 0) {
                setSearchedPlaces(newPlaces);
            }
        }
    }, [searchString, places]);

    useEffect(() => {
        if (searchString !== '' && stories.length > 0) {
            setSearchedStories([]);
            const newStoriesByPlace = stories.filter((el) =>
                el.location.trim().toLowerCase().includes(searchString.trim().toLowerCase()),
            );
            const newStoriesByTitle = stories.filter((el) =>
                el.heading.trim().toLowerCase().includes(searchString.trim().toLowerCase()),
            );
            const newStoriesByCountry = stories.filter((el) =>
                el.country.trim().toLowerCase().includes(searchString.trim().toLowerCase()),
            );
            const newStoriesByRegion = stories.filter((el) =>
                el.region.trim().toLowerCase().includes(searchString.trim().toLowerCase()),
            );

            if (
                newStoriesByPlace.length > 0 ||
                newStoriesByTitle.length > 0 ||
                newStoriesByCountry.length > 0 ||
                newStoriesByRegion.length > 0
            ) {
                const mergedArray = mergeArrays<StoryShort>(
                    newStoriesByPlace,
                    newStoriesByTitle,
                    newStoriesByCountry,
                    newStoriesByRegion,
                );
                setSearchedStories(mergedArray);
            }
        }
    }, [searchString, stories]);

    useEffect(() => {
        if (searchString !== '' && destinations.length > 0) {
            setSearchedDestinations([]);
            const newDestinationByPlace = destinations.filter((el) =>
                el.place.toLowerCase().includes(searchString.trim().toLowerCase()),
            );
            const newDestinationByCountry = destinations.filter((el) =>
                el.country.toLowerCase().includes(searchString.trim().toLowerCase()),
            );
            const newDestinationByRegion = destinations.filter((el) =>
                el.region.trim().toLowerCase().includes(searchString.trim().toLowerCase()),
            );
            const newDestinationByLocation = destinations.filter((el) =>
                el.location.trim().toLowerCase().includes(searchString.trim().toLowerCase()),
            );

            if (
                newDestinationByPlace.length > 0 ||
                newDestinationByCountry.length > 0 ||
                newDestinationByRegion.length > 0 ||
                newDestinationByLocation.length > 0
            ) {
                const mergedArray = mergeArrays<DestinationInfo>(
                    newDestinationByPlace,
                    newDestinationByCountry,
                    newDestinationByRegion,
                    newDestinationByLocation,
                );
                setSearchedDestinations(mergedArray);
            }
        }
    }, [searchString, destinations]);

    useEffect(() => {
        if (searchString !== '' && places.length > 0) {
            setSearchedPlaces([]);
            const newPlaceByPlace = places.filter((el) =>
                el.place.toLowerCase().includes(searchString.trim().toLowerCase()),
            );
            const newPlaceByCountry = places.filter((el) =>
                el.country.toLowerCase().includes(searchString.trim().toLowerCase()),
            );
            const newPlaceByRegion = places.filter((el) =>
                el.region.trim().toLowerCase().includes(searchString.trim().toLowerCase()),
            );
            const newPlaceByLocation = places.filter((el) =>
                el.location.trim().toLowerCase().includes(searchString.trim().toLowerCase()),
            );

            if (
                newPlaceByPlace.length > 0 ||
                newPlaceByCountry.length > 0 ||
                newPlaceByRegion.length > 0 ||
                newPlaceByLocation.length > 0
            ) {
                const mergedArray = mergeArrays<Place>(
                    newPlaceByPlace,
                    newPlaceByCountry,
                    newPlaceByRegion,
                    newPlaceByLocation,
                );
                setSearchedPlaces(mergedArray);
            }
        }
    }, [searchString, places]);

    useEffect(() => {
        if (searchedDestinations.length > 0) {
            localStorage.setItem('search', searchString);
        }
    }, [searchedDestinations]);

    return (
        <div className={styles.results}>
            {searchedPlaces.length > 0 && <InfoBlock towns={searchedPlaces} info={SEARCH_PLACES} />}
            {searchedDestinations.length > 0 && (
                <PlacesSlider
                    destinations={searchedDestinations}
                    subtitle={LOCATIONS_BASE_ON_SEARCH.subtitle}
                    title={LOCATIONS_BASE_ON_SEARCH.title}
                />
            )}
            {searchedStories.length > 0 && (
                <StoriesBlock
                    data={TOP_STORIES}
                    numberOfPosts={6}
                    stories={searchedStories}
                    title={TOP_STORIES.title}
                />
            )}
        </div>
    );
};

export default SearchResultsPage;
