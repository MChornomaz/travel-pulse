import React, { useState, useEffect } from 'react';

import MainScreenCard from './components/MainScreenCard/MainScreenCard';
import { MainScreenProps, SingleCard } from '../../types/types';
import { chooseRandomElements } from '../../helpers/chooseRandomElements';

import styles from './mainScreen.module.scss';

const MainScreen = (props: MainScreenProps) => {
    const { cards, heading } = props;
    const [shownCards, setShownCards] = useState<SingleCard[]>([]);

    useEffect(() => {
        const cardArr = chooseRandomElements(cards, 3);
        setShownCards(cardArr);
    }, []);

    return (
        <div className={` ${styles['main-screen']}`}>
            <h2 className={styles['main-screen__heading']}>{heading}</h2>
            {shownCards.map((card) => (
                <MainScreenCard cardInfo={card} key={card.id} />
            ))}
        </div>
    );
};

export default MainScreen;
