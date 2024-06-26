import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const images = [
  './images/1233.jpg',
  './images/1648008743709.jpg',
  './images/stock-photo-stack-of-pebbles.jpg',
  './images/stock-photo-stones-and-apple.jpg'
];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 3000); // Change image every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <Box display="flex" alignItems="center" justifyContent="center" position="relative" width="auto" height="400px">
      <IconButton
        onClick={handlePrev}
        sx={{ position: 'absolute', left: 0, zIndex: 1 }}
      >
        <ArrowBack />
      </IconButton>
      <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} style={{ width: 'auto', height: '100%', objectFit: 'cover' }} />
      <IconButton
        onClick={handleNext}
        sx={{ position: 'absolute', right: 0, zIndex: 1 }}
      >
        <ArrowForward />
      </IconButton>
    </Box>
  );
};

export default Slideshow;
