import React, {useState} from "react";
import { withRouter } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getCast } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();

const MovieDetailsPage = (props) => {
  const { id } = props.match.params
  const [token, setToken] = React.useState("")

  function getToken(){
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then(tok => {
        setToken(tok)
      });
     }
      else {
       return null;
      }
    });
  }

  getToken();

  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id: id }, token],
    getMovie
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
            <List>
              {movie.cast.map(actor=> (
                
                <ListItem key={actor.id}>
                   <Link to={`/actors/${actor.id}`}>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar ${actor.name}`}
                      src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                      />
                    </ListItemAvatar>
                    </Link>
                   
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