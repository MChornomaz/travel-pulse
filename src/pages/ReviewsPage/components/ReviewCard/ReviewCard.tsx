import React from 'react';
import { NavLink } from 'react-router-dom';

import { ReviewCardProps } from '../../../../types/types';
import starIcon from '../../../../assets/images/star.svg';

import styles from './reviewCard.module.scss';

const ReviewCard = (props: ReviewCardProps) => {
    const { description, heading, imageUrl, location } = props.cardInfo;
    return (
        <article className={styles.card}>
            <div className={styles.card__image} style={{ backgroundImage: `url(${imageUrl})` }}></div>
            <div className={styles.card__content}>
                <div>
                    <p className={styles.card__location}>{location}</p>
                    <NavLink to="#" className={styles.card__heading}>
                        {heading}
                    </NavLink>
                    <p className={styles.card__description}>{description}</p>
                </div>
                <div className={styles.card__rating}>
                    <div className={styles.card__stars}>
                        <img src={starIcon} alt="star" className={styles.card__star} />
                        <img src={starIcon} alt="star" className={styles.card__star} />
                        <img src={starIcon} alt="star" className={styles.card__star} />
                        <img src={starIcon} alt="star" className={styles.card__star} />
                        <img src={starIcon} alt="star" className={styles.card__star} />
                    </div>
                    <p>Click here to rate</p>
                </div>
            </div>
        </article>
    );
};

export default ReviewCard;
