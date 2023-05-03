import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { NavLink } from 'react-router-dom';

import { PlaceSliderProps } from '../../types/types';
import ArrowButton from '../../UI/Buttons/arrowButton/ArrowButton';
import { ROUTES } from '../../constants';

import styles from './placesSlider.module.scss';

const PlacesSlider = ({ destinations, subtitle, title }: PlaceSliderProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [sliderWidth, setSliderWidth] = useState(0);
    const [visibleSlides, setVisibleSlides] = useState(3);

    const handleResize = useCallback(() => {
        const width = window.innerWidth;
        if (width >= 1024) {
            setVisibleSlides(3);
        } else if (width >= 768) {
            setVisibleSlides(2);
        } else {
            setVisibleSlides(1);
        }
    }, []);

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    const handlePrev = useCallback(() => {
        setCurrentSlide((prev) => (prev === 0 ? prev : prev - 1));
    }, []);

    const handleNext = useCallback(() => {
        setCurrentSlide((prev) => (prev === destinations.length - 1 ? prev : prev + 1));
    }, [destinations.length]);

    const handleSwipe = useCallback(
        (e: React.TouchEvent<HTMLDivElement>) => {
            const touchStartX = e.touches[0].clientX;
            const touchEndX = e.changedTouches[0].clientX;
            if (touchStartX - touchEndX > 100) {
                handleNext();
            } else if (touchEndX - touchStartX > 100) {
                handlePrev();
            }
        },
        [handlePrev, handleNext],
    );

    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (sliderRef.current) {
            setSliderWidth(sliderRef.current.offsetWidth);
        }
    }, [sliderRef]);

    const isFirstSlide = useMemo(() => currentSlide === 0, [currentSlide]);
    const isLastSlide = useMemo(() => currentSlide === destinations.length - 1, [currentSlide, destinations.length]);

    return (
        <section>
            <div className={`container ${styles.slider}`}>
                <div className={styles.slider__description}>
                    <div className={styles.slider__text}>
                        <h3 className={styles.slider__title}>{title}</h3>
                        <p className={styles.slider__subtitle}>{subtitle}</p>
                    </div>
                    <div className={styles.slider__buttons}>
                        <ArrowButton type="button" toTheRight={false} onClick={handlePrev} disabled={isFirstSlide} />
                        <ArrowButton type="button" toTheRight={true} onClick={handleNext} disabled={isLastSlide} />
                    </div>
                </div>
                <div className={styles.slider__overlay}>
                    <div
                        className={styles.slider__container}
                        style={{ transform: `translateX(-${currentSlide * (sliderWidth / visibleSlides)}px)` }}
                        ref={sliderRef}
                        onTouchMove={handleSwipe}
                    >
                        {destinations.map((destination) => (
                            <NavLink
                                to={`${ROUTES.DESTINATIONS}/${destination.id}`}
                                key={destination.id}
                                className={styles.slider__card}
                            >
                                <div className={styles.slider__image}>
                                    <img
                                        src={`${process.env.REACT_APP_SERVER_URL}${destination.imageUrl}`}
                                        alt={destination.place}
                                    />
                                </div>
                                <p className={styles.slider__location}>{destination.location}</p>
                                <p className={styles.slider__place}>{destination.place}</p>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlacesSlider;
