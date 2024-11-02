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
    height: '600px',
    overflow: 'hidden',
    border: '2px solid lightgray', // Light gray border
    borderRadius: '10px', // Rounded corners
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', // Soft shadow
    margin: '0 auto', // Centering the carousel
  };

  const captionStyle = {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)', 
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker overlay for better contrast
    padding: '15px',
    borderRadius: '8px',
    textAlign: 'center',
    width: '80%', // Wider width
    maxWidth: '600px', // Limit the maximum width
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)', // Shadow for caption
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {banners.map((banner) => (
        <Carousel.Item key={banner._id} style={carouselItemStyle}>
          <img
            className="d-block w-100"
            src={banner.image}
            alt={banner.title}
            style={{ height: '600px', objectFit: 'cover', borderRadius: '10px' }} // Rounded corners for image
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
