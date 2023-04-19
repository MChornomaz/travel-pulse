import React from 'react';

import { FormInputProps } from '../../../../types/types';

import styles from './inputUnderlined.module.scss';

const InputUnderlined = (props: FormInputProps) => {
    const { id, label, name, onChange, type, value, testId, placeholder } = props;
    return (
        <div className={styles.block}>
            <input
                className={styles.input}
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                data-testid={testId}
                required
            />
            <label className={styles.label} htmlFor={id}>
                {label}
            </label>
        </div>
    );
};

export default InputUnderlined;
