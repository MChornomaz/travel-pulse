import React, { useCallback, useState } from 'react';

import FirstScreen from './components/FirstScreen/FirstScreen';
import Search from '../../UI/Buttons/inputs/Search/Search';
import Select from '../../UI/Buttons/inputs/Select/Select';
import { DESTINATIONS_SHORT, DESTINATIONS_SORT_BY, SELECT_BY_REGION } from '../../constants';

import styles from './destinationPage.module.scss';

const DestinationPage = () => {
    const [search, setSearch] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [destinations, setDestinations] = useState(DESTINATIONS_SHORT);

    const searchChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }, []);

    const selectRegionHandler = useCallback((value: string) => {
        setSelectedRegion(value);
    }, []);

    const sortByHandler = useCallback((value: string) => {
        setSortBy(value);
    }, []);

    return (
        <>
            <FirstScreen />
            <div className="container">
                <div className={styles['search-block']}>
                    <div>
                        <Search
                            id="search-place"
                            name="search-place"
                            onChange={searchChangeHandler}
                            placeholder="Search for place"
                            value={search}
                        />
                    </div>
                    <div className={styles.filters}>
                        <div className={styles.filters__selects}>
                            <p className={styles.filters__type}>Filter By Region</p>
                            <Select
                                options={SELECT_BY_REGION}
                                onSelect={selectRegionHandler}
                                placeholder="All Regions"
                            />
                        </div>
                        <div className={styles.filters__selects}>
                            <p className={styles.filters__type}>Sort by</p>
                            <Select
                                options={DESTINATIONS_SORT_BY}
                                onSelect={sortByHandler}
                                placeholder="Most Popular"
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.destinations__container}>
                    {destinations.map((el) => (
                        <a href="#" key={el.id} className={styles.destinations__card}>
                            <div className={styles.destinations__image}>
                                <img src={el.imageUrl} alt={el.place} />
                            </div>
                            <p className={styles.destinations__region}>{el.region}</p>
                            <p className={styles.destinations__place}>{el.place}</p>
                        </a>
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
            </div>
        </>
    );
};

export default DestinationPage;
