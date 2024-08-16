import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import './emptycart.css';


const EmptyCart = () => {
  const [animationData, setAnimationData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/assets/emptycart.json`)
      .then(response => response.json())
      .then(data => setAnimationData(data));
  }, []);
  return (
    <div className="cart-empty-container">
      <div className="cart-empty-content">
        <Lottie animationData={animationData} className="cart-empty-animation" />
        <h1 className='text-h1'>Your Cart is <span className="empty-text">Empty!</span></h1>
        <p className='text-p'>Must add items on the cart before you proceed to check out.</p>
        <button className="return-button" onClick={() => navigate('/')}>
          <FontAwesomeIcon className="arrow" icon={faAngleLeft} />RETURN TO SHOP</button>
      </div>
    </div>
  );
};

export default EmptyCart;