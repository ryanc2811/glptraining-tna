import * as React from 'react';
import { Carousel } from '@mui/material';

const MyCarousel = ({ items }) => {
  return (
    <Carousel>
      {items.map((item, index) => (
        <Item key={index} item={item} />
      ))}
    </Carousel>
  );
};

const Item = ({ item }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 300, // adjust height as needed
        backgroundColor: '#ccc' // example styling
      }}
    >
      <Typography variant="h5">{item.name}</Typography>
    </Box>
  );
};

export default MyCarousel;
