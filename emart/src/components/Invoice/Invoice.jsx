import React, { forwardRef, useContext } from "react";
import { Row, Col, Table, Card } from "react-bootstrap";
import { UserContext } from '../../context/UserContext';
import "./invoice.css";

// Forward the ref to the root element of the Invoice component
const Invoice = forwardRef(({ cartItems, userName }, ref) => {

  const { userId, userEmail} = useContext(UserContext);

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
      
      // Example usage
      const currentDate = new Date();
  const calculateSubTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const calculateTax = () => {
    const subtotal = parseFloat(calculateSubTotal());
    const taxRate = 0.10; // Assuming a 10% tax rate
    return (subtotal * taxRate).toFixed(2);
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubTotal());
    const tax = parseFloat(calculateTax());
    return (subtotal + tax).toFixed(2);
  };

  return (
    <div ref={ref}>
      <Card className="card-invoice">
        <Card.Body>
          <Row className="justify-content-between">
            <Col>
              <h5 className="invoice-h5">Invoice No.</h5>
              <p className="invoice-p">{formatInvoiceId(invoiceId)}</p>
            </Col>
            <Col className="text-end">
              <h1 className="invoice-title">Invoice</h1>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <h5 className="invoice-h5">Billed To</h5>
              <p className="invoice-p">{userName}</p>
            </Col>
            <Col className="text-end">
              <h5 className="invoice-h5">Due Date</h5>
              <p className="invoice-p">{formatCustomDate(currentDate)}</p>
            </Col>
          </Row>
          <Table bordered className="mt-4 invoice-table">
            <thead>
              <tr>
                <th>QTY</th>
                <th>DESCRIPTION</th>
                <th>RATE</th>
                <th>AMOUNT</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {cartItems.map((item) => (
                <tr key={item.key}>
                  <td>{item.quantity}</td>
                  <td className="table-body-right">{item.productname} ({item.shortdesc})</td>
                  <td>₹{item.price.toFixed(2)}</td>
                  <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Row className="justify-content-end">
            <Col xs="auto">
              <p className="invoice-p">Sub-total:</p>
              <p className="invoice-p">Tax (10%):</p>
              <h5 className="invoice-h5">Total:</h5>
            </Col>
            <Col xs="auto">
              <p className="invoice-p">₹{calculateSubTotal()}</p>
              <p className="invoice-p">₹{calculateTax()}</p>
              <h5 className="invoice-h5">₹{calculateTotal()}</h5>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <h1>Thank you for trusting us.</h1>
            </Col>
            <Col className="text-end">
              <p>Contact</p>
              <p>emartgrp05@gmail.com</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
});

export default Invoice;
