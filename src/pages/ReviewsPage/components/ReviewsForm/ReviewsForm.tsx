import React, { useState, useCallback } from 'react';

import cameraIcon from '../../../../assets/images/camera.svg';
import FormInput from '../../../../UI/Buttons/inputs/FormInput/FormInput';
import FormTextArea from '../../../../UI/Buttons/inputs/FormTextArea/FormTextArea';
import FormSelect from '../../../../UI/Buttons/inputs/FormSelect/FormSelect';
import { SELECT_BY_TIME } from '../../../../constants';
import FormButton from '../../../../UI/Buttons/FormButton/FormButton';

import styles from './reviewsForm.module.scss';

const ReviewsForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [travelTime, setTravelTime] = useState('');

    const titleChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }, []);

    const locationChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
    }, []);

    const descriptionChangeHandler = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    }, []);

    const selectTimeHandler = useCallback((value: string) => {
        setTravelTime(value);
    }, []);

    return (
        <div className="container">
            <form className={styles.form}>
                <div className={styles['form__image-block']}>
                    <label htmlFor="review-image" className={styles['form__image-container']}>
                        <img className={styles['form__image-icon']} src={cameraIcon} alt="camera" />
                    </label>
                    <input
                        type="file"
                        id="review-image"
                        name="review-image"
                        accept="image/png, image/jpeg"
                        className={styles.form__file}
                    />
                </div>
                <div className={styles.form__data}>
                    <FormInput
                        id="review-title"
                        name="review-title"
                        placeholder="Summarize your Travel Journey"
                        label="Title of your review"
                        type="text"
                        value={title}
                        onChange={titleChangeHandler}
                    />
                    <FormTextArea
                        id="review-description"
                        name="review-description"
                        label="Your review"
                        placeholder="A detailed review of your Travel Journey. Travellers will love to know your experience"
                        onChange={descriptionChangeHandler}
                        value={description}
                    >
                        {description}
                    </FormTextArea>
                    <div>
                        <FormInput
                            id="review-location"
                            name="review-location"
                            placeholder="Enter Travel Location"
                            label="Location"
                            type="text"
                            value={location}
                            onChange={locationChangeHandler}
                        />
                        <FormSelect placeholder="Select One" options={SELECT_BY_TIME} onSelect={selectTimeHandler} />
                    </div>
                    <div className={styles['form__terms-block']}>
                        <input type="checkbox" name="terms" id="terms" className={styles['styled-checkbox']} />
                        <label htmlFor="terms" className={styles.form__terms}>
                            I certify that the information in this review is based solely on my own experiences with the
                            product or service in question. I also attest that I have no personal or professional
                            affiliation with the business in question and have not been given any incentives or payment
                            from the business to write this review. I am aware that fake reviews are strictly prohibited
                            on Tripadvisor.
                        </label>
                    </div>
                    <FormButton inverted={true} type="submit">
                        Submit Review
                    </FormButton>
                </div>
            </form>
        </div>
    );
};

export default ReviewsForm;
