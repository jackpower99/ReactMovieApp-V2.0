import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const ActorDetails = ({ actor }) => {  // Don't miss this!
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