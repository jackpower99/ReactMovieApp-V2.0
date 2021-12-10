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

const MovieDetailsPage = (props) => {
  const { id } = props.match.params

  const[cast,setCast] = useState([]);

  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id: id }],
    getMovie
  );

  const movieId = movie?.id

  const {  err, isLoad, isErr } = useQuery(["cast", movieId ],getCast,{
    onSuccess: (data)=>{
      setCast(data.cast);
    },
    enabled: !!movieId,
  });


  console.log(cast);
  console.log(movieId);

  if (isLoading) {
    return <Spinner />;
  }

  if (isLoad) {
    return <Spinner />;
  }
  //button to view cast 

  if (isError||isErr) {
    return <h1>{error.message||err.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
            {/* <CastList cast ={cast}/> */}
            {/* <ul>{cast?.map(actor => 
            <li key={actor.id}>{actor.name}</li>)}
            </ul> */}
            <List>
              {cast?.map(actor=> (
                <ListItem key={actor.id}>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar ${actor.name}`}
                      src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                      />
                    </ListItemAvatar>
                  <ListItemText primary={actor.name}/>
                  <ListItemText secondary={actor.character}/>
                </ListItem>
              ))}
            </List>
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default withRouter(MovieDetailsPage);