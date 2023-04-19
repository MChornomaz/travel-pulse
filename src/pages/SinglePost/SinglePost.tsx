import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { LATEST_STORIES, POSTARR, SINGLE_POST_PLACES } from '../../constants';
import { SinglePostData } from '../../types/types';
import BlockWithFilters from '../../components/BlockWithFilters/BlockWithFilters';
import { SINGLE_POST_DESTINATIONS } from '../../constants';
import StoriesBlock from '../../components/StoriesBlock/StoriesBlock';

import styles from './singlePost.module.scss';

const SinglePost = () => {
    const [postInfo, setPostInfo] = useState<SinglePostData>({
        id: '',
        place: '',
        location: '',
        imageUrl: '',
        description: '',
    });
    const { description, imageUrl, location, place } = postInfo;
    const params = useParams();

    useEffect(() => {
        const selectedPlace = POSTARR.find((el) => el.id === params.postId);
        if (selectedPlace) {
            setPostInfo(selectedPlace);
        }
    }, []);

    return (
        <div>
            <div className={styles['main-screen']} style={{ backgroundImage: `url(${imageUrl})` }}>
                <h1 className={styles['main-screen__header']}>{place}</h1>
            </div>
            <div className="container">
                <div className={styles.post}>
                    <h2 className={styles.post__heading}>{place}</h2>
                    <p className={styles.post__location}>{location}</p>
                    <p className={styles.post__description}>{description}</p>
                </div>
                <h3 className={styles.section__title}>01 / TOP SIGHTS & LOCATIONS</h3>
                <BlockWithFilters
                    buttonText={SINGLE_POST_DESTINATIONS.buttonText}
                    cardsInfo={SINGLE_POST_DESTINATIONS.cardsInfo}
                    selectInfo={SINGLE_POST_DESTINATIONS.selectInfo}
                    url={SINGLE_POST_DESTINATIONS.url}
                    title="Top Destinations for your Travel Plans"
                />
                <StoriesBlock data={LATEST_STORIES} numberOfPosts={2} />
                <BlockWithFilters
                    buttonText={SINGLE_POST_PLACES.buttonText}
                    cardsInfo={SINGLE_POST_PLACES.cardsInfo}
                    selectInfo={SINGLE_POST_PLACES.selectInfo}
                    url={SINGLE_POST_PLACES.url}
                    title="Other Fun Places in Croatia"
                />
            </div>
        </div>
    );
};

export default SinglePost;
