import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './signpage.css';

function SignUpPage() {
  const [formData, setFormData] = useState({
    username: '',
    useremail: '',
    password: '',
    reEnterPassword: '',
    usertype: false
  });

  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showReEnterPassword, setShowReEnterPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { productpageid, productpageall } = location.state || {};

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, reEnterPassword } = formData;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

    if (!passwordPattern.test(password)) {
      setPasswordError('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    } else if (password !== reEnterPassword) {
      setPasswordError('Passwords do not match');
      return;
    } else {
      setPasswordError('');
    }

    try {
      const response = await axios.post('http://localhost:8080/users/signup', {
        username: formData.username,
        useremail: formData.useremail,
        password: formData.password,
        usertype: formData.usertype ? 1 : 0,
        epoint: formData.usertype ? 500 : 0
      });

      if (response.status === 200) {
        setPasswordError('');
        if(productpageid){
          navigate('/signin', { replace: true }, {state: productpageid} );
        } 
        else if(productpageall){
          navigate('/sigin', { replace: true }, {state: productpageall} );
        }
        else // Redirect to the home page
        {
          navigate('/signin', { replace: true});
        }
        //navigate('/', { replace: true });
      } else {
        setPasswordError('SignUp Failed');
      }

    } catch (error) {
      if (error.response && error.response.status === 409) {
          setPasswordError('User already exists');
      } else {
          setPasswordError('Error occurred during signup. Please try again.');
      }
  }
  };

  return (
    <Container fluid className='container-fluid'>
      <Row className='row-sign'>
        <Col className='col-green'>
          <h2>Welcome Back!</h2>
          <p>To keep connected with us please login with your personal info</p>
          <Button className='btn-signin' onClick={() => navigate('/signin', { replace: true })}>Sign In</Button>
        </Col>
        <Col className='col-white'>
          <h2>Create Account</h2>
          <div>
            <Button variant="outline-secondary" className="social-login-buttons"><i className="bi-facebook"></i></Button>
            <Button variant="outline-secondary" className="social-login-buttons"><i className="bi bi-google"></i></Button>
            <Button variant="outline-secondary" className='social-login-buttons'><i className="bi bi-linkedin"></i></Button>
          </div>
          <p>or use your email for registration:</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Control
                type="text"
                placeholder="Name"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                name="useremail"
                value={formData.useremail}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formReEnterPassword">
              <InputGroup>
                <Form.Control
                  type={showReEnterPassword ? "text" : "password"}
                  placeholder="Re-enter password"
                  name="reEnterPassword"
                  value={formData.reEnterPassword}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text onClick={() => setShowReEnterPassword(!showReEnterPassword)}>
                  {showReEnterPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
              </InputGroup>
              {passwordError && <Form.Text className="text-danger">{passwordError}</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPrimeMember">
              <Form.Check
                type="checkbox"
                label="Prime Member"
                name="usertype"
                checked={formData.usertype}
                onChange={handleChange}
              />
            </Form.Group>
            <Button className='btn-success' type="submit">
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpPage;
