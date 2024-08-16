import React from 'react';
import './aboutus.css';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <div className="about-container">
      <div className="about-left">
        <h1 className='about-left-h1'>{t('aboutUs.title')}</h1>
        <h3 className='about-left-h3'>{t('aboutUs.tagline')}</h3>
      </div>
      <div className="about-right">
        <p>
          {t('aboutUs.description')}
        </p>
        <button className="read-more-button">{t('aboutUs.readMore')}</button>
      </div>
    </div>
  );
};

export default AboutUs;
