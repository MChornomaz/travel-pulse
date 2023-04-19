import React from 'react';

import { FormTextAreaProps } from '../../../../types/types';

import styles from './formTextArea.module.scss';

const FormTextArea = (props: FormTextAreaProps) => {
    const { id, label, name, onChange, testId, children, value, placeholder } = props;
    return (
        <div className={styles.block}>
            <label className={styles.label} htmlFor={id}>
                {label}
            </label>
            <textarea
                className={styles.textarea}
                id={id}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                data-testid={testId}
                value={value}
            >
                {children}
            </textarea>
        </div>
    );
};

export default FormTextArea;
