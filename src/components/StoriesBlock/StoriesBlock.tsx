import React, { useState, useEffect } from 'react';

import ButtonLight from '../../UI/Buttons/ButtonLight/ButtonLight';
import { StoryBlockProps, StoryShort } from '../../types/types';
import { chooseRandomElements } from '../../helpers/chooseRandomElements';

import styles from './storiesBlock.module.scss';

const StoriesBlock = (props: StoryBlockProps) => {
    const { buttonText, stories, subtitle, title } = props.data;
    const { numberOfPosts } = props;

    const [storiesArr, setStoriesArr] = useState<StoryShort[]>([]);

    useEffect(() => {
        const newStoriesArr = chooseRandomElements(stories, numberOfPosts);
        setStoriesArr(newStoriesArr);
    }, []);

    return (
        <div className="container mt14">
            <section className={styles.story}>
                <div className={styles.story__heading}>
                    <div>
                        <h3 className={styles.story__title}>{title}</h3>
                        <p className={styles.story__subtitle}>{subtitle}</p>
                    </div>
                    <ButtonLight type="button">{buttonText}</ButtonLight>
                </div>
                <div className={styles.story__container}>
                    {storiesArr.map((story) => (
                        <article key={story.id} className={styles.story__card}>
                            <div className={styles.card__image}>
                                <img src={story.imageUrl} alt={story.location} />
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
                            <a className={styles.card__link} href="#">
                                Read Full Post <span>&#8599;</span>
                            </a>
                        </article>
                    ))}
                </div>
                <div className={styles.pagination}>
                    <button className={styles.pagination__arrow}> &lt; </button>
                    <div>
                        <button className={`${styles.pagination__button} ${styles.active}`}>1</button>
                        <button className={styles.pagination__button}>2</button>
                        <button className={styles.pagination__button}>3</button>
                        <button className={styles.pagination__button}>...</button>
                    </div>
                    <button className={styles.pagination__arrow}>&gt;</button>
                </div>
            </section>
        </div>
    );
};

export default StoriesBlock;
