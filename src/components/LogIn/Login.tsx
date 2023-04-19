import React, { useState, useCallback, ChangeEvent } from 'react';

import InputUnderlined from '../../UI/Buttons/inputs/InputUnderlined/InputUnderlined';
import FormButton from '../../UI/Buttons/FormButton/FormButton';
import loginImg from '../../assets/images/login.png';

import styles from './login.module.scss';

const Login = () => {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    const emailChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEnteredEmail(e.target.value);
    }, []);
    const passwordChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEnteredPassword(e.target.value);
    }, []);

    return (
        <div className={styles.login}>
            <div style={{ backgroundImage: `url(${loginImg})` }} className={styles.login__image}></div>
            <div className={styles.login__content}>
                <h2 className={styles.login__title}>Welcome Back!</h2>
                <form className={styles.login__form}>
                    <InputUnderlined
                        id="email"
                        name="email"
                        label="Email Address"
                        type="email"
                        value={enteredEmail}
                        onChange={emailChangeHandler}
                    />
                    <InputUnderlined
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={enteredPassword}
                        onChange={passwordChangeHandler}
                    />
                    <div className={styles.login__button}>
                        <FormButton type="submit" inverted={true} wide={true}>
                            Log In
                        </FormButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
