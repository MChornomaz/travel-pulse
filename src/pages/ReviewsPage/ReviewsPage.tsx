import React, { ChangeEvent, useCallback, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Search from '../../UI/Buttons/inputs/Search/Search';
import pencilIcon from '../../assets/images/pencil.svg';
import ButtonLight from '../../UI/Buttons/ButtonLight/ButtonLight';
import { REVIEWS } from '../../constants';
import ReviewCard from './components/ReviewCard/ReviewCard';
import ReviewsForm from './components/ReviewsForm/ReviewsForm';

import styles from './reviewPage.module.scss';

const ReviewsPage = () => {
    const [searchString, setSearchString] = useState('');

    const navigate = useNavigate();

    const onSearchHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchString(e.currentTarget.value);
    }, []);

    const newReviewButtonClickHandler = useCallback(() => {
        navigate('/reviews/add');
    }, []);
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
                        <div>
                            <h2 className={styles.reviews__title}>Top places with reviews</h2>
                            <p className={styles.reviews__subtitle}>
                                Travelers want to see more reviews of these places.
                            </p>
                        </div>
                        <ButtonLight type="button" icon={pencilIcon} onClick={newReviewButtonClickHandler}>
                            Write New Review
                        </ButtonLight>
                    </div>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <div>
                                    {REVIEWS.map((el) => (
                                        <ReviewCard cardInfo={el} key={el.id} />
                                    ))}
                                </div>
                            }
                        />
                        <Route path="/add" element={<ReviewsForm />} />
                    </Routes>
                </section>
            </div>
        </>
    );
};

export default ReviewsPage;
