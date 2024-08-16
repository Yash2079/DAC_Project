import React from 'react';
import './contactus.css';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ContactUs = () => {
  const { t } = useTranslation();

  return (
    <div className="form-container">
      <Col className="illustration-container">
        <img src={`${process.env.PUBLIC_URL}/assets/images/contactus.png`} alt={t('contactUs.illustrationAlt')} />
      </Col>
      <Col className="contact-form-container">
        <h2>{t('contactUs.heading')}</h2>
        <form className="contact-form">
          <div className="form-group">
            <label className="fullNameLabel" htmlFor="fullName">{t('contactUs.fullNameLabel')}</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder={t('contactUs.fullNamePlaceholder')}
              required
            />
          </div>
          <div className="form-group">
            <label className='emailLabel' htmlFor="email">{t('contactUs.emailLabel')}</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder={t('contactUs.emailPlaceholder')}
              required
            />
          </div>
          <div className="form-group">
            <label className='messageLabel' htmlFor="message">{t('contactUs.messageLabel')}</label>
            <textarea
              id="message"
              name="message"
              placeholder={t('contactUs.messagePlaceholder')}
              rows="4"
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">{t('contactUs.submitButton')}</button>
        </form>
      </Col>
    </div>
  );
};

export default ContactUs;
