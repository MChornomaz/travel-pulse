import React from 'react';
import { NavLink } from 'react-router-dom';

import { MainScreenCardProps } from '../../../../types/types';
import arrow from '../../../../assets/images/arrow.svg';
import { ROUTES } from '../../../../constants';

import styles from './mainScreenCard.module.scss';

const MainScreenCard: React.FC<MainScreenCardProps> = (props) => {
    const { id, heading, imageUrl } = props.cardInfo;
    return (
        <div style={{ backgroundImage: `url(${process.env.REACT_APP_SERVER_URL}${imageUrl})` }} className={styles.card}>
            <div className={styles.card__text}>
                <NavLink to={`${ROUTES.INFO}/${id} `} className={styles.card__link}>
                    <h3>{heading}</h3>
                    <img src={arrow} alt="arrow" />
                </NavLink>
            </div>
        </div>
    );
};

export default MainScreenCard;
