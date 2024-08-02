import * as React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import logoImage from "../../images/RGB-Logo-digital use.png";
import imagePath1 from '../../images/scenario-question-img.jpg'; // Adjust the path accordingly
import imagePath2 from '../../images/woman-working-laptop-side-view.jpg'; // Adjust the path accordingly

import imagePath3 from '../../images/man_in_coffee_shop.jpg'; // Adjust the path accordingly




const MyCarousel = () => {
  const carouselItems = [
    { image: imagePath1, text: "Find Your Path" },
    { image: imagePath2, text: "Build Your Future" },
    { image: imagePath3, text: "Craft Your Career" }
  ];


  return (
    <Grid item xs={12} sm={12} md={5} lg={5} sx={{ position: 'relative', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false
          }}
          pagination={{
            clickable: true
          }}
          speed={4000}
          loop={true}
          className="mySwiper"
          
          style={{ width: '100%', height: '100%' }}
        >
          {carouselItems.map((item, index) => (
            <SwiperSlide key={index}>
              <Box sx={{ position: 'relative', height: '100%', borderRadius: { md: '8px' }, overflow: 'hidden' }}>
                <Box
                  sx={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%',
                    height: { xs: '40vh', sm: '55vh', md: '100%' },
                    borderRadius: { md: '8px' },
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    textAlign: 'left',
                    color: 'white',
                    zIndex: 1,
                    p: 2,
                    background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,1) 100%)',
                    borderRadius: { md: '8px' },
                  }}
                >
                  <Typography variant="h5">{item.text}</Typography>
                  <Box sx={{ display: 'flex' }}>
                    <Typography variant="h6" sx={{color:'#FFFFFF'}}>With</Typography>
                    <Box component="img"
                         src={logoImage}
                         alt="GLP Training Logo"
                         sx={{ height: 'auto', maxWidth: '100%', width: { xs: '120px', sm: '150px' },  pb:2, pl: '6px' }}
                    />
                  </Box>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid>
  );
};

export default MyCarousel;
