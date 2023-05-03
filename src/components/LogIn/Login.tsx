import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import InputUnderlined from '../../UI/Buttons/inputs/InputUnderlined/InputUnderlined';
import FormButton from '../../UI/Buttons/FormButton/FormButton';
import loginImg from '../../assets/images/login.png';

import { ModalCloseProps, UserLogin } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logInUser } from '../../store/user/user-actions';
import { selectUser } from '../../store/store';
import { userActions } from '../../store/user/userSlice';

import styles from './login.module.scss';

const Login: React.FC<ModalCloseProps> = ({ onClose }) => {
    const dispatch = useAppDispatch();
    const { userHasError, isAuth } = useAppSelector(selectUser);

    const initialValues: UserLogin = {
        email: '',
        password: '',
    };

    useEffect(() => {
        if (isAuth) {
            onClose();
        }
    }, [isAuth]);

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/\d/, 'Password must contain at least one number')
            .required('Password is required'),
    });

    const onSubmit = (values: UserLogin) => {
        dispatch(userActions.setUserError(null));
        dispatch(logInUser(values));
    };

    return (
        <div className={styles.login}>
            <div className={styles.close} onClick={onClose}>
                <span></span>
            </div>
            <div style={{ backgroundImage: `url(${loginImg})` }} className={styles.login__image}></div>
            <div className={styles.login__content}>
                <h2 className={styles.login__title}>Welcome Back!</h2>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {() => (
                        <Form className={styles.login__form}>
                            <Field as={InputUnderlined} id="email" name="email" label="Email Address" type="email" />
                            <ErrorMessage name="email" component="div" className={styles.login__error} />

                            <Field
                                as={InputUnderlined}
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                            />
                            <ErrorMessage name="password" component="div" className={styles.login__error} />

                            <div className={styles.login__button}>
                                <FormButton type="submit" inverted={true} wide={true}>
                                    Log In
                                </FormButton>
                            </div>
                            {userHasError && <p className={styles.login__error}>{userHasError}</p>}
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
