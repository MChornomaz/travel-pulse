import React, { useCallback, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import FirstScreen from '../Destination/components/FirstScreen/FirstScreen';
import Search from '../../UI/Buttons/inputs/Search/Search';
import Select from '../../UI/Buttons/inputs/Select/Select';
import Spinner from '../../UI/Spinner/Spinner';

import { Place } from '../../types/types';
import { DESTINATIONS_SORT_BY, ROUTES, SELECT_BY_REGION } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectPlaces } from '../../store/store';
import { fetchPlaces } from '../../store/places/places-actions';
import { mergeArrays } from '../../helpers/mergeArrays';
import { sortArrayByPlace, sortArrayByPlaceReverse } from '../../helpers/sortArray';

import styles from './placesPage.module.scss';

const PlacesPage = () => {
    const [search, setSearch] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [sortBy, setSortBy] = useState('');
    const { places, hasError, isLoading } = useAppSelector(selectPlaces);
    const [shownPlaces, setShownPlaces] = useState<Place[]>([]);
    const [showSecondDropDown, setShowSecondDropDown] = useState(true);
    const [mobileView, setMobileView] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchPlaces());
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setCardsPerPage] = useState(9);

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = shownPlaces.slice(indexOfFirstCard, indexOfLastCard);
    const totalPages = Math.ceil(shownPlaces.length / cardsPerPage);

    const handleResize = useCallback(() => {
        const width = window.innerWidth;
        if (width >= 1024) {
            setCardsPerPage(9);
        } else if (width >= 768) {
            setCardsPerPage(6);
        } else if (width <= 550) {
            setMobileView(true);
        } else {
            setCardsPerPage(3);
        }
    }, []);

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }, []);

    const selectRegionHandler = useCallback((value: string) => {
        setSelectedRegion(value);
    }, []);

    const sortByHandler = useCallback((value: string) => {
        setSortBy(value);
    }, []);

    const selectChangeHandler = useCallback((val: boolean) => {
        setShowSecondDropDown(val);
    }, []);

    useEffect(() => {
        if (search.length > 0) {
            setShownPlaces([]);
            const selectedByRegion = shownPlaces.filter((el) =>
                el.region.toLowerCase().includes(search.trim().toLowerCase()),
            );
            const selectedByCountry = shownPlaces.filter((el) =>
                el.country.toLowerCase().includes(search.trim().toLowerCase()),
            );
            const selectByPlace = shownPlaces.filter((el) =>
                el.place.trim().toLowerCase().includes(search.trim().toLowerCase()),
            );

            if (selectedByRegion.length > 0 || selectedByCountry.length > 0 || selectByPlace.length > 0) {
                const newArr = mergeArrays(selectedByCountry, selectedByRegion, selectByPlace);
                setShownPlaces(newArr);
            }
        } else {
            setShownPlaces(places);
        }
    }, [search, places]);

    useEffect(() => {
        if (selectedRegion.length > 0) {
            const selectedPlaces = places.filter((el) => el.region.toLowerCase() === selectedRegion.toLowerCase());
            setShownPlaces(selectedPlaces);
        } else if (selectedRegion === '') {
            setShownPlaces(places);
        }
    }, [selectedRegion]);

    useEffect(() => {
        if (sortBy === 'az') {
            const newArr = [...places];
            const sortedArr = sortArrayByPlace(newArr);
            setShownPlaces(sortedArr);
        } else if (sortBy === 'za') {
            const newArr = [...shownPlaces];
            const sortedArr = sortArrayByPlaceReverse(newArr);
            setShownPlaces(sortedArr);
        } else {
            setShownPlaces(places);
        }
    }, [sortBy]);

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

    if (isLoading) {
        return <Spinner />;
    }

    if (hasError) {
        return <h2>Something went wrong</h2>;
    }
    return (
        <>
            <FirstScreen />
            <div className="container">
                <div className={styles['search-block']}>
                    <div>
                        <Search
                            id="search-place"
                            name="search-place"
                            onChange={handleSearchChange}
                            placeholder="Search for place"
                            value={search}
                        />
                    </div>
                    <div className={styles.filters}>
                        <div className={styles.filters__selects}>
                            <p className={styles.filters__type}>Filter By Region</p>
                            {!mobileView && (
                                <Select
                                    options={SELECT_BY_REGION}
                                    onSelect={selectRegionHandler}
                                    placeholder="All Regions"
                                />
                            )}
                            {mobileView && (
                                <Select
                                    options={SELECT_BY_REGION}
                                    onSelect={selectRegionHandler}
                                    placeholder="All Regions"
                                    onChange={selectChangeHandler}
                                />
                            )}
                        </div>
                        <div className={styles.filters__selects}>
                            <p className={styles.filters__type}>Sort by</p>
                            {showSecondDropDown && (
                                <Select
                                    options={DESTINATIONS_SORT_BY}
                                    onSelect={sortByHandler}
                                    placeholder="Most Popular"
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.destinations__container}>
                    {shownPlaces.length > 0 &&
                        currentCards.map((el) => (
                            <NavLink
                                to={`${ROUTES.DESTINATIONS}/${el.id}`}
                                key={el.id}
                                className={styles.destinations__card}
                            >
                                <div className={styles.destinations__image}>
                                    <img src={`${process.env.REACT_APP_SERVER_URL}${el.imageUrl}`} alt={el.place} />
                                </div>
                                <p className={styles.destinations__region}>{el.location}</p>
                                <p className={styles.destinations__place}>{el.place}</p>
                            </NavLink>
                        ))}
                </div>
                {totalPages > 1 && renderPagination()}
            </div>
        </>
    );
};

export default PlacesPage;
