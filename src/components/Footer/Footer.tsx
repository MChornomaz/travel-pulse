import React from 'react';

import logo from '../../assets/images/logo.png';

import styles from './footer.module.scss';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__content}>
                <img className={styles.footer__logo} src={logo} alt="company logo" />
                <p className={styles.footer__copy}>© 2023 Travel Pulse. All rights reserved</p>
            </div>
        </footer>
    );
};

export default Footer;
