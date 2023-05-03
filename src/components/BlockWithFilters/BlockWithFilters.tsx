import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Select from '../../UI/Buttons/inputs/Select/Select';
import ButtonLight from '../../UI/Buttons/ButtonLight/ButtonLight';
import PlaceCard from '../PlaceCard/PlaceCard';

import { BlockWithFiltersProps, PlaceShort } from '../../types/types';

import { sortArrayByPlace, sortArrayByPlaceReverse } from '../../helpers/sortArray';
import { ROUTES } from '../../constants';

import styles from './blockWithFilters.module.scss';

const BlockWithFilters = ({ cardsInfo, url, selectInfo, buttonText, title }: BlockWithFiltersProps) => {
    const [sorted, setSorted] = useState('');
    const { items, placeholder } = selectInfo;
    const [places, setPlaces] = useState<PlaceShort[]>(cardsInfo);

    const onSortSelectHandler = useCallback((value: string) => {
        setSorted(value);
    }, []);

    const navigate = useNavigate();

    const buttonClickHandler = useCallback(() => {
        navigate(ROUTES.PLACES);
    }, []);

    useEffect(() => {
        if (sorted === 'az') {
            const newArr = [...cardsInfo];
            const sortedArr = sortArrayByPlace(newArr);
            setPlaces(sortedArr);
        } else if (sorted === 'za') {
            const newArr = [...cardsInfo];
            const sortedArr = sortArrayByPlaceReverse(newArr);
            setPlaces(sortedArr);
        } else {
            setPlaces(cardsInfo);
        }
    }, [sorted]);
    return (
        <div className={styles.block}>
            <div className={styles.block__heading}>
                <h2 className={styles.block__title}>{title}</h2>
                <div>
                    <p className={styles.block__filter}>Sorting Option</p>
                    <Select options={items} placeholder={placeholder} onSelect={onSortSelectHandler} />
                </div>
            </div>
            <div className={styles.block__content}>
                {places.map((card) => (
                    <PlaceCard placeInfo={card} url={url} key={card.id} />
                ))}
            </div>
            <div className={styles.block__button}>
                <ButtonLight onClick={buttonClickHandler} type="button">
                    {buttonText}
                </ButtonLight>
            </div>
        </div>
    );
};

export default BlockWithFilters;
