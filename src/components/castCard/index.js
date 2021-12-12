import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import img from '../../images/film-poster-placeholder.png';

const useStyles = makeStyles({
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
});

export default function CastCard({ actor }) {
  const classes = useStyles();

  console.log(actor);

  return (
    <Card className={classes.card}>
         <CardHeader
      className={classes.header}
      title={
        <Typography variant="h5" component="p">
          {actor.name}{" "}
        </Typography>
      }
    /> 
      <CardHeader
      className={classes.header}
      title={
        <Typography variant="h5" component="p">
          {actor.character}{" "}
        </Typography>
      }
    />
    <CardMedia
        className={classes.media}
        image={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
            : img
        }
      />
    </Card>
  );
}