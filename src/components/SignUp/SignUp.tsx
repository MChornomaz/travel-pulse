import React, { useState, useCallback, ChangeEvent } from 'react';

import InputUnderlined from '../../UI/Buttons/inputs/InputUnderlined/InputUnderlined';
import FormButton from '../../UI/Buttons/FormButton/FormButton';
import loginImg from '../../assets/images/login.png';

import styles from './signUp.module.scss';

const SignUp = () => {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredName, setEnteredName] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    const emailChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEnteredEmail(e.target.value);
    }, []);
    const nameChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEnteredName(e.target.value);
    }, []);
    const passwordChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEnteredPassword(e.target.value);
    }, []);
    const confirmedPasswordChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setConfirmedPassword(e.target.value);
    }, []);
    return (
        <div className={styles.login}>
            <div style={{ backgroundImage: `url(${loginImg})` }} className={styles.login__image}></div>
            <div className={styles.login__content}>
                <h2 className={styles.login__title}>Hi, Get Started Now</h2>
                <p>Enter details to create your Travel Pulse account</p>
                <form className={styles.login__form}>
                    <InputUnderlined
                        id="name"
                        name="name"
                        label="Full Name"
                        type="text"
                        value={enteredName}
                        onChange={nameChangeHandler}
                    />
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
                    <InputUnderlined
                        id="confirmed"
                        name="confirmed"
                        label="Confirm Password"
                        type="password"
                        value={confirmedPassword}
                        onChange={confirmedPasswordChangeHandler}
                    />
                    <div className={styles.login__button}>
                        <FormButton type="submit" inverted={true} wide={true}>
                            Sign Up
                        </FormButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
