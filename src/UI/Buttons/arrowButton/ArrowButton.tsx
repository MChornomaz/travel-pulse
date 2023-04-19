import React from 'react';

import rightArrow from '../../../assets/images/button-arrow-right.svg';
import leftArrow from '../../../assets/images/button-arrow-left.svg';

import styles from './arrowButton.module.scss';

type ArrowButtonProps = {
    children?: string;
    type?: 'button' | 'submit' | 'reset' | undefined;
    toTheRight: boolean;
    onClick?: () => void | ((a: string) => void);
    testid?: string;
    disabled?: boolean;
};

const ArrowButton: React.FC<ArrowButtonProps> = ({ children, type, toTheRight, onClick, testid, disabled }) => {
    return (
        <button className={styles.button} type={type} onClick={onClick} data-testid={testid} disabled={disabled}>
            {children}
            {toTheRight && <img src={rightArrow} alt="next" />}
            {!toTheRight && <img src={leftArrow} alt="next" />}
        </button>
    );
};

export default ArrowButton;
