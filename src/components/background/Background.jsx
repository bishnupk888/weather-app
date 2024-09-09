import { useState, useEffect } from 'react';
import { PIXABAY_API_KEY } from '../../api';
const DEFAULT_BACKGROUND_IMAGE = '../../../public/backgroundImages/default-image.jpg'

const Background = ({ weatherCondition, timeOfDay, children, setLoading }) => {
  const [backgroundImage, setBackgroundImage] = useState('');

  const fetchBackgroundImage = async () => {
    setLoading(true)
    try {
      const query = (weatherCondition && timeOfDay )? `${weatherCondition} ${timeOfDay}`:'beautiful sky and hills'
      const response = await fetch(
        `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&pretty=true`
      );
      const data = await response.json();

      if (data.hits.length > 0) {
        const randomNumber = Math.floor(Math.random() * data.hits.length);
        setBackgroundImage(data.hits[randomNumber].largeImageURL);
      } else {
        console.warn('No images found for the specified query.');
        setBackgroundImage(DEFAULT_BACKGROUND_IMAGE); 
      }
      setTimeout(() => {
        setLoading(false)
      }, 3000);
    } catch (error) {
      console.error('Error fetching image from Pixabay:', error);
    }
  };

  useEffect(() => {
    fetchBackgroundImage();
  }, [weatherCondition, timeOfDay]);

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    position: 'relative', 
  };

  return (
    <div style={backgroundStyle}>
      <div
        className='overlay'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          zIndex: 1, 
          padding: 40
        }}
      >
        {children} 
      </div>
    </div>
  );
};

export default Background;
