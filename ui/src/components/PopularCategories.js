import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PopularCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://lbc-computer-institute-api.vercel.app/api/courses');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const styles = {
    mainWrapper: {
      border: '1px solid #ccc',  // Border color
      borderRadius: '8px',        // Rounded corners
      padding: '16px',            // Padding inside the card
      textAlign: 'center',        // Center text alignment
      transition: 'box-shadow 0.3s ease', // Transition for hover effect
    },
    mainWrapperHover: {
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Shadow effect on hover
    },
    image: {
      width: '100%',               // Full width of the card
      height: '200px',             // Fixed height
      objectFit: 'cover',          // Cover the area without distortion
      borderRadius: '8px',         // Rounded corners for image
      transition: 'transform 0.3s ease', // Transition for hover effect
    },
    imageHover: {
      transform: 'scale(1.05)',    // Slightly zoom on hover
    },
  };

  return (
    <div className="container my-5">
      <div className="row mb-4">
        <div className="col text-center">
          <h2>POPULAR COURSES</h2>
        </div>
      </div>
      <div className="row">
        {categories.map((category, index) => (
          <div className="col-lg-4 col-md-4 col-sm-6 col-12 mb-4" key={category._id}>
            <div 
              style={styles.mainWrapper} 
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = styles.mainWrapperHover.boxShadow;
                e.currentTarget.querySelector('img').style.transform = styles.imageHover.transform;
              }} 
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.querySelector('img').style.transform = 'scale(1)';
              }}
            >
              <img 
                src={category.banner_url} 
                alt={category.course_name} 
                style={styles.image} 
              />
              <div className="sentence">
                <h3>{category.course_name.toUpperCase()}</h3>
                <p>{category.description.length > 15 ? `${category.description.slice(0, 15)}...` : category.description}</p> {/* Limit to 15 characters */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
