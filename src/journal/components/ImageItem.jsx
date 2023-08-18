import ImageListItem from "@mui/material/ImageListItem";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { deleteImageNote } from "../../store/journal/journalSlice";

export const ImageItem = ({ image }) => {
  const dispatch = useDispatch();

  const onDeleteImage = () => {
    dispatch(deleteImageNote(image.url));
  };

  return (
    <ImageListItem className="ImageListItem">
      <IconButton
        size="small"
        className="IconButtonImage"
        sx={{
          visibility: "hidden",
          color: "white",
          backgroundColor: "blue",
          ":hover": {
            backgroundColor: "blue",
            opacity: 0.9,
          },
          position: "fixed",
          margin: 1,
        }}
        onClick={onDeleteImage}
      >
        <CloseIcon sx={{ fontSize: 30 }} />
      </IconButton>
      <img src={image.url} alt={"Imagen de la nota"} loading="lazy" />
    </ImageListItem>
  );
};
