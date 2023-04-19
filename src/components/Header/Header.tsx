import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import logo from '../../assets/images/logo.png';
import logo2 from '../../assets/images/logo2.png';
import searchIcon from '../../assets/images/search.svg';
import searchIcon2 from '../../assets/images/search2.svg';
import FormButton from '../../UI/Buttons/FormButton/FormButton';
import Modal from '../../UI/Buttons/Modal/Modal';
import Login from '../LogIn/Login';
import SignUp from '../SignUp/SignUp';

import styles from './header.module.scss';

const Header = () => {
    const location = useLocation().pathname;
    const [inverted, setInverted] = useState(false);
    const [showLogInModal, setShowLogInModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);

    useEffect(() => {
        if (location === '/reviews' || location === '/reviews/add') {
            setInverted(true);
        } else {
            setInverted(false);
        }
    }, [location, inverted]);

    const logInHandler = useCallback(() => {
        setShowLogInModal((prevState) => !prevState);
    }, []);
    const sighUpHandler = useCallback(() => {
        setShowSignUpModal((prevState) => !prevState);
    }, []);

    const closeModalHandler = useCallback(() => {
        setShowLogInModal(false);
        setShowSignUpModal(false);
    }, []);

    return (
        <>
            {showLogInModal && (
                <Modal onClick={logInHandler} onClose={closeModalHandler}>
                    <Login />
                </Modal>
            )}
            {showSignUpModal && (
                <Modal onClick={logInHandler} onClose={closeModalHandler}>
                    <SignUp />
                </Modal>
            )}
            <div className="container">
                <header className={`${styles.header} ${inverted ? 'inverted' : ''}`}>
                    {!inverted && (
                        <NavLink to="/" className={styles.header__logo}>
                            <img className={styles['header__logo--img']} src={logo} alt="Travel Pulse" />
                        </NavLink>
                    )}
                    {inverted && (
                        <NavLink to="/" className={styles.header__logo}>
                            <img className={styles['header__logo--img']} src={logo2} alt="Travel Pulse" />
                        </NavLink>
                    )}
                    <div className={styles.header__links}>
                        <NavLink className={`${inverted ? styles.inverted__link : ''}`} to="/destination">
                            Destination
                        </NavLink>
                        <NavLink className={`${inverted ? styles.inverted__link : ''}`} to="/stories">
                            Stories
                        </NavLink>
                        <NavLink className={`${inverted ? styles.inverted__link : ''}`} to="/reviews">
                            Reviews
                        </NavLink>
                    </div>
                    <div className={styles['header__user-links']}>
                        <div className={styles['header__search-box']}>
                            <input className={styles.header__search} type="search" name="search" id="search" />
                            <label className={styles.header__icon} htmlFor="search">
                                {!inverted && <img src={searchIcon} alt="Search icon" />}
                                {inverted && <img src={searchIcon2} alt="Search icon" />}
                            </label>
                        </div>
                        <div className={styles.header__buttons}>
                            <p
                                onClick={sighUpHandler}
                                className={inverted ? styles.inverted__signup : styles.header__signup}
                            >
                                Sign Up
                            </p>
                            <FormButton type="button" inverted={inverted} onClick={logInHandler}>
                                Login
                            </FormButton>
                        </div>
                    </div>
                </header>
            </div>
        </>
    );
};

export default Header;
