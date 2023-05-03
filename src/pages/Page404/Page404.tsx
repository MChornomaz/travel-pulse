import React from 'react';
import notFound from '../../assets/images/Page-not-found.jpg';
import styles from './page404.module.scss';

const Page404 = () => {
    return <div className={styles.content} style={{ backgroundImage: `url(${notFound})` }}></div>;
};

export default Page404;
