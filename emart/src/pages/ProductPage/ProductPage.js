import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './productpage.css';
import Header from '../../components/Header/Header';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Rating from '../../components/Rating/Rating';
import Notification from '../../components/Notification/Notification';
import { UserContext } from '../../context/UserContext';

function ProductPage() {

  const { loggedIn, userType, userEpoint, setUserEpoint, setCartItemCount } = useContext(UserContext);

  const { productId } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(128);
  const { addToCart } = useCart();
  const [checkboxState, setCheckboxState] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ message: '', show: false });

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`http://localhost:8080/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        setError("There was an error fetching the product!", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  const handleStorageChange = (storage) => {
    setSelectedStorage(storage);
  };

  const handleAddToCart = () => {
    if(loggedIn) {
      if (product) {
        const price = (userType > 0) 
                      ? product.isdiscounted === 1 
                        ? product.price - product.price * 0.1 
                        : checkboxState 
                          ? product.price - 100
                          : product.price
                      : product.price;
        const cartProduct = { 
          ...product, 
          price, 
          key: `${product.productId}-${checkboxState}`, // Unique key for the cart item based on checkbox state
          appliedCredits: checkboxState,
          selectedStorage: selectedStorage || 128
        };
        if (checkboxState === true) {
          if (userEpoint >= 100) {
            // User has enough points to apply the discount
            setUserEpoint(userEpoint - 100);
            addToCart(cartProduct);
            setCartItemCount(prevCount => prevCount + 1); // Increment cart item count
            setNotification({ message: 'Product successfully added to cart', show: true });
          } else {
            // User does not have enough points to apply the discount
            setNotification({ message: 'Not enough credits to apply discount', show: true });
          }
        } else {
          // No discount applied, just add the product to the cart
          addToCart(cartProduct);
          setCartItemCount(prevCount => prevCount + 1); // Increment cart item count
          setNotification({ message: 'Product successfully added to cart', show: true });
        }      
        setTimeout(() => setNotification({ ...notification, show: false }), 3000); // Hide after 3 seconds
        setCheckboxState(false);
      }
    } else {
      const productpageid = product.productId;
      navigate('/signup', { state: {productpageid} });
      setNotification({ message: 'Please SignUp!', show: true });
    }
  };

  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    setCheckboxState(!checkboxState);
  };

  const storages = [128, 256, 512];

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="product-card">
          <p>Product not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="product-card">
        <div>
          <img
            className='product-image'
            src={`${process.env.PUBLIC_URL}${product.imagepath}`}
            alt={`Product ${product.productname}`}
          />
        </div>
        <div className="product-details">
          <h2 className="product-name">{product.productname}</h2>
          <h3 className="product-description">({product.shortdesc}, {selectedStorage} GB)</h3>
          
          {product.stockQuantity === 0 ? 
            <p className="fine-print text-danger">Out of Stock</p> 
            : <p className="fine-print text-success">In Stock {product.stockQuantity}</p>}

          <p><Rating value={product.rating} /></p>
          
          {loggedIn && userType > 0 ? 
            (product.isdiscounted === 0)? (
              <div>
                <p className='price-s'>₹{product.price}</p>
                <div>
                  <Form.Check type="checkbox" name="epoint" style={{ display: 'inline-block', marginRight: '10px' }}
                    checked={checkboxState}
                    onChange={handleCheckboxChange}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <p className="price">₹{product.price - 100}{' + '}
                  <img className='coin-32px' src={`${process.env.PUBLIC_URL}/assets/images/coin.png`} alt="Coin"></img>
                  {'100'}</p>
                </div>
              </div>
            ):(
              <div className='offer-product'>
                <h5 className="price-s"><s>₹{product.price}</s></h5>
                <h4 className="discounted-price">₹{product.price - product.price*0.1}</h4>
              </div>
              )
          : (
            <p className="price">₹{product.price}</p>
          )}

          <p className='longdesc-p'>{product.longdesc}</p>
          <h3 className='storage-h3'>Storage</h3>
          <div className="storage-options">
            {storages.map((storage) => (
              <button
                key={storage}
                onClick={() => handleStorageChange(storage)}
                className={storage === selectedStorage ? 'storage-button current' : 'storage-button'}>
                {storage} GB
              </button>
            ))}
          </div>
          <br />
          <button className="add-to-cart" 
            onClick={handleAddToCart}
            disabled={
              product.stockquantity <= 0 //  || !loggedIn ||
              }>Add to cart</button>
          <button className="buy-now" disabled={product.stockquantity <= 0}>Buy Now</button>
          <br />
          <div className="delivery">
            <label className='delivery-label'>Enter Delivery Pincode</label><br />
            <input className='delivery-input' type="text" placeholder="Enter pincode" />
            <button className="check">Check</button>
          </div>
          <p className="fine-print">Delivery may take up to 6-7 days depending on the pincode</p>
        </div>
      </div>
      <Notification message={notification.message} show={notification.show} />
    </div>
  );
}

export default ProductPage;
