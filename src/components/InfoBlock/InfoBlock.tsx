import React, { useCallback } from 'react';

import { InfoBlockProps } from '../../types/types';
import ButtonLight from '../../UI/Buttons/ButtonLight/ButtonLight';
import PlaceCard from '../PlaceCard/PlaceCard';

import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';

import styles from './infoBlock.module.scss';

const InfoBlock = (props: InfoBlockProps) => {
    const { title, subtitle, buttonText } = props.info;

    const navigate = useNavigate();

    const buttonClickHandler = useCallback(() => {
        navigate(ROUTES.PLACES);
    }, []);

    return (
        <div className="container">
            <section className={styles.info}>
                <div className={styles.info__description}>
                    <div className={styles.info__text}>
                        <h3 className={styles.info__title}>{title}</h3>
                        <p className={styles.info__subtitle}>{subtitle}</p>
                    </div>
                    <ButtonLight type="button" onClick={buttonClickHandler}>
                        {buttonText}
                    </ButtonLight>
                </div>
                <div className={styles.info__container}>
                    {props.towns.map((town) => (
                        <PlaceCard placeInfo={town} key={town.id} url={`${ROUTES.PLACES}/`} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default InfoBlock;
