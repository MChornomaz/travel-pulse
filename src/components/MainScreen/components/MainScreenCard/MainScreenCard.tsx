import React from 'react';

import { MainScreenCardProps } from '../../../../types/types';
import arrow from '../../../../assets/images/arrow.svg';

import styles from './mainScreenCard.module.scss';

const MainScreenCard: React.FC<MainScreenCardProps> = (props) => {
    const { id, heading, imageUrl } = props.cardInfo;
    return (
        <div style={{ backgroundImage: `url(${imageUrl})` }} className={styles.card}>
            <div className={styles.card__text}>
                <a href={`/stories/${id} `} className={styles.card__link}>
                    <h3>{heading}</h3>
                    <img src={arrow} alt="arrow" />
                </a>
            </div>
        </div>
    );
};

export default MainScreenCard;
