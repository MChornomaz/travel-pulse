import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import logo from '../../assets/images/logo.png';
import logo2 from '../../assets/images/logo2.png';
import searchIcon from '../../assets/images/search.svg';
import searchIcon2 from '../../assets/images/search2.svg';
import FormButton from '../../UI/Buttons/FormButton/FormButton';
import Modal from '../../UI/Buttons/Modal/Modal';
import Login from '../LogIn/Login';
import SignUp from '../SignUp/SignUp';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { searchActions } from '../../store/search/searchSlice';
import { selectUser } from '../../store/store';
import { userActions } from '../../store/user/userSlice';
import { ROUTES } from '../../constants';

import styles from './header.module.scss';

const Header = () => {
    const location = useLocation().pathname;
    const [inverted, setInverted] = useState(false);
    const [showLogInModal, setShowLogInModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [searchString, setSearchString] = useState('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { userName, isAuth } = useAppSelector(selectUser);

    useEffect(() => {
        setInverted(
            location.includes('reviews')
                ? location === ROUTES.REVIEWS || location.includes('update') || location.includes('add')
                : location === ROUTES.RESULTS,
        );
    }, [location]);

    const onSearchHandler = useCallback(() => {
        if (searchString.trim().length > 0) {
            dispatch(searchActions.setSearch(searchString));
            setSearchString('');
            navigate(ROUTES.RESULTS);
        }
    }, [searchString]);

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

    const onSearchChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchString(e.target.value);
    }, []);

    const logOutHandler = useCallback(() => {
        dispatch(userActions.logOutUser());
        localStorage.removeItem('userName');
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    }, []);

    return (
        <>
            {showLogInModal && (
                <Modal onClick={logInHandler} onClose={closeModalHandler}>
                    <Login onClose={closeModalHandler} />
                </Modal>
            )}
            {showSignUpModal && (
                <Modal onClick={logInHandler} onClose={closeModalHandler}>
                    <SignUp onClose={closeModalHandler} />
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
                            <input
                                className={`${styles.header__search} ${inverted && styles.bordered}`}
                                type="search"
                                name="search"
                                id="search"
                                value={searchString}
                                onChange={onSearchChangeHandler}
                            />
                            <label className={styles.header__icon} htmlFor="search" onClick={onSearchHandler}>
                                {!inverted && <img src={searchIcon} alt="Search icon" />}
                                {inverted && <img src={searchIcon2} alt="Search icon" />}
                            </label>
                        </div>
                        <div className={styles.header__buttons}>
                            {!isAuth && (
                                <p
                                    onClick={sighUpHandler}
                                    className={inverted ? styles.inverted__signup : styles.header__signup}
                                >
                                    Sign Up
                                </p>
                            )}
                            {isAuth && (
                                <p className={inverted ? styles.inverted__signup : styles.header__signup}>{userName}</p>
                            )}
                            {!isAuth && (
                                <FormButton type="button" inverted={inverted} onClick={logInHandler}>
                                    Login
                                </FormButton>
                            )}
                            {isAuth && (
                                <FormButton type="button" inverted={inverted} onClick={logOutHandler}>
                                    Log Out
                                </FormButton>
                            )}
                        </div>
                    </div>
                </header>
            </div>
        </>
    );
};

export default Header;
