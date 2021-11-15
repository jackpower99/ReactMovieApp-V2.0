import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import IconButton from "@material-ui/core/IconButton";

const AddToPlaylistIcon = () => {


    return  (
        <IconButton aria-label="add to playlist">
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
    )
};

export default AddToPlaylistIcon;