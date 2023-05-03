import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import Page404 from '../Page404/Page404';
import Spinner from '../../UI/Spinner/Spinner';
import BlockWithFilters from '../../components/BlockWithFilters/BlockWithFilters';
import StoriesBlock from '../../components/StoriesBlock/StoriesBlock';

import { LATEST_STORIES, SINGLE_POST_DESTINATIONS, SINGLE_POST_PLACES } from '../../constants';
import { Destination, Place, Review, SinglePostData, StoryShort } from '../../types/types';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectDestinations, selectInfo, selectPlaces, selectReviews, selectStories } from '../../store/store';
import { fetchStories } from '../../store/stories/stories-actions';
import { fetchPlaces } from '../../store/places/places-actions';
import { fetchDestinations } from '../../store/destinations/destinations-actions';
import { fetchInfo } from '../../store/info/info-actions';
import { fetchReviews } from '../../store/reviews/reviews-actions';

import styles from './singlePost.module.scss';

const SinglePost = () => {
    const [postInfo, setPostInfo] = useState<SinglePostData>({
        id: '',
        place: '',
        location: '',
        imageUrl: '',
        description: '',
        region: '',
        country: '',
    });
    const { description, imageUrl, location, place } = postInfo;

    const locationUrl = useLocation().pathname.split('/')[1];

    const params = useParams();

    const [latestStories, setLatestStories] = useState<StoryShort[]>([]);
    const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
    const [selectedDestinations, setSelectedDestinations] = useState<Destination[]>([]);

    const { stories, hasError, isLoading } = useAppSelector(selectStories);
    const { posts: info, isLoading: infoIsLoading, hasError: infoHaveError } = useAppSelector(selectInfo);
    const { places, isLoading: placesLoading, hasError: placesError } = useAppSelector(selectPlaces);
    const {
        destinations,
        isLoading: destinationsLoading,
        hasError: destinationsError,
    } = useAppSelector(selectDestinations);
    const { reviews, isLoading: reviewsLoading, hasError: reviewsError } = useAppSelector(selectReviews);

    const [postFound, setPostFound] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchStories());
    }, []);

    useEffect(() => {
        dispatch(fetchPlaces());
    }, []);

    useEffect(() => {
        dispatch(fetchDestinations());
    }, []);

    useEffect(() => {
        dispatch(fetchInfo());
    }, []);

    useEffect(() => {
        if (locationUrl === 'reviews' && reviews.length === 0) {
            dispatch(fetchReviews());
        }
    }, [locationUrl, reviews]);

    useEffect(() => {
        if (locationUrl === 'stories' && stories.length > 0) {
            const selectedStory = stories.find((el) => el.id === params.postId);
            if (selectedStory) {
                setPostFound(true);
                setPostInfo(selectedStory);
            }
        } else if (locationUrl === 'destination' && destinations.length > 0) {
            const selectedDestination = destinations.find((el) => el.id === params.postId);
            if (selectedDestination) {
                setPostFound(true);
                setPostInfo(selectedDestination);
            }
        } else if (locationUrl === 'places' && places.length > 0) {
            const selectedPlace = places.find((el) => el.id === params.postId);
            if (selectedPlace) {
                setPostFound(true);
                setPostInfo(selectedPlace);
            }
        } else if (locationUrl === 'info' && info.length > 0) {
            const selectedPlace = info.find((el) => el.id === params.postId);
            if (selectedPlace) {
                setPostFound(true);
                setPostInfo(selectedPlace);
            }
        } else if (locationUrl === 'reviews' && reviews.length > 0) {
            const selectedReview = reviews.find((el: Review) => el.id === params.postId);
            if (selectedReview) {
                const reviewToDisplay = {
                    id: selectedReview.id,
                    place: selectedReview.heading,
                    location: selectedReview.location,
                    imageUrl: selectedReview.imageUrl,
                    description: selectedReview.description,
                    region: selectedReview.region,
                    country: selectedReview.country,
                };
                setPostFound(true);
                setPostInfo(reviewToDisplay);
            }
        } else {
            setPostFound(false);
        }
    }, [locationUrl, params.postId]);

    useEffect(() => {
        if (stories.length > 0) {
            const regionStories = stories.filter((el) => el.region === postInfo.region);
            setLatestStories(regionStories);
        }
    }, [stories]);

    useEffect(() => {
        if (places.length > 0) {
            const countryPlaces = places.filter((el) => el.country === postInfo.country);
            setSelectedPlaces(countryPlaces);
        }
    }, [places]);

    useEffect(() => {
        if (destinations.length > 0) {
            const regionDestinations = destinations.filter((el) => el.region === postInfo.region);
            setSelectedDestinations(regionDestinations);
        }
    }, [destinations]);

    if (hasError || placesError || destinationsError || infoHaveError || reviewsError) {
        return <h2>Something went wrong</h2>;
    }

    if (isLoading || placesLoading || destinationsLoading || infoIsLoading || reviewsLoading) {
        return <Spinner />;
    }

    if (!postFound) {
        return <Page404 />;
    }

    return (
        <div>
            <div
                className={styles['main-screen']}
                style={{ backgroundImage: `url(${process.env.REACT_APP_SERVER_URL}${imageUrl})` }}
            >
                <h1 className={styles['main-screen__header']}>{place ? place : location}</h1>
            </div>
            <div className="container">
                <div className={styles.post}>
                    <h2 className={styles.post__heading}>{place}</h2>
                    <p className={styles.post__location}>{location}</p>
                    <p className={styles.post__description}>{description}</p>
                </div>
                {(selectedDestinations.length > 0 || latestStories.length > 0 || selectedPlaces.length > 0) && (
                    <h3 className={styles.section__title}>01 / TOP SIGHTS & LOCATIONS</h3>
                )}
                {selectedDestinations.length > 0 && (
                    <BlockWithFilters
                        buttonText={SINGLE_POST_DESTINATIONS.buttonText}
                        cardsInfo={selectedDestinations}
                        selectInfo={SINGLE_POST_DESTINATIONS.selectInfo}
                        url={SINGLE_POST_DESTINATIONS.url}
                        title="Top Places for your Travel Plans"
                    />
                )}
                {latestStories.length > 0 && (
                    <StoriesBlock
                        title={`Latest Stories from ${postInfo.region}`}
                        data={LATEST_STORIES}
                        stories={latestStories}
                        numberOfPosts={2}
                    />
                )}
                {selectedPlaces.length > 0 && (
                    <BlockWithFilters
                        buttonText={SINGLE_POST_PLACES.buttonText}
                        cardsInfo={selectedPlaces}
                        selectInfo={SINGLE_POST_PLACES.selectInfo}
                        url={SINGLE_POST_PLACES.url}
                        title={`Other Fun Places in ${postInfo.country}`}
                    />
                )}
            </div>
        </div>
    );
};

export default SinglePost;
