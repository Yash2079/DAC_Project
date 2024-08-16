import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './subcategories.css'; 

const SubCategories = ({ categoryId, categoryName}) => { // Ensure correct prop names
  const [subCategories, setSubCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/subcategory/category/${categoryId}`);
        setSubCategories(response.data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        setError(error);
      }
    };

    if (categoryId) {
      fetchSubCategories();
    }
  }, [categoryId]);

  const handleSelectSubCategory = (subcategoryid) => {
    navigate(`/products/${subcategoryid}`,); // Navigate to ProductAllPage
  };

  return (
    <div className="subcategories">
      {error ? (
        <Alert variant="danger">Error fetching subcategories: {error.message}</Alert>
      ) : subCategories.length > 0 ? (
        <>          
          {subCategories.map((subcategory) => (
            
            <Card className='card-subcategory' 
            key={subcategory.subcategoryid} 
            border="secondary"
            onClick={() => handleSelectSubCategory(subcategory.subcategoryid)}
            >
               <Card.Img
              variant="top"
              src={`${process.env.PUBLIC_URL}${subcategory.imagepath}`} // Construct the full URL correctly
              alt={subcategory.subcategoryname}
              
            />
              <Card.Body>
                <Card.Title className="card-text">{subcategory.subcategoryname}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </>
      ) : (
        <Alert variant="warning">No subcategories available for this category.</Alert>
      )}
    </div>
  );
};

export default SubCategories;
