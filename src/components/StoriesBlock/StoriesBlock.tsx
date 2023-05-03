import React, { useState, memo, useCallback, useEffect } from 'react';

import ButtonLight from '../../UI/Buttons/ButtonLight/ButtonLight';
import { StoryBlockProps } from '../../types/types';
import { ROUTES } from '../../constants';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import styles from './storiesBlock.module.scss';

const StoriesBlock = memo((props: StoryBlockProps) => {
    const { buttonText, subtitle } = props.data;
    const { numberOfPosts, stories, title } = props;

    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setCardsPerPage] = useState(numberOfPosts);

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = stories.slice(indexOfFirstCard, indexOfLastCard);
    const totalPages = Math.ceil(stories.length / cardsPerPage);
    const currentLocation = useLocation().pathname;
    const navigate = useNavigate();

    const handleResize = useCallback(() => {
        if (stories.length > 0) {
            const width = window.innerWidth;
            if (width >= 1024) {
                setCardsPerPage(numberOfPosts);
            } else if (width >= 768) {
                setCardsPerPage(numberOfPosts);
            } else {
                setCardsPerPage(3);
            }
        }
    }, [stories]);

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    const renderCards = () => {
        return currentCards.map((story) => (
            <article key={story.id} className={styles.story__card}>
                <div className={styles.card__image}>
                    <img src={`${process.env.REACT_APP_SERVER_URL}${story.imageUrl}`} alt={story.location} />
                </div>
                <div className={styles.card__info}>
                    <p>{story.location}</p>
                    <div className={styles['card__article-info']}>
                        <span>{story.creationDate}</span>
                        <span className={styles.card__separator}>&#x26AC;</span>
                        <span>{story.timeToRead} min read</span>
                    </div>
                </div>
                <h4 className={styles.card__title}>{story.heading}</h4>
                <p className={styles.card__description}>{story.description}</p>
                <NavLink className={styles.card__link} to={`${ROUTES.STORIES}/${story.id}`}>
                    Read Full Post <span>&#8599;</span>
                </NavLink>
            </article>
        ));
    };

    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        return (
            <div className={styles.pagination}>
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={styles.pagination__arrow}
                >
                    &lt;
                </button>
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => setCurrentPage(number)}
                        className={`${styles.pagination__button} ${currentPage === number ? styles.active : ''}`}
                    >
                        {number}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={styles.pagination__arrow}
                >
                    &gt;
                </button>
            </div>
        );
    };

    const buttonClickHandler = useCallback(() => {
        navigate(ROUTES.STORIES);
    }, []);

    return (
        <div className="container mt14">
            <section className={styles.story}>
                <div className={styles.story__heading}>
                    <div className={styles.story__text}>
                        <h3 className={styles.story__title}>{title}</h3>
                        <p className={styles.story__subtitle}>{subtitle}</p>
                    </div>
                    {currentLocation !== ROUTES.STORIES && (
                        <ButtonLight type="button" onClick={buttonClickHandler}>
                            {buttonText}
                        </ButtonLight>
                    )}
                </div>
                <div className={styles.story__container}>{renderCards()}</div>
                {totalPages > 1 && renderPagination()}
            </section>
        </div>
    );
});

StoriesBlock.displayName = 'StoriesBlock';

export default StoriesBlock;
