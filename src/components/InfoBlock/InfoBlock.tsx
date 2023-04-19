import React from 'react';

import { InfoBlockProps } from '../../types/types';
import ButtonLight from '../../UI/Buttons/ButtonLight/ButtonLight';
import PlaceCard from '../PlaceCard/PlaceCard';

import styles from './infoBlock.module.scss';

const InfoBlock = (props: InfoBlockProps) => {
    const { title, subtitle, towns, buttonText } = props.info;
    return (
        <div className="container">
            <section className={styles.info}>
                <div className={styles.info__description}>
                    <div>
                        <h3 className={styles.info__title}>{title}</h3>
                        <p className={styles.info__subtitle}>{subtitle}</p>
                    </div>
                    <ButtonLight type="button">{buttonText}</ButtonLight>
                </div>
                <div className={styles.info__container}>
                    {towns.map((town) => (
                        <PlaceCard placeInfo={town} key={town.id} url="/destination/" />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default InfoBlock;
