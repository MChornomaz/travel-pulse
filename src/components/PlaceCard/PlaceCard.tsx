import React from 'react';
import { NavLink } from 'react-router-dom';

import { PlaceCardProps } from '../../types/types';

import styles from './placeCard.module.scss';

const PlaceCard = (props: PlaceCardProps) => {
    const { id, imageUrl, name } = props.placeInfo;
    const { url } = props;
    return (
        <NavLink to={`${url}${id}`} className={styles.info__card}>
            <div className={styles.info__image}>
                <img src={imageUrl} alt={name} />
            </div>
            <p className={styles.info__name}>{name}</p>
        </NavLink>
    );
};

export default PlaceCard;
