import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import InputUnderlined from '../../UI/Buttons/inputs/InputUnderlined/InputUnderlined';
import FormButton from '../../UI/Buttons/FormButton/FormButton';
import loginImg from '../../assets/images/login.png';
import { ModalCloseProps, NewUser } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { signUpUser } from '../../store/user/user-actions';
import { selectUser } from '../../store/store';
import { userActions } from '../../store/user/userSlice';

import styles from './signUp.module.scss';

const SignUp: React.FC<ModalCloseProps> = ({ onClose }) => {
    const dispatch = useAppDispatch();

    const { userHasError, isAuth } = useAppSelector(selectUser);

    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirmedPassword: '',
    };

    useEffect(() => {
        if (isAuth) {
            onClose();
        }
    }, [isAuth, dispatch, onClose]);

    const validationSchema = Yup.object({
        name: Yup.string().min(3, 'Name must be at least 3 characters').required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
            .matches(/\d/, 'Password must contain at least 1 number')
            .required('Required'),
        confirmedPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .nullable()
            .required('Required'),
    });

    const onSubmit = (values: NewUser) => {
        dispatch(userActions.setUserError(null));
        dispatch(signUpUser(values));
    };

    return (
        <div className={styles.login}>
            <div style={{ backgroundImage: `url(${loginImg})` }} className={styles.login__image}></div>
            <div className={styles.close} onClick={onClose}>
                <span></span>
            </div>
            <div className={styles.login__content}>
                <h2 className={styles.login__title}>Hi, Get Started Now</h2>
                <p>Enter details to create your Travel Pulse account</p>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ errors, touched }) => (
                        <Form className={styles.login__form}>
                            <Field
                                as={InputUnderlined}
                                id="name"
                                name="name"
                                label="Full Name"
                                type="text"
                                error={touched.name && errors.name}
                            />
                            <ErrorMessage name="name" component="div" className={styles.login__error} />

                            <Field
                                as={InputUnderlined}
                                id="email"
                                name="email"
                                label="Email Address"
                                type="email"
                                error={touched.email && errors.email}
                            />
                            <ErrorMessage name="email" component="div" className={styles.login__error} />

                            <Field
                                as={InputUnderlined}
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                error={touched.password && errors.password}
                            />
                            <ErrorMessage name="password" component="div" className={styles.login__error} />

                            <Field
                                as={InputUnderlined}
                                id="confirmedPassword"
                                name="confirmedPassword"
                                label="Confirm Password"
                                type="password"
                                error={touched.confirmedPassword && errors.confirmedPassword}
                            />
                            <ErrorMessage name="confirmedPassword" component="div" className={styles.login__error} />

                            <div className={styles.login__button}>
                                <FormButton type="submit" inverted={true} wide={true}>
                                    Sign Up
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

export default SignUp;
