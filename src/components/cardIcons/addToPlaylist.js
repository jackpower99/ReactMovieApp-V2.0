import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import IconButton from "@material-ui/core/IconButton";
import { MoviesContext } from "../../contexts/moviesContext";
import React, { useContext } from "react";

const AddToPlaylistIcon = ({movie}) => {

  const context = useContext(MoviesContext);

  const handleAddToMustWatches = (e) => {
    e.preventDefault();
    context.addToMustWatches(movie);
  };
    return  (
        <IconButton aria-label="add to playlist">
      <PlaylistAddIcon color="primary" fontSize="large" onClick={handleAddToMustWatches} />
    </IconButton>
    )
};

export default AddToPlaylistIcon;