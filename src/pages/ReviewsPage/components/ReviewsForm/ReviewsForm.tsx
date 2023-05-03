import React, { useState, useCallback, ChangeEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { fetchReviews } from '../../../../store/reviews/reviews-actions';
import { selectReviews } from '../../../../store/store';
import useInput from '../../../../hooks/useInput';

import cameraIcon from '../../../../assets/images/camera.svg';
import FormInput from '../../../../UI/Buttons/inputs/FormInput/FormInput';
import FormTextArea from '../../../../UI/Buttons/inputs/FormTextArea/FormTextArea';
import FormSelect from '../../../../UI/Buttons/inputs/FormSelect/FormSelect';
import FormButton from '../../../../UI/Buttons/FormButton/FormButton';
import { ROUTES } from '../../../../constants';
import { SELECT_BY_REGION } from '../../../../constants';

import styles from './reviewsForm.module.scss';

const ReviewsForm = () => {
    const {
        value: title,
        isValid: titleIsValid,
        hasError: titleHasError,
        valueChangeHandler: titleChangeHandler,
        inputBlurHandler: titleInputBlurHandler,
        reset: resetTitle,
        setValue: setTitle,
    } = useInput((value) => value.length > 3);

    const {
        value: description,
        isValid: descriptionIsValid,
        hasError: descriptionHasError,
        valueChangeHandler: descriptionChangeHandler,
        inputBlurHandler: descriptionInputBlurHandler,
        reset: resetDescription,
        setValue: setDescription,
    } = useInput((value) => value.length > 10);

    const {
        value: location,
        isValid: locationIsValid,
        hasError: locationHasError,
        valueChangeHandler: locationChangeHandler,
        inputBlurHandler: locationInputBlurHandler,
        reset: resetLocation,
        setValue: setLocation,
    } = useInput((value) => value.length > 1);

    const {
        value: country,
        isValid: countryIsValid,
        hasError: countryHasError,
        valueChangeHandler: countryChangeHandler,
        inputBlurHandler: countryInputBlurHandler,
        reset: resetCountry,
        setValue: setCountry,
    } = useInput((value) => value.length > 1);

    const [region, setRegion] = useState('');
    const [img, setImg] = useState<File | null>(null);
    const [imgPreviewUrl, setImgPreviewUrl] = useState<string | null>(null);
    const [imageChanged, setImageChanged] = useState(false);
    const [update, setUpdate] = useState(false);
    const [rate, setRate] = useState('');
    const [checkboxChecked, setCheckboxChecked] = useState(false);

    const [imageIsValid, setImageIsValid] = useState(true);
    const [imageHasError, setImageHasError] = useState(false);
    const [imageTouched, setImageTouched] = useState(false);

    const [regionIsValid, setRegionIsValid] = useState(false);
    const [regionHasError, setRegionHasError] = useState(false);
    const [regionTouched, setRegionTouched] = useState(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { reviews } = useAppSelector(selectReviews);

    const startingRegion = region;

    useEffect(() => {
        if (startingRegion !== region) {
            setRegionTouched(true);
        }
    }, [region]);

    const params = useParams();

    useEffect(() => {
        if (img || imgPreviewUrl || imageChanged) {
            setImageIsValid(true);
        } else {
            setImageIsValid(false);
        }
        if (imageTouched) {
            if (!imageIsValid) {
                setImageHasError(true);
            } else {
                setImageHasError(false);
            }
        }
    }, [imageIsValid, imgPreviewUrl, img, imageChanged, imageTouched]);

    useEffect(() => {
        if (region !== '') {
            setRegionIsValid(true);
        } else {
            setRegionIsValid(false);
        }

        if (regionTouched) {
            if (!regionIsValid) {
                setRegionHasError(true);
            } else {
                setRegionHasError(false);
            }
        }
    }, [region, regionIsValid, regionTouched]);

    useEffect(() => {
        if (params.reviewId && reviews.length > 0) {
            const selectedReview = reviews.find((el) => el.id === params.reviewId);
            setUpdate(true);

            if (selectedReview) {
                setDescription(selectedReview.description);
                setTitle(selectedReview.heading);
                setLocation(selectedReview.location);
                setRegion(selectedReview.region);
                setImgPreviewUrl(`${process.env.REACT_APP_SERVER_URL}${selectedReview.imageUrl}`);
                setCountry(selectedReview.country);
                setRate(selectedReview.rate.toString());
            }
        }
    }, []);

    const selectRegionHandler = useCallback((value: string) => {
        setRegion(value);
    }, []);

    const checkboxCheckHandler = useCallback(() => {
        setCheckboxChecked(!checkboxChecked);
    }, [checkboxChecked]);

    const imageBlurHandler = useCallback(() => {
        setImageTouched(true);
    }, [checkboxChecked]);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImg(file);
            setImgPreviewUrl(URL.createObjectURL(file));
            setImageChanged(true);
        }
    }, []);

    const formIsValid =
        titleIsValid &&
        descriptionIsValid &&
        locationIsValid &&
        imageIsValid &&
        regionIsValid &&
        countryIsValid &&
        checkboxChecked;

    const formSubmitHandler = useCallback(
        async (e: ChangeEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (formIsValid) {
                const formData = new FormData();

                if (!update) {
                    formData.append('image', img ? img : '');
                    formData.append('location', location);
                    formData.append('heading', title);
                    formData.append('description', description);
                    formData.append('region', region);
                    formData.append('country', country);

                    try {
                        await fetch(`${process.env.REACT_APP_SERVER_URL}/reviews/create`, {
                            method: 'POST',
                            body: formData,
                        }).then((res) => {
                            if (res.status === 201) {
                                dispatch(fetchReviews());
                                navigate(ROUTES.REVIEWS);
                            }
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }

                if (update && params.reviewId) {
                    const selectedImage = imageChanged ? img : imgPreviewUrl;

                    formData.append('id', params.reviewId);
                    formData.append('image', selectedImage || '');
                    formData.append('location', location);
                    formData.append('heading', title);
                    formData.append('description', description);
                    formData.append('region', region);
                    formData.append('country', country);
                    formData.append('rate', rate);

                    try {
                        await fetch(`${process.env.REACT_APP_SERVER_URL}/reviews/update`, {
                            method: 'PATCH',
                            body: formData,
                        }).then((res) => {
                            if (res.status === 201) {
                                dispatch(fetchReviews());
                                navigate(ROUTES.REVIEWS);
                                resetCountry();
                                resetDescription();
                                resetLocation();
                                resetTitle();
                            }
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        },
        [img, location, title, description, region, country, formIsValid],
    );

    return (
        <div className="container">
            <form className={styles.form} onSubmit={formSubmitHandler}>
                <div className={styles['form__image-block']}>
                    <label htmlFor="review-image" className={styles['form__image-container']}>
                        {imgPreviewUrl ? (
                            <img className={styles['form__image-photo']} src={imgPreviewUrl} alt="Selected image" />
                        ) : (
                            <img className={styles['form__image-icon']} src={cameraIcon} alt="Camera icon" />
                        )}
                    </label>
                    <input
                        type="file"
                        id="review-image"
                        name="review-image"
                        accept="image/png, image/jpeg"
                        className={styles.form__file}
                        onChange={handleFileChange}
                        onBlur={imageBlurHandler}
                    />
                    {imageHasError && <p>Please add an image to your review</p>}
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
                        onBLur={titleInputBlurHandler}
                    />
                    {titleHasError && <p className={styles.error}>Title must be not less than 3 characters</p>}
                    <FormTextArea
                        id="review-description"
                        name="review-description"
                        label="Your review"
                        placeholder="A detailed review of your Travel Journey. Travellers will love to know your experience"
                        onChange={descriptionChangeHandler}
                        value={description}
                        onBlur={descriptionInputBlurHandler}
                    >
                        {description}
                    </FormTextArea>
                    {descriptionHasError && (
                        <p className={styles.error}>Description must be not less than 10 characters</p>
                    )}
                    <div>
                        <FormInput
                            id="review-location"
                            name="review-location"
                            placeholder="Enter Travel Location"
                            label="Location"
                            type="text"
                            value={location}
                            onChange={locationChangeHandler}
                            onBLur={locationInputBlurHandler}
                        />
                        {locationHasError && <p className={styles.error}>Please enter location</p>}
                        <FormInput
                            id="review-country"
                            name="review-country"
                            placeholder="Enter Travel Country"
                            label="Country"
                            type="text"
                            value={country}
                            onChange={countryChangeHandler}
                            onBLur={countryInputBlurHandler}
                        />
                        {countryHasError && <p className={styles.error}>Please enter country</p>}
                        {!update && (
                            <FormSelect
                                placeholder="Select One"
                                options={SELECT_BY_REGION}
                                onSelect={selectRegionHandler}
                            />
                        )}
                        {!update && regionHasError && <p className={styles.error}>Please select a region</p>}
                        {update && (
                            <FormSelect
                                placeholder="Select One"
                                options={SELECT_BY_REGION}
                                onSelect={selectRegionHandler}
                                onLoad={region}
                            />
                        )}
                        {update && regionHasError && <p className={styles.error}>Please select a region</p>}
                    </div>
                    <div className={styles['form__terms-block']}>
                        <input
                            type="checkbox"
                            name="terms"
                            id="terms"
                            className={styles['styled-checkbox']}
                            checked={checkboxChecked}
                            onChange={checkboxCheckHandler}
                        />
                        <label htmlFor="terms" className={styles.form__terms}>
                            I certify that the information in this review is based solely on my own experiences with the
                            product or service in question. I also attest that I have no personal or professional
                            affiliation with the business in question and have not been given any incentives or payment
                            from the business to write this review. I am aware that fake reviews are strictly prohibited
                            on Tripadvisor.
                        </label>
                    </div>
                    <FormButton inverted={true} disabled={!formIsValid} type="submit">
                        Submit Review
                    </FormButton>
                </div>
            </form>
        </div>
    );
};

export default ReviewsForm;
