import React from 'react';
import { NavLink } from 'react-router-dom';

import { PlaceCardProps } from '../../types/types';

import styles from './placeCard.module.scss';

const PlaceCard = (props: PlaceCardProps) => {
    const { id, imageUrl, place } = props.placeInfo;
    const { url } = props;
    return (
        <NavLink to={`${url}${id}`} className={styles.info__card}>
            <div className={styles.info__image}>
                <img src={`${process.env.REACT_APP_SERVER_URL}${imageUrl}`} alt={place} />
            </div>
            <p className={styles.info__name}>{place}</p>
        </NavLink>
    );
};

export default PlaceCard;
