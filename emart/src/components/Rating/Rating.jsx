import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './rating.css'; // Optional, for additional styling

const Rating = ({ value, max = 5 }) => {
  const stars = [];
  
  for (let i = 1; i <= max; i++) {
    stars.push(
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        className={i <= value ? 'filled-star' : 'empty-star'}
      />
    );
  }

  return <div className="rating">{stars}</div>;
};

export default Rating;
