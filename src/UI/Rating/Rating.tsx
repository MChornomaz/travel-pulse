import React, { useState } from 'react';

type RatingProps = {
    rating: number;
    onRatingChange: (rating: number) => void;
};

const Rating: React.FC<RatingProps> = ({ rating, onRatingChange }) => {
    const [hoverRating, setHoverRating] = useState(0);

    const handleRatingClick = (clickedRating: number) => {
        onRatingChange(clickedRating);
    };

    const handleMouseEnter = (enteredRating: number) => {
        setHoverRating(enteredRating);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onMouseLeave={handleMouseLeave}>
            {[1, 2, 3, 4, 5].map((starNumber) => (
                <svg
                    key={starNumber}
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    style={{
                        fill: starNumber <= (hoverRating || rating) ? '#4169E1' : 'transparent',
                        stroke: '#4169E1',
                        strokeWidth: 2,
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        cursor: 'pointer',
                    }}
                    onMouseEnter={() => handleMouseEnter(starNumber)}
                    onClick={() => handleRatingClick(starNumber)}
                >
                    <path d="M12 2 L15.09 8.14 L22 9.09 L17 14.54 L18.18 21.01 L12 18.18 L5.82 21.01 L7 14.54 L2 9.09 L8.91 8.14 Z" />
                </svg>
            ))}
        </div>
    );
};

export default Rating;
