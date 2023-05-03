import React, { useState, useEffect, useCallback } from 'react';

import MainScreenCard from './components/MainScreenCard/MainScreenCard';
import { MainScreenProps, SingleCard } from '../../types/types';
import { chooseRandomElements } from '../../helpers/chooseRandomElements';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectInfo } from '../../store/store';
import { fetchInfo } from '../../store/info/info-actions';

import styles from './mainScreen.module.scss';

const MainScreen = (props: MainScreenProps) => {
    const info = useAppSelector(selectInfo);
    const dispatch = useAppDispatch();

    const posts = info.posts;
    const [shownCards, setShownCards] = useState<SingleCard[]>([]);

    useEffect(() => {
        dispatch(fetchInfo());
    }, []);

    const handleResize = useCallback(() => {
        if (info.posts.length > 0) {
            let cardArr: SingleCard[] = [];

            const width = window.innerWidth;
            if (width >= 1024) {
                cardArr = chooseRandomElements(posts, 3);
            } else if (width >= 768) {
                cardArr = chooseRandomElements(posts, 2);
            } else {
                cardArr = chooseRandomElements(posts, 1);
            }
            setShownCards(cardArr);
        }
    }, [info.posts]);

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    return (
        <div className={` ${styles['main-screen']}`}>
            <h2 className={styles['main-screen__heading']}>{props.heading}</h2>
            {shownCards.map((card) => (
                <MainScreenCard cardInfo={card} key={card.id} />
            ))}
        </div>
    );
};

export default MainScreen;
