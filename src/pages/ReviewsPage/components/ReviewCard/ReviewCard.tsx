import React, { useState, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { ReviewCardProps } from '../../../../types/types';
import { ROUTES } from '../../../../constants';
import Rating from '../../../../UI/Rating/Rating';
import ButtonLight from '../../../../UI/Buttons/ButtonLight/ButtonLight';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { fetchReviews } from '../../../../store/reviews/reviews-actions';
import { selectUser } from '../../../../store/store';

import styles from './reviewCard.module.scss';

const ReviewCard = (props: ReviewCardProps) => {
    const { description, heading, imageUrl, location, id, rate } = props.cardInfo;
    const [rating, setRating] = useState<number>(rate);
    const { isAuth, role } = useAppSelector(selectUser);

    const changeRatingHandler = useCallback((rate: number) => {
        setRating(rate);
    }, []);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const updateButtonClickHandler = useCallback(() => {
        navigate(`${ROUTES.UPDATE_REVIEW}/${id}`);
    }, []);

    const deleteReviewClickHandler = useCallback(
        (id: string) => {
            const deleteReviewHandler = async (id: string) => {
                try {
                    await fetch(`${process.env.REACT_APP_SERVER_URL}/reviews/delete`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ id: id }),
                    }).then((res) => {
                        if (res.status === 201) {
                            dispatch(fetchReviews());
                        }
                    });
                    console.log(id);
                } catch (error) {
                    console.log(error);
                }
            };
            deleteReviewHandler(id);
        },
        [id],
    );

    return (
        <article className={styles.card}>
            <div
                className={styles.card__image}
                style={{ backgroundImage: `url(${process.env.REACT_APP_SERVER_URL}${imageUrl})` }}
            ></div>
            <div className={styles.card__content}>
                <div>
                    <p className={styles.card__location}>{location}</p>
                    <NavLink to={`${ROUTES.REVIEWS}/${id}`} className={styles.card__heading}>
                        {heading}
                    </NavLink>
                    <p className={styles.card__description}>{description}</p>
                </div>
                <div>
                    <div className={styles.card__rating}>
                        <Rating rating={rating} onRatingChange={changeRatingHandler} />
                        <p>Click here to rate</p>
                    </div>
                    <div className={styles.card__buttons}>
                        {isAuth && role === 'admin' && (
                            <ButtonLight type="button" onClick={updateButtonClickHandler}>
                                Update
                            </ButtonLight>
                        )}
                        {isAuth && role === 'admin' && (
                            <ButtonLight type="button" onClick={() => deleteReviewClickHandler(id)}>
                                Delete Review
                            </ButtonLight>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ReviewCard;
