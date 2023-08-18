import ImageList from "@mui/material/ImageList";
import { ImageItem } from "./ImageItem";

export const ImageGalery = ({ images }) => {
  return (
    <ImageList sx={{ width: "100%", height: 500 }} cols={4} rowHeight={200}>
      {images.map((image) => (
        <ImageItem key={image.url} image={image} />
      ))}
    </ImageList>
  );
};
