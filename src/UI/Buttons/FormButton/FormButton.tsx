import React from 'react';

import { FormButtonProps } from '../../../types/types';

import styles from './formButton.module.scss';

const FormButton: React.FC<FormButtonProps> = ({ children, type, onClick, testid, inverted, wide }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            data-testid={testid}
            className={!inverted ? styles.button : styles.button__inverted}
            style={{ width: `${wide && '100%'}` }}
        >
            {children}
        </button>
    );
};

export default FormButton;
