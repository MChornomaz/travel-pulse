import React, { useState, useCallback } from 'react';

import Select from '../../UI/Buttons/inputs/Select/Select';
import { BlockWithFiltersProps } from '../../types/types';
import PlaceCard from '../PlaceCard/PlaceCard';
import ButtonLight from '../../UI/Buttons/ButtonLight/ButtonLight';

import styles from './blockWithFilters.module.scss';

const BlockWithFilters = (props: BlockWithFiltersProps) => {
    const [filtered, setFiltered] = useState('');
    const { cardsInfo, url, selectInfo, buttonText, title } = props;
    const { items, placeholder } = selectInfo;

    const onFilterSelectHandler = useCallback((value: string) => {
        setFiltered(value);
    }, []);
    return (
        <div className={styles.block}>
            <div className={styles.block__heading}>
                <h2 className={styles.block__title}>{title}</h2>
                <div>
                    <p className={styles.block__filter}>Filter Option</p>
                    <Select options={items} placeholder={placeholder} onSelect={onFilterSelectHandler} />
                </div>
            </div>
            <div className={styles.block__content}>
                {cardsInfo.map((card) => (
                    <PlaceCard placeInfo={card} url={url} key={card.id} />
                ))}
            </div>
            <div className={styles.block__button}>
                <ButtonLight type="button">{buttonText}</ButtonLight>
            </div>
        </div>
    );
};

export default BlockWithFilters;
