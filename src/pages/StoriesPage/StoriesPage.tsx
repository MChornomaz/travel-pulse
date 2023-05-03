import React, { useEffect, useState } from 'react';

import MainScreen from '../../components/MainScreen/MainScreen';
import Spinner from '../../UI/Spinner/Spinner';
import StoriesBlock from '../../components/StoriesBlock/StoriesBlock';

import { TOP_STORIES } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectStories } from '../../store/store';
import { fetchStories } from '../../store/stories/stories-actions';
import { StoryShort } from '../../types/types';

const StoriesPage = () => {
    const { stories, hasError, isLoading } = useAppSelector(selectStories);
    const [topStories, setTopStories] = useState<StoryShort[]>([]);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchStories());
        if (stories.length > 0) {
            setTopStories(stories);
        }
    }, []);

    useEffect(() => {
        if (stories.length > 0) {
            setTopStories(stories);
        }
    }, [stories]);

    if (hasError) {
        return <h2>Something went wrong</h2>;
    }

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div>
            <MainScreen heading="Travel Stories from different people globally" />
            {topStories.length > 0 && (
                <StoriesBlock title={TOP_STORIES.title} data={TOP_STORIES} stories={topStories} numberOfPosts={10} />
            )}
        </div>
    );
};

export default StoriesPage;
