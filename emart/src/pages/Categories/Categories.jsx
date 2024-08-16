import React, { useState, useEffect } from 'react';
import { Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './categories.css';
import { useTranslation } from 'react-i18next';

const Categories = ({ onSelectCategory }) => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/category');
        console.log('Categories fetched:', response.data); // Debug log

        if (Array.isArray(response.data) && response.data.length > 0) {
          setCategories(response.data);
        } else {
          console.warn('No categories found in response:', response.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="categories">
      <h4>{t('categories.shopByCategory')}</h4>
      {Array.isArray(categories) && categories.length > 0 ? (
        categories.map((category) => (
          <Card className='card-category'
            key={category.categoryId} // Ensure it matches your data structure
            border="primary"
            onClick={() => onSelectCategory(category.categoryId, category.categoryName)} // Pass both ID and name
          >
            <Card.Img
              variant="top"
              src={`${process.env.PUBLIC_URL}${category.imagepath}`} // Construct the full URL correctly
              alt={t(`categories.${category.categoryName}`)}
            />
            <Card.Title className="card-text">{t(`categories.${category.categoryName}`)}</Card.Title>
          </Card>
        ))
      ) : (
        <Alert variant="warning">{t('categories.noCategoriesAvailable')}</Alert>
      )}
    </div>
  );
};

export default Categories;
