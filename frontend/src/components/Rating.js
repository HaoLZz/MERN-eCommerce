import React from 'react';
import PropTypes from 'prop-types';

// Convert ratings in numbers to corresponing font awesome icon classes
function ratingNumToStar(ratingNum) {
  if (ratingNum === 1) return 'fas fa-star';
  else if (ratingNum === 0.5) return 'fas fa-star-half-alt';
  else return 'far fa-star';
}

const Rating = ({ value, text, starTotalNum = 5, color = '#f8e825' }) => {
  let indexArr = Array.from(Array(starTotalNum), (_, i) => {
    if (i <= value - 1) {
      return 1;
    } else if (value - i === 0.5) {
      return 0.5;
    } else return 0;
  });

  return (
    <div className="rating">
      {indexArr.map((i, index) => (
        <span key={index}>
          <i className={ratingNumToStar(i)} style={{ color }}></i>
        </span>
      ))}
      <span>{text && text}</span>
    </div>
  );
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  starTotalNum: PropTypes.number,
};

export default Rating;
