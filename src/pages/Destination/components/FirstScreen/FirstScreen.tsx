import React from 'react';

import backgroundImage from '../../../../assets/images/firstScreen.png';

import styles from './firstScreen.module.scss';

const FirstScreen = () => {
    return (
        <div className={styles.container} style={{ backgroundImage: `url(${backgroundImage})` }}>
            <h2 className={styles.heading}>Discovering the wonders of our planet, one adventure at a time</h2>
        </div>
    );
};

export default FirstScreen;
