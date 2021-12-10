import React, { useState} from "react";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import MonetizationIcon from "@material-ui/icons/MonetizationOn";
import StarRate from "@material-ui/icons/StarRate";
import NavigationIcon from "@material-ui/icons/Navigation";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import MovieReviews from "../movieReviews"
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(1.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const ActorDetails = ({ actor }) => {  // Don't miss this!
  //const classes = useStyles();
  return (
    <>
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'column' },
        alignItems: 'center',
        bgcolor: 'background.paper',
        overflow: 'hidden',
        borderRadius: '12px',
        boxShadow: 3,
        fontWeight: 'bold',
      }}
    >
      <Box
        component="img"
        sx={{
          height: 400,
          width: 400,
          maxHeight: { xs: 300, md: 400 },
          maxWidth: { xs: 300, md: 400 },
        }}
        alt={actor.name}
        src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
      />
      <Divider>Name</Divider>
      <Typography variant="h5" component="h3">
        {actor.name}
      </Typography>
      <Divider>Place of Birth</Divider>
      <Typography variant="h6" component="h6">
        {actor.place_of_birth}
      </Typography>
      <Divider>Who is {actor.name}</Divider>
      <Typography variant="h6" component="p">
        {actor.biography}
      </Typography>
      <Divider>Birthday</Divider>
      <Typography variant="h6" component="h6">
        {actor.birthday}
      </Typography>
      </Box>
      </>
  );
};
export default  ActorDetails ;