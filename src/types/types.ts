import { ChangeEvent } from 'react';
import { SelectItem } from '../UI/Buttons/inputs/Select/Select';

export type SingleCard = {
    id: string;
    imageUrl: string;
    heading: string;
};

export type MainScreenCardProps = {
    cardInfo: SingleCard;
};
export type MainScreenProps = {
    heading: string;
};

export type MediaItem = {
    id: string;
    imageUrl: string;
    name: string;
};

export type FeaturedBlockProps = {
    media: MediaItem[];
};

export type DestinationInfo = {
    id: string;
    imageUrl: string;
    location: string;
    place: string;
    country: string;
};

export type PlaceSliderProps = {
    title: string;
    subtitle: string;
    destinations: DestinationInfo[];
};

export type TownShort = {
    id: string;
    imageUrl: string;
    place: string;
};

export type InfoBlockProps = {
    info: {
        title: string;
        subtitle: string;
        buttonText: string;
    };
    towns: Place[];
};

export type StoryShort = {
    id: string;
    location: string;
    imageUrl: string;
    creationDate: string;
    timeToRead: number;
    heading: string;
    description: string;
    region: string;
    country: string;
    place: string;
};

export type StoryBlockProps = {
    data: {
        subtitle: string;
        buttonText: string;
    };
    title: string;
    stories: StoryShort[];
    numberOfPosts: number;
};

export type DestinationsShort = {
    id: string;
    imageUrl: string;
    region: string;
    place: string;
};

export type ReviewCard = {
    id: string;
    imageUrl: string;
    location: string;
    heading: string;
    description: string;
    rate: number;
};

export type ReviewCardProps = {
    cardInfo: ReviewCard;
};

export type FormInputProps = {
    id: string;
    name: string;
    type: string;
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onBLur?: () => void;
    placeholder?: string;
    testId?: string;
};

export type FormTextAreaProps = {
    id: string;
    name: string;
    label: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    children: string;
    value: string;
    testId?: string;
    onBlur?: () => void;
};

export type ButtonLightProps = {
    children: string;
    type: 'button' | 'submit' | 'reset' | undefined;
    onClick?: () => void | ((a: string) => void);
    testid?: string;
    icon?: string;
};

export type FormButtonProps = {
    children: string;
    type: 'button' | 'submit' | 'reset' | undefined;
    onClick?: () => void | ((a: string) => void);
    testid?: string;
    inverted?: boolean;
    wide?: boolean;
    disabled?: boolean;
};

export type SinglePostData = {
    id: string;
    place: string;
    location: string;
    imageUrl: string;
    description: string;
    region: string;
    country: string;
};

export type PlaceShort = {
    id: string;
    imageUrl: string;
    place: string;
};

export type BlockWithFiltersProps = {
    selectInfo: {
        placeholder: string;
        items: SelectItem[];
    };
    cardsInfo: PlaceShort[];
    url: string;
    buttonText: string;
    title: string;
};

export type PlaceCardProps = {
    url: string;
    placeInfo: PlaceShort;
};

export type SingleInfoItem = {
    id: string;
    place: string;
    location: string;
    imageUrl: string;
    description: string;
    heading: string;
    region: string;
    country: string;
};

export type Destination = {
    id: string;
    imageUrl: string;
    location: string;
    place: string;
    description: string;
    region: string;
    country: string;
};

export type Place = {
    id: string;
    imageUrl: string;
    place: string;
    location: string;
    description: string;
    region: string;
    country: string;
};

export type Review = {
    id: string;
    imageUrl: string;
    location: string;
    heading: string;
    description: string;
    rate: number;
    region: string;
    country: string;
};

export type User = {
    isAuth: boolean;
    userName: string | null;
    role: string | null;
    token: string | null;
    userIsLoading: boolean;
    userHasError: null | string;
};

export type NewUser = {
    name: string;
    email: string;
    password: string;
};

export type UserLogin = {
    email: string;
    password: string;
};

export type UserExisting = {
    userName: string | null;
    role: string | null;
    token: string | null;
};

export type StylingState = {
    headerInverted: boolean;
};

export type ModalCloseProps = {
    onClose: () => void;
};
