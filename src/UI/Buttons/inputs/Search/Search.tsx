import React from 'react';

import searchIcon from '../../../../assets/images/searchIcon.svg';

import styles from './search.module.scss';

type SearchProps = {
    id: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    testid?: string;
};

const Search = (props: SearchProps) => {
    const { id, name, onChange, placeholder, value, testid } = props;
    return (
        <div className={styles.container}>
            <input
                className={styles.search}
                id={id}
                data-testid={testid}
                name={name}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
            />
            <label className={styles.label} htmlFor={id}>
                <img src={searchIcon} alt="search" />
            </label>
        </div>
    );
};

export default Search;
