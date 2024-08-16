import React from 'react';
import {Row } from 'react-bootstrap';
import './loadingspinner.css';

const LoadingSpinner = ({ isPlacingOrder }) => {
  return (
    <div className="spinner-container">
      <Row>
      <div className="spinner"></div>
      <>
      {isPlacingOrder && (
        <p className='text-p'>Your Order is getting placed. Please wait!</p>
      )}</>
      </Row>
    </div>
  );
};

export default LoadingSpinner;