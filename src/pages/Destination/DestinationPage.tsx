import React, { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Spinner from '../../UI/Spinner/Spinner';
import Search from '../../UI/Buttons/inputs/Search/Search';
import Select from '../../UI/Buttons/inputs/Select/Select';

import FirstScreen from './components/FirstScreen/FirstScreen';

import { DESTINATIONS_SORT_BY, SELECT_BY_REGION } from '../../constants';

import { Destination } from '../../types/types';

import { fetchDestinations } from '../../store/destinations/destinations-actions';
import { mergeArrays } from '../../helpers/mergeArrays';
import { selectDestinations } from '../../store/store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { sortArrayByPlace, sortArrayByPlaceReverse } from '../../helpers/sortArray';

import styles from './destinationPage.module.scss';

const DestinationPage = () => {
    const [search, setSearch] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [sortBy, setSortBy] = useState('');
    const { destinations, hasError, isLoading } = useAppSelector(selectDestinations);
    const [shownDestinations, setShownDestinations] = useState<Destination[]>([]);
    const [showSecondDropDown, setShowSecondDropDown] = useState(true);
    const [mobileView, setMobileView] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchDestinations());
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setCardsPerPage] = useState(9);

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = shownDestinations.slice(indexOfFirstCard, indexOfLastCard);
    const totalPages = Math.ceil(shownDestinations.length / cardsPerPage);

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

    useEffect(() => {
        if (search.length > 0) {
            setShownDestinations([]);
            const selectedByRegion = destinations.filter((el) =>
                el.region.toLowerCase().includes(search.trim().toLowerCase()),
            );
            const selectedByCountry = destinations.filter((el) =>
                el.country.toLowerCase().includes(search.trim().toLowerCase()),
            );
            const selectByPlace = destinations.filter((el) =>
                el.place.trim().toLowerCase().includes(search.trim().toLowerCase()),
            );

            if (selectedByRegion.length > 0 || selectedByCountry.length > 0 || selectByPlace.length > 0) {
                const newArr = mergeArrays(selectedByCountry, selectedByRegion, selectByPlace);
                setShownDestinations(newArr);
            }
        } else {
            setShownDestinations(destinations);
        }
    }, [search, destinations]);

    useEffect(() => {
        if (selectedRegion.length > 0) {
            const selectedPlaces = destinations.filter(
                (el) => el.region.toLowerCase() === selectedRegion.toLowerCase(),
            );
            setShownDestinations(selectedPlaces);
        } else if (selectedRegion === '') {
            setShownDestinations(destinations);
        }
    }, [selectedRegion]);

    useEffect(() => {
        if (sortBy === 'az') {
            const newArr = [...shownDestinations];
            const sortedArr = sortArrayByPlace(newArr);
            setShownDestinations(sortedArr);
        } else if (sortBy === 'za') {
            const newArr = [...shownDestinations];
            const sortedArr = sortArrayByPlaceReverse(newArr);
            setShownDestinations(sortedArr);
        } else {
            setShownDestinations(destinations);
        }
    }, [sortBy]);

    const selectChangeHandler = useCallback((val: boolean) => {
        setShowSecondDropDown(val);
    }, []);

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

    if (hasError) {
        return <h2>Something went wrong</h2>;
    }

    if (isLoading) {
        return <Spinner />;
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
                    {shownDestinations.length > 0 &&
                        currentCards.map((el) => (
                            <NavLink to={`/destination/${el.id}`} key={el.id} className={styles.destinations__card}>
                                <div className={styles.destinations__image}>
                                    <img src={`${process.env.REACT_APP_SERVER_URL}${el.imageUrl}`} alt={el.place} />
                                </div>
                                <p className={styles.destinations__region}>{el.location}</p>
                                <p className={styles.destinations__place}>{el.place}</p>
                            </NavLink>
                        ))}
                    {currentCards.length === 0 && <p>Nothing was found!</p>}
                </div>
                {totalPages > 1 && renderPagination()}
            </div>
        </>
    );
};

export default DestinationPage;
