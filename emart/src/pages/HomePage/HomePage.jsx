import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import './homepage.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Categories from '../Categories/Categories';
import SubCategories from '../Categories/SubCategories/SubCategories';
import AboutUs from '../../components/AboutUs/AboutUs';
import ContactUs from '../../components/ContactUs/ContactUs';

const carouselItems = [
  {
    brand: '/assets/images/brandlogo/apple-logo.png',
    product: 'iphone15',
    offer: 'upto10offvoucher',
    link: '/product/1',
    imageSrc: '/assets/images/banner/iphone15-banner.png',
    altText: 'iPhone 15'
  },
  {
    brand: '/assets/images/brandlogo/lg-logo.png',
    product: 'lguhd',
    offer: 'upto15offvoucher',
    link: '/product/0',
    imageSrc: '/assets/images/banner/tv-banner.png',
    altText: 'LG UHD'
  },
];

const HomePage = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  return (
    <div>
      <Header />
      <main className="main">
        <Col xs={12}>
          <Carousel controls={false} indicators={true} interval={2000} fade={false}>
            {carouselItems.map((item, index) => (
              <Carousel.Item key={index}>
                <div className="banner">
                  <div className="banner-content">
                    <img src={`${process.env.PUBLIC_URL}${item.brand}`} alt={t(`homepage.carousel.${item.product}.brandAlt`)} className="brand-logo" />
                    <h1 className="product">{t(`homepage.carousel.${item.product}.product`)}</h1>
                    <h2 className="offer">{t(`homepage.carousel.${item.product}.offer`)}</h2>
                    <Link
                      to={item.link}
                      className="shop-now"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t('homepage.shopNow')}
                    </Link>
                  </div>
                  <div className="banner-image">
                    <img
                      className='banner-img'
                      src={`${process.env.PUBLIC_URL}${item.imageSrc}`}
                      alt={item.altText}
                    />
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </main>
      <div className='categories'>
        {!selectedCategory ? (
          <Categories onSelectCategory={handleCategorySelect} />
        ) : (
          <div>
            <button className="back-to-categories" onClick={handleBackToCategories}>
              <FontAwesomeIcon className="arrow" icon={faAngleLeft} />
              {t('homepage.backToCategories')}
            </button>
            <SubCategories categoryId={selectedCategory} />
          </div>
        )}
      </div>
      <AboutUs />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default HomePage;
