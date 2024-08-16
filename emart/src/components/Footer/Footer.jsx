import React from 'react';
import './footer.css';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="contact-info">
          <h1>{t('footer.getInTouch')}</h1>
          <p>
            {t('footer.description')}
          </p>
          <div>
            <Button variant="outline-secondary" className="social-login-buttons"><i className="bi-facebook"></i></Button>
            <Button variant="outline-secondary" className="social-login-buttons"><i className="bi bi-google"></i></Button>
            <Button variant="outline-secondary" className='social-login-buttons'><i className="bi bi-linkedin"></i></Button>
          </div>
        </div>
        <div className="contact-links">
          <a href='#' className="home">
            <div className="contact-card">
              <p>{t('footer.home')}</p>
            </div>
          </a>
          <div className="contact-card">
            <p>{t('footer.contactUs')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
