import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

import Diploma1 from '../../../assets/img/diplomes/diplome 1.png';
import Diploma2 from '../../../assets/img/diplomes/diplome 10.png';
import Diploma3 from '../../../assets/img/diplomes/diplome 20.png';
import Diploma4 from '../../../assets/img/diplomes/diplome 30.png';
import Diploma5 from '../../../assets/img/diplomes/diplome 40.png';

const images = [
  {
    img: Diploma1,
    title: 'Diploma number 1',
  },
  {
    img: Diploma2,
    title: 'Diploma number 2',
  },
  {
    img: Diploma3,
    title: 'Diploma number 3',
  },
  {
    img: Diploma4,
    title: 'Diploma number 4',
  },
  {
    img: Diploma5,
    title: 'Diploma number 5',
  },
];

export default function DiplomaList() {
  return (
    <ImageList
      sx={{
        gridAutoFlow: "column",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr)) !important",
        gridAutoColumns: "minmax(300px, 1fr)"
      }}
    >
      {images.map((image) => (
        <ImageListItem>
          <img src={image.img} alt={image.title} />
          <ImageListItemBar title={image.title} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
