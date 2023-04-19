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
    cards: SingleCard[];
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

export type PlaceInfo = {
    id: string;
    imageUrl: string;
    location: string;
    name: string;
};

export type PlaceSliderProps = {
    sliderInfo: {
        title: string;
        subtitle: string;
        places: PlaceInfo[];
    };
};

export type TownShort = {
    id: string;
    imageUrl: string;
    name: string;
};

export type InfoBlockProps = {
    info: {
        title: string;
        subtitle: string;
        buttonText: string;
        towns: TownShort[];
    };
};

export type StoryShort = {
    id: string;
    location: string;
    imageUrl: string;
    creationDate: string;
    timeToRead: number;
    heading: string;
    description: string;
};

export type StoryBlockProps = {
    data: {
        title: string;
        subtitle: string;
        buttonText: string;
        stories: StoryShort[];
    };
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
};

export type SinglePostData = {
    id: string;
    place: string;
    location: string;
    imageUrl: string;
    description: string;
};

export type BlockWithFiltersProps = {
    selectInfo: {
        placeholder: string;
        items: SelectItem[];
    };
    cardsInfo: MediaItem[];
    url: string;
    buttonText: string;
    title: string;
};

export type PlaceCardProps = {
    url: string;
    placeInfo: MediaItem;
};
