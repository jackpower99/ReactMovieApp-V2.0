import React, {useState} from "react";
import { withRouter } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getCast } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import CastList from "../components/castList";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { Link } from "react-router-dom";
import ActorDetails from "../components/actorDetails";
import { getActor } from "../api/tmdb-api";

const ActorDetailsPage = (props) => {
  const { id } = props.match.params

  const { data: actor, error, isLoading, isError } = useQuery(
    ["actor", { id: id }],
    getActor
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {actor ? (
        <>
            <ActorDetails actor={actor} />
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default withRouter(ActorDetailsPage);