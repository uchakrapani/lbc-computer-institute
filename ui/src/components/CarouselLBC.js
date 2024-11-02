import { useState, useEffect } from 'react'; 
import Carousel from 'react-bootstrap/Carousel';

function CarouselLBC() {
  const [banners, setBanners] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch('https://lbc-computer-institute-api.vercel.app/api/banners');
        const data = await response.json();
        setBanners(data);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchBanners();
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const carouselItemStyle = {
    position: 'relative',
    height: '600px', // Set a fixed height for the carousel items
    overflow: 'hidden',
  };

  const captionStyle = {
    position: 'absolute',
    top: '80%', // Center vertically
    left: '50%', // Center horizontally
    transform: 'translate(-50%, -50%)', // Adjust for the size of the caption
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    padding: '10px',
    borderRadius: '5px',
    textAlign: 'center', // Center text
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {banners.map((banner) => (
        <Carousel.Item key={banner._id} style={carouselItemStyle}>
          <img
            className="d-block w-100"
            src={banner.image}
            alt={banner.title}
            style={{ height: '600px', objectFit: 'cover' }} // Ensure image covers the area
          />
          <Carousel.Caption style={captionStyle}>
            <h3>{banner.title}</h3>
            <p>{banner.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselLBC;
