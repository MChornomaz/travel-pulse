import React, { useCallback, useEffect, useState, useRef } from 'react';

import selectArrow from '../../../../assets/images/selectIcon.svg';

import styles from './FormSelect.module.scss';

type SelectItem = {
    id: string;
    name: string;
    value: string;
};

type SelectProps = {
    placeholder: string;
    options: SelectItem[];
    onSelect: (value: string) => void;
    testid?: string;
};

const FormSelect = (props: SelectProps) => {
    const { onSelect, options, placeholder, testid } = props;
    const [selectedValue, setSelectedValue] = useState('');
    const [clicked, setClicked] = useState(true);

    const myRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    const dropdownClickHandler = useCallback(() => {
        setClicked((prev) => !prev);
    }, []);

    const onSelectHandler = useCallback((value: string, name: string) => {
        onSelect(value);
        setSelectedValue(name);
        dropdownClickHandler();
    }, []);

    const onSelectDefaultHandler = useCallback(() => {
        setSelectedValue('');
        dropdownClickHandler();
    }, []);

    const handleClickOutside = useCallback((e: MouseEvent) => {
        if (!myRef.current.contains(e.target as Node)) {
            setClicked(true);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    });

    return (
        <div className={styles.container} ref={myRef}>
            <div onClick={dropdownClickHandler} className={styles.select} data-testid={testid}>
                <p>{selectedValue === '' ? placeholder : selectedValue}</p>
                <span className={`${styles.arrow} ${clicked ? styles.clicked : ''}`}>
                    <img src={selectArrow} alt="select arrow" />
                </span>
            </div>
            <ul
                className={styles.dropdown}
                style={{
                    height: `${clicked ? '0px' : 'fit-content'}`,
                    border: `${clicked ? 'none' : '1px solid #AAA8A8'}`,
                }}
            >
                <li className={styles.item} key="0" onClick={onSelectDefaultHandler}>
                    {placeholder}
                </li>
                {options.map((el) => (
                    <li
                        className={`${styles.item} ${selectedValue === el.name ? styles.active : ''}`}
                        key={el.id}
                        onClick={() => onSelectHandler(el.value, el.name)}
                    >
                        {el.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FormSelect;
