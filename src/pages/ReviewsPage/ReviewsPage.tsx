import React, { ChangeEvent, useCallback, useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Search from '../../UI/Buttons/inputs/Search/Search';
import pencilIcon from '../../assets/images/pencil.svg';
import ButtonLight from '../../UI/Buttons/ButtonLight/ButtonLight';
import ReviewCard from './components/ReviewCard/ReviewCard';
import ReviewsForm from './components/ReviewsForm/ReviewsForm';
import Spinner from '../../UI/Spinner/Spinner';

import { Review } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectReviews, selectUser } from '../../store/store';
import { fetchReviews } from '../../store/reviews/reviews-actions';
import { mergeArrays } from '../../helpers/mergeArrays';
import { ROUTES } from '../../constants';

import styles from './reviewPage.module.scss';

const ReviewsPage = () => {
    const [searchString, setSearchString] = useState('');
    const { reviews, hasError, isLoading } = useAppSelector(selectReviews);
    const [selectedReviews, setSelectedReviews] = useState<Review[]>(reviews);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const locationUrl = useLocation().pathname;

    const { isAuth } = useAppSelector(selectUser);

    const onSearchHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchString(e.currentTarget.value);
    }, []);

    useEffect(() => {
        dispatch(fetchReviews());
    }, []);

    const newReviewButtonClickHandler = useCallback(() => {
        navigate(ROUTES.ADD_REVIEW);
    }, []);

    const backToReviewButtonClickHandler = useCallback(() => {
        navigate(ROUTES.REVIEWS);
    }, []);

    useEffect(() => {
        if (searchString.length > 0 && reviews.length > 0) {
            setSelectedReviews([]);
            const selectedByRegion = reviews.filter((el) =>
                el.region.toLowerCase().includes(searchString.trim().toLowerCase()),
            );
            const selectedByCountry = reviews.filter((el) =>
                el.country.toLowerCase().includes(searchString.trim().toLowerCase()),
            );
            const selectByLocation = reviews.filter((el) =>
                el.location.trim().toLowerCase().includes(searchString.trim().toLowerCase()),
            );

            const selectByHeading = reviews.filter((el) =>
                el.heading.trim().toLowerCase().includes(searchString.trim().toLowerCase()),
            );

            if (
                selectedByRegion.length > 0 ||
                selectedByCountry.length > 0 ||
                selectByLocation.length > 0 ||
                selectByHeading.length > 0
            ) {
                const newArr = mergeArrays<Review>(
                    selectedByCountry,
                    selectedByRegion,
                    selectByLocation,
                    selectByHeading,
                );
                setSelectedReviews(newArr);
            }
        } else {
            setSelectedReviews(reviews);
        }
    }, [searchString, reviews]);

    if (isLoading) {
        return <Spinner />;
    }

    if (hasError) {
        return <h2>Something went wrong!</h2>;
    }

    return (
        <>
            <div className={styles['main-screen']}>
                <div className={styles['main-screen__wrapper']}>
                    <h2 className={styles['main-screen__header']}>Share your Travel Experience in form of a story</h2>
                    <div className={styles['main-screen__search-block']}>
                        <Search
                            id="review-search"
                            name="review-search"
                            placeholder="What would you like to review?"
                            value={searchString}
                            onChange={onSearchHandler}
                        />
                    </div>
                </div>
            </div>
            <div className="container">
                <section className={styles.reviews}>
                    <div className={styles.reviews__info}>
                        <div className={styles.reviews__text}>
                            <h2 className={styles.reviews__title}>Top places with reviews</h2>
                            <p className={styles.reviews__subtitle}>
                                Travelers want to see more reviews of these places.
                            </p>
                        </div>

                        {locationUrl === '/reviews' && isAuth && (
                            <ButtonLight type="button" icon={pencilIcon} onClick={newReviewButtonClickHandler}>
                                Write New Review
                            </ButtonLight>
                        )}

                        {(locationUrl === '/reviews/add' || locationUrl.includes('/reviews/update')) && (
                            <ButtonLight type="button" icon={pencilIcon} onClick={backToReviewButtonClickHandler}>
                                Back to Reviews
                            </ButtonLight>
                        )}
                    </div>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <div>
                                    {reviews.length > 0 &&
                                        selectedReviews.map((el) => <ReviewCard cardInfo={el} key={el.id} />)}
                                </div>
                            }
                        />
                        <Route path="/add" element={<ReviewsForm />} />
                        <Route path="/update/:reviewId" element={<ReviewsForm />} />
                    </Routes>
                </section>
            </div>
        </>
    );
};

export default ReviewsPage;
