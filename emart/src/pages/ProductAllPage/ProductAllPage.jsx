import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Card, Alert } from 'react-bootstrap';
import './productallpage.css';
import Header from '../../components/Header/Header';
import Rating from '../../components/Rating/Rating';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useCart } from '../../context/CartContext';
import { UserContext } from '../../context/UserContext';
import Notification from '../../components/Notification/Notification';

const ProductAllPage = () => {

  const { loggedIn, userType, userEpoint, setUserEpoint, setCartItemCount } = useContext(UserContext);

  const { subcategoryid } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ message: '', show: false });
  const [checkboxState, setCheckboxState] = useState({});
  const selectedStorage = 128;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/subcategory/${subcategoryid}`);
        setProducts(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [subcategoryid]);

  const handleAddToCart = (product) => {
    if(loggedIn){
      if (checkboxState[product.productId] && userEpoint < 100) {
        setNotification({ message: 'Not enough credits to apply discount', show: true });
        return;
      }

      const price = (loggedIn && userType > 0) ? 
                      product.isdiscounted === 1 ? 
                        product.price - product.price * 0.1 
                      :
                        checkboxState[product.productId] ?
                          product.price - 100
                        :
                          product.price
                    :
                      product.price;
                      
      const cartProduct = { 
        ...product, 
        price, 
        key: `${product.productId}-${checkboxState[product.productId]}`, // Unique key for the cart item based on checkbox state
        appliedCredits: checkboxState[product.productId] ? 100 : 0,  // Indicate whether credits were applied
        checked: checkboxState[product.productId] ? true : false,  // Indicate whether the checkbox was checked
        selectedStorage: selectedStorage || 128
      };

      if (checkboxState[product.productId] === true) {
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
    } else{
      const productpageall = subcategoryid;
      navigate('/signup', { state: {productpageall} });
      setNotification({ message: 'Please SignUp!', show: true });
    }
  };

  const handleCheckboxChange = (e, productId) => {
    e.stopPropagation();
    setCheckboxState(prevState => ({
      ...prevState,
      [productId]: !prevState[productId]
    }));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Alert variant="danger">Error loading products: {error.message}</Alert>;
  }

  if (products.length === 0) {
    return (
      <div>
        <Header />
        <Container>
          <Alert variant="warning">Product not found for this subcategory.</Alert>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Container>
        <Row className="row-productall">
          {products.map((product) => {
            return (
              <Card
                className="card-productall"
                key={product.productId}
                onClick={() => navigate(`/product/${product.productId}`)}
              >
                <Card.Body>
                  <Row>
                    <Col md={3}>
                      <Card.Img className='card-product-img' src={product.imagepath} alt={product.productname} />
                    </Col>
                    <Col>
                      <h4 className='product-name'>{product.productname}</h4>
                      <h5 className="product-description">({product.shortdesc})</h5>
                      <p className="fine-print">Brand: {product.brandname}</p>

                      {product.stockquantity > 0 ?
                        <p className="fine-print text-success">In Stock: {product.stockquantity}</p>
                        : <p className="fine-print text-danger">Out of Stock</p>}

                      <p><Rating value={product.rating} /></p>
                      {loggedIn && userType === 1 ?
                        product.isdiscounted === 1 ? (
                          <div className='offer-product'>
                            <p className="price-s"><s>₹{product.price}</s></p>
                            <p className="discounted-price">₹{product.price - product.price * 0.1}</p>
                          </div>
                        ) : (
                          <div>
                            <p className='price-s'>₹{product.price}</p>
                            <div>
                              <Form.Check type="checkbox" name="epoint" style={{ display: 'inline-block', marginRight: '10px' }}
                                checked={checkboxState[product.productId] || false}
                                onChange={(e) => handleCheckboxChange(e, product.productId)}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <p className="price">₹{product.price - 100}{' + '}
                              <img className='coin-32px' src={`${process.env.PUBLIC_URL}/assets/images/coin.png`} alt="Coin"></img>
                              {'100'}</p>
                            </div>
                          </div>
                        ) : (
                          <p className="price">₹{product.price}</p>
                      )}
                      <p>{product.longdesc}</p>
                      <button className="add-to-cart"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product); // Add product to cart and show notification
                        }}
                        disabled={product.stockquantity <= 0}>Add to cart</button>
                      <button className="buy-now"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/checkout/${product.productId}`); // Navigate to checkout with product
                        }}>Buy Now</button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </Container>
      <Notification message={notification.message} show={notification.show} />
    </div>
  );
};

export default ProductAllPage;
