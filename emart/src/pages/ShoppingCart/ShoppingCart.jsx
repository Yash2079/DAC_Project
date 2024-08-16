import React, { useRef, useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import EmptyCart from '../../components/EmptyCart/EmptyCart';
import Header from '../../components/Header/Header';
import Notification from '../../components/Notification/Notification';
import { UserContext } from '../../context/UserContext';
import './shoppingcart.css'; // CSS for styling
import axios from 'axios'; // Import axios for making API calls
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { v4 as uuidv4 } from 'uuid';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Invoice from '../../components/Invoice/Invoice';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { loggedIn, userId, userType, userEpoint, setUserEpoint, setCartItemCount } = useContext(UserContext);
  const { cartItems, incrementItem, decrementItem, removeFromCart } = useCart();
  const invoiceRef = useRef(null); // Use this ref to capture the entire container
  const { userEmail, userName } = useContext(UserContext); // Get userEmail and userName from context
  const [notification, setNotification] = useState({ message: '', show: false });
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);


  function formatInvoiceId(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Return the formatted date as YYYYMMDDHHMMSS
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  }
  const invoiceId = new Date();

  function formatCustomDate(date) {
    const day = new Intl.DateTimeFormat('en-GB', { day: '2-digit' }).format(date);
    const month = new Intl.DateTimeFormat('en-GB', { month: 'short' }).format(date);
    const year = new Intl.DateTimeFormat('en-GB', { year: '2-digit' }).format(date);
    
    return `${day}, ${month} ${year}`;
  }
  const currentDate = new Date();


  const handleContinueShopping = () => {
    navigate('/', { replace: true });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const calculateTax = () => {
    const subtotal = parseFloat(calculateTotal());
    const taxRate = 0.10; // Assuming a 10% tax rate
    return (subtotal * taxRate).toFixed(2);
  };

  const handleCheckout = async () => {
    if (!userEmail) {
      setNotification({ message: 'Please sign in to checkout', show: true });
      return;
    }

    setIsPlacingOrder(true);

    try {

      // Generate PDF from the entire shopping cart container
      const cartElement = invoiceRef.current;

      // Capture the cartElement as a canvas with a lower scale (for compression)
      const canvas = await html2canvas(cartElement, {
        scale: 2, // Lower the scale if needed to reduce the size
        useCORS: true,
      });

      // Reduce the image quality for PDF compression
      const imgData = canvas.toDataURL('image/jpeg', 0.7); // Adjust the quality (0.7) as needed
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'JPEG', 10, 10, 190, 0); // Adjust the width and height to fit the PDF page

      // Create a unique filename for the PDF
      const uniqueId = uuidv4();
      const filename = `cart_summary_${uniqueId}.pdf`;

      // Save PDF to a blob
      let pdfBlob = pdf.output('blob');

      // Try to reduce the PDF size if it's still larger than 3MB
      const maxSizeInBytes = 3 * 1024 * 1024;
      while (pdfBlob.size > maxSizeInBytes) {
        const currentScale = canvas.scale ? canvas.scale : 1;
        const newScale = currentScale * 0.9; // Decrease scale slightly to reduce size

        const smallerCanvas = await html2canvas(cartElement, {
          scale: newScale,
          useCORS: true,
        });
        const smallerImgData = smallerCanvas.toDataURL('image/jpeg', 0.7);
        pdf.addImage(smallerImgData, 'JPEG', 10, 10, 190, 0);

        pdfBlob = pdf.output('blob');
      }

      // Check if the PDF size is still larger than 3MB
      if (pdfBlob.size > maxSizeInBytes) {
        setNotification({ message: 'The PDF file size exceeds the 3MB limit even after compression. Please reduce the content or try again.', show: true });
        return;
      }

      // Create form data to send the PDF as an attachment
      const formData = new FormData();
      formData.append('file', pdfBlob, filename);

      // Add email details to the form data
      const emailDetails = {
        recipient: userEmail,
        subject: "Your Shopping Cart Summary",
        messageBody: `Dear ${userName}, please find the attached order summary for your recent purchase.`,
        attachment: filename,
      };

      // Convert emailDetails to JSON and append to formData
      const emailDetailsBlob = new Blob([JSON.stringify(emailDetails)], { type: 'application/json' });
      formData.append('details', emailDetailsBlob);

      // Send the email with the PDF attachment
      await axios.post('http://localhost:8080/api/sendMailWithAttachment', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });


      // Post invoice data to the backend
      const invoiceid = formatInvoiceId(invoiceId);
      const invoicedate = formatCustomDate(currentDate);
      const tax = parseFloat(calculateTax());

      const invoiceData = {
        invoiceid: invoiceid,
        date: invoicedate,
        tax: tax,
        totalamt: parseFloat(calculateTotal()) + tax,
        userid: parseInt(userId), // From UserContext
      };

      //console.log('Invoice Data:', invoiceData);

      // Post invoice data to the backend
      await axios.post('http://localhost:8080/invoice', invoiceData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      //////////////////////////

      const earnedEpoints = tax; // Get tax amount without precision

      //post epoint in user table
      //minus epoint in user table and then add epoint in invoice table

      setNotification({ message: 'Checkout successful. Email sent with your order summary.', show: true });
      navigate('/thankyou', {state: earnedEpoints});
    } catch (error) {
      console.error('Error sending email:', error);
      setNotification({ message: 'Error during checkout. Please try again later.', show: true });
    } finally {
      setIsPlacingOrder(false); // Ensure loading screen is hidden
    }
  };

  return (
    <div>
      {isPlacingOrder ? (
        <div>
          <LoadingSpinner isPlacingOrder={isPlacingOrder}/>
          
        </div>

      ) : (
      <>
        <Header />
        {cartItems.length === 0 ? <EmptyCart /> : (
        <Container className="row-shopping-cart">
          <Row>
            <div>
              <h2>Your Cart</h2>
              <p>{cartItems.length} items in your cart</p>
            </div>
            <Col>
              {cartItems.map((item) => (
                <Card key={item.key} className="card-shopping-cart">
                  <Card.Body>
                    <Row>
                      <Col md={3}>
                        <Card.Img className='card-cart-img' src={item.imagepath} alt={item.name} />
                      </Col>
                      <Col>
                        <Card.Title className='card-cart-title'>{item.productname}</Card.Title>   
                        <div className='card-cart-shortdesc'>{"(" + item.shortdesc + ", " + item.selectedStorage + " GB" + ")" }</div>                   
                        <div className='card-cart-price'>
                          <strong>Each: </strong>₹{item.price.toFixed(2)}
                          {item.appliedCredits && loggedIn && userType === 1 ? (
                            <>
                              {' + '}
                              <img className='coin-32px' src={`${process.env.PUBLIC_URL}/assets/images/coin.png`} alt="Coin" />
                              {'100'}
                            </>
                          ) : null}
                        </div>
                        <Form.Group as={Row} controlId={`quantity-${item.key}`} className="quantity-control">
                          <Form.Label column sm="2">Quantity:</Form.Label>
                          <div className='quantity-div'>
                            <button type="button" className="quantity-button" onClick={() => decrementItem(item.key)}>
                              -
                            </button>
                            <Form.Control type="number" value={item.quantity} readOnly className="quantity-input" />
                            <button type="button" className="quantity-button" onClick={() => incrementItem(item.key)} disabled={item.quantity >= item.stock ? true : false}>
                              +
                            </button>
                          </div>
                        </Form.Group>
                        <p>
                          <strong>Total: </strong>₹{(item.price * item.quantity).toFixed(2)}
                          {item.appliedCredits && loggedIn && userType === 1 ? (
                            <>
                              {' + '}
                              <img className='coin-32px' src={`${process.env.PUBLIC_URL}/assets/images/coin.png`} alt="Coin" />
                              {100 * item.quantity}
                              {/* {_totalCredits > userEpoint && (
                                <span className='text-danger'>
                                  {` (Not enough credits by ${_totalCredits - userEpoint} points)`}
                                </span>
                              )} */}
                            </>
                          ) : null}
                        </p>
                        <Button className="custom-delete-button" onClick={() => removeFromCart(item.key)}>
                          <FontAwesomeIcon icon={faTrash} /> Remove
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
              <Button variant="link" onClick={handleContinueShopping} className="continue-shopping">
                Continue Shopping
              </Button>
            </Col>
            <Col md={4}>
              <div className="cart-promotion">
                <h4>Promotions</h4>
                <ListGroup variant="flush" className='cart-summary'>
                  <ListGroup.Item>Free Shipping on Orders Above ₹100</ListGroup.Item>
                  <ListGroup.Item>Subtotal <span className="float-end">₹{calculateTotal()}</span></ListGroup.Item>
                  <ListGroup.Item>Shipping cost <span className="float-end">+₹18.97</span></ListGroup.Item>
                  <ListGroup.Item>Shipping Discount <span className="text-danger float-end">-₹18.97</span></ListGroup.Item>
                  <ListGroup.Item>Estimated Sales Tax <span className="float-end">+₹{(calculateTotal() * .10).toFixed(2)}</span></ListGroup.Item>
                  <ListGroup.Item><strong>Estimated Total</strong> <span className="float-end"><strong>₹{(Number(calculateTotal()) + Number(calculateTotal() * .10)).toFixed(2)}</strong></span></ListGroup.Item>
                </ListGroup>
                <Button className="w-100 mt-3 checkout-button" onClick={() => handleCheckout()}>
                  CHECKOUT
                </Button>
              </div>
            </Col>
          </Row>
          <div>
            <Invoice display={isPlacingOrder} ref={invoiceRef} cartItems={cartItems} userName={userName || userEmail} />
          </div>
        </Container>)}
      </>)}
      <Notification message={notification.message} show={notification.show} />
    </div>
  );
};

export default ShoppingCart;
