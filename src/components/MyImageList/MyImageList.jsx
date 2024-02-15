import React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const itemData = [
  {
    img: "public/images/IMG7476165360816855868.jpg",
  },
  {
    img: "public/images/Screenshot 2024-02-15 at 10.57.47 AM.png",
  },
  {
    img: "public/images/IMG3919461174459939477.jpg",
  },
  {
    img: "public/images/Screenshot 2024-02-15 at 10.58.22 AM.png",
  },
  {
    img: "public/images/IMG8163692225176458759.jpg",
  },
  {
    img: "public/images/IMG6378001833424750353.jpg",
  },
  {
    img: "public/images/85890.jpeg",
  },
  {
    img: "public/images/IMG6214092160705674943.jpg",
  },
  {
    img: "public/images/Screenshot 2024-02-15 at 10.58.40 AM.png",
  },
  {
    img: "public/images/85881.jpeg",
  },
];

function MyImageList() {
  return (
    <Box sx={{ width: "80%", height: 600, overflowY: "scroll" }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img src={`${item.img}?w=248&fit=crop&auto=format`} alt={item.title} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

export default MyImageList;
