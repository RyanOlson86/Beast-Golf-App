import React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const itemData = [
  {
    img: 'public/images/85881.jpeg',
  },
  {
    img: 'public/images/85890.jpeg',
  },
  {
    img: 'public/images/IMG2695470169962949233.jpg',
  },
  {
    img: 'public/images/IMG3919461174459939477.jpg',
  },
  {
    img: 'public/images/IMG4965962158585198094.jpg',
  },
  {
    img: 'public/images/IMG6214092160705674943.jpg',
  },
  {
    img: 'public/images/IMG6378001833424750353.jpg',
  },
  {
    img: 'public/images/IMG6646450930226478196.jpg',
  },
  {
    img: 'public/images/IMG7476165360816855868.jpg',
  },
  {
    img: 'public/images/IMG8163692225176458759.jpg',
  },
];

function MyImageList() {
  return (
    <Box sx={{ width: '80%', height: 600, overflowY: 'scroll' }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

export default MyImageList