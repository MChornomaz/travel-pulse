import React from 'react';

import { FormInputProps } from '../../../../types/types';

import styles from './formInput.module.scss';

const FormInput = (props: FormInputProps) => {
    const { id, label, name, onChange, type, value, testId, placeholder } = props;
    return (
        <div className={styles.block}>
            <label className={styles.label} htmlFor={id}>
                {label}
            </label>
            <input
                className={styles.input}
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                data-testid={testId}
            />
        </div>
    );
};

export default FormInput;
