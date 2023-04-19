import React from 'react';

import { ButtonLightProps } from '../../../types/types';

import styles from './buttonLight.module.scss';

const ButtonLight: React.FC<ButtonLightProps> = ({ children, type, onClick, testid, icon }) => {
    return (
        <button type={type} onClick={onClick} data-testid={testid} className={styles.button}>
            {icon && <img className={styles.button__icon} src={icon} alt="button icon" />}
            {children}
        </button>
    );
};

export default ButtonLight;
