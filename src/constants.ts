import media1 from './assets/images/magazine1.png';
import media2 from './assets/images/magazine2.png';
import media3 from './assets/images/magazine3.png';
import media4 from './assets/images/magazine4.png';
import media5 from './assets/images/magazine5.png';

export const MEDIAS = [
    {
        id: '1',
        imageUrl: media1,
        name: 'The New York Times',
    },
    {
        id: '2',
        imageUrl: media2,
        name: 'TRAVEL+ LEISURE',
    },
    {
        id: '3',
        imageUrl: media3,
        name: 'CNN',
    },
    {
        id: '4',
        imageUrl: media4,
        name: 'Visit Oslo',
    },
    {
        id: '5',
        imageUrl: media5,
        name: 'visitflorida.com',
    },
];

export const TOP_LOCATIONS = {
    title: 'Top Locations to Explore',
    subtitle: 'Here are some of the most visited places in 2023',
};

export const PLAN_TRIP = {
    title: ' Plan your best trip ever',
    subtitle: 'Making the Most of Your Travel Experience in 2023',
    buttonText: 'View All Places',
};

export const SEARCH_PLACES = {
    title: ' Places based on your search',
    subtitle: 'You should definitely visit them ',
    buttonText: 'View All Places',
};

export const LOCATIONS_BASE_ON_SEARCH = {
    title: 'Locations based on search',
    subtitle: 'Check out fun places based on your searches',
};

export const TOP_STORIES = {
    title: 'Top Travel Stories',
    subtitle: 'Explore our latest stories from our active users',
    buttonText: 'View All Stories',
};

export const SELECT_BY_REGION = [
    { id: '1', name: 'Europe', value: 'Europe' },
    { id: '2', name: 'Asia', value: 'Asia' },
    { id: '3', name: 'North America', value: 'North America' },
    { id: '4', name: 'South America', value: 'South America' },
    { id: '5', name: 'Africa', value: 'Africa' },
    { id: '6', name: 'Australia', value: 'Australia' },
];

export const SELECT_BY_TIME = [
    { id: '1', name: 'This month', value: '1' },
    { id: '2', name: 'In last 3 months', value: '2' },
    { id: '3', name: 'In last 9 months', value: '3' },
    { id: '4', name: 'In last 12 months', value: '4' },
    { id: '5', name: 'More than a year ago', value: '5' },
];

export const DESTINATIONS_SORT_BY = [
    { id: '1', name: 'Alphabet (Ascending)', value: 'az' },
    { id: '2', name: 'Alphabet (Descending)', value: 'za' },
];

export const SINGLE_POST_DESTINATIONS = {
    selectInfo: {
        placeholder: 'Top Places',
        items: [
            { id: '1', name: 'Alphabet (Ascending)', value: 'az' },
            { id: '2', name: 'Alphabet (Descending)', value: 'za' },
        ],
    },
    url: '/destination/',
    buttonText: 'View All Top Attractions',
};

export const SINGLE_POST_PLACES = {
    selectInfo: {
        placeholder: 'All Popular Places',
        items: [
            { id: '1', name: 'Alphabet (Ascending)', value: 'az' },
            { id: '2', name: 'Alphabet (Descending)', value: 'za' },
        ],
    },
    url: '/destination/',
    buttonText: 'View All Other Places',
};

export const LATEST_STORIES = {
    title: 'Latest Stories from Croatia',
    subtitle: '',
    buttonText: 'View All Stories',
};

export const ROUTES = {
    DESTINATIONS: '/destination',
    STORIES: '/stories',
    REVIEWS: '/reviews',
    ADD_REVIEW: '/reviews/add',
    UPDATE_REVIEW: '/reviews/update',
    INFO: '/info',
    PLACES: '/places',
    RESULTS: '/results',
};
