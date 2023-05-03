import React, { useState, useCallback, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import searchIcon from '../../assets/images/search.svg';
import Modal from './../../UI/Buttons/Modal/Modal';
import Login from '../LogIn/Login';
import SignUp from '../SignUp/SignUp';
import FormButton from '../../UI/Buttons/FormButton/FormButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { userActions } from '../../store/user/userSlice';
import { selectUser } from '../../store/store';
import { searchActions } from '../../store/search/searchSlice';
import { ROUTES } from '../../constants';

import styles from './sideBar.module.scss';

const StyledSidebar = styled.nav<{ isOpen: boolean }>`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    background: linear-gradient(to bottom, #87cefa, #00bfff, #1e90ff);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
    transform: translateX(${(props) => (props.isOpen ? '0' : '-100%')});
    transition: transform 0.3s ease-in-out;
    overflow: ${(props) => (props.isOpen ? 'hidden' : 'auto')};

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        li {
            margin-bottom: 1.5rem;

            a {
                color: #fff;
                font-weight: 600;
                font-size: 3rem;
                text-decoration: none;
                transition: color 0.3s ease-in-out;

                &:hover {
                    color: #000;
                }
            }
        }
    }

    body {
        overflow: ${(props) => (props.isOpen ? 'hidden' : 'auto')};
    }
`;

const StyledBurgerMenu = styled.button<{ isOpen: boolean }>`
    position: fixed;
    top: 1rem;
    right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    background-color: #ffffff;
    height: 5rem;
    width: 5rem;
    border: 1px solid #000000;
    border-radius: 50%;
    cursor: pointer;
    z-index: 101;

    @media (min-width: 900px) {
        display: none;
    }

    &:focus {
        outline: none;
    }

    span {
        display: block;
        width: 3rem;
        height: 2px;
        background-color: ${(props) => (props.isOpen ? '#ffffff' : '#000000')};
        border-radius: 0.125rem;
        transition: transform 0.3s ease-in-out;
        position: relative;

        &::before,
        &::after {
            content: '';
            position: absolute;
            width: 3rem;
            height: 2px;
            left: 0;
            background-color: #000000;
            transition: all 0.2s;
        }

        &::before {
            transform: ${(props) => (props.isOpen ? 'rotate(135deg)' : 'none')};
            top: ${(props) => (props.isOpen ? '0' : '-0.8rem')};
        }

        &::after {
            transform: ${(props) => (props.isOpen ? 'rotate(-135deg)' : 'none')};
            top: ${(props) => (props.isOpen ? '0' : '0.8rem')};
        }
    }
`;

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showLogInModal, setShowLogInModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [searchString, setSearchString] = useState('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isAuth } = useAppSelector(selectUser);

    const location = useLocation().pathname;
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    useEffect(() => {
        if (showLogInModal || showSignUpModal) {
            setIsOpen(false);
        }
    }, [showLogInModal, showSignUpModal]);

    const handleBurgerClick = () => {
        setIsOpen(!isOpen);
    };
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

    const onSearchChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchString(e.target.value);
    }, []);

    const onSearchHandler = useCallback(() => {
        if (searchString.trim().length > 0) {
            dispatch(searchActions.setSearch(searchString));
            setSearchString('');
            navigate(ROUTES.RESULTS);
            setIsOpen(false);
        }
    }, [searchString]);

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
            <StyledBurgerMenu isOpen={isOpen} onClick={handleBurgerClick}>
                <span />
            </StyledBurgerMenu>
            <StyledSidebar isOpen={isOpen}>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={ROUTES.DESTINATIONS}>Destination</NavLink>
                    </li>
                    <li>
                        <NavLink to={ROUTES.STORIES}>Stories</NavLink>
                    </li>
                    <li>
                        <NavLink to={ROUTES.REVIEWS}>Reviews</NavLink>
                    </li>
                    <li>
                        <div className={styles['sidebar__search-box']}>
                            <input
                                className={styles.sidebar__search}
                                type="search"
                                name="search"
                                id="search"
                                value={searchString}
                                onChange={onSearchChangeHandler}
                            />
                            <label className={styles.sidebar__icon} htmlFor="search" onClick={onSearchHandler}>
                                <img src={searchIcon} alt="Search icon" />
                            </label>
                        </div>
                    </li>
                    {!isAuth && (
                        <li>
                            <p onClick={sighUpHandler} className={styles.sidebar__signup}>
                                Sign Up
                            </p>
                        </li>
                    )}
                    <li>
                        {!isAuth && (
                            <FormButton type="button" inverted={false} onClick={logInHandler}>
                                Login
                            </FormButton>
                        )}
                        {isAuth && (
                            <FormButton type="button" inverted={false} onClick={logOutHandler}>
                                Log Out
                            </FormButton>
                        )}
                    </li>
                </ul>
            </StyledSidebar>
        </>
    );
};

export default Sidebar;
