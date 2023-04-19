import React from 'react';

import { PlaceSliderProps } from '../../types/types';
import ArrowButton from '../../UI/Buttons/arrowButton/ArrowButton';

import styles from './placesSlider.module.scss';

const PlacesSlider = (props: PlaceSliderProps) => {
    const { places, subtitle, title } = props.sliderInfo;
    return (
        <section>
            <div className={`container ${styles.slider}`}>
                <div className={styles.slider__description}>
                    <div>
                        <h3 className={styles.slider__title}>{title}</h3>
                        <p className={styles.slider__subtitle}>{subtitle}</p>
                    </div>
                    <div className={styles.slider__buttons}>
                        <ArrowButton type="button" toTheRight={false} disabled={true} />
                        <ArrowButton type="button" toTheRight={true} />
                    </div>
                </div>
                <div className={styles.slider__overlay}>
                    <div className={styles.slider__container}>
                        {places.map((place) => (
                            <a href="#" key={place.id} className={styles.slider__card}>
                                <div className={styles.slider__image}>
                                    <img src={place.imageUrl} alt={place.name} />
                                </div>
                                <p className={styles.slider__location}>{place.location}</p>
                                <p className={styles.slider__place}>{place.name}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlacesSlider;
