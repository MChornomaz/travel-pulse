import React from 'react';

import { FeaturedBlockProps } from '../../../../types/types';

import styles from './featuredBlock.module.scss';

const FeaturedBlock = (props: FeaturedBlockProps) => {
    return (
        <section className={styles.media}>
            <div className="container">
                <h3>ALSO FEATURED IN</h3>
                <div className={styles.media__content}>
                    {props.media.map((el) => (
                        <div className={styles.media__image} key={el.id}>
                            <img src={el.imageUrl} alt={el.name} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedBlock;
