import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getMovies} from '../api/tmdb-api'
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import {useAuth} from "../contexts/authContext";
import Typography from "@material-ui/core/Typography";


const HomePage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('discover', getMovies);
  const {currentUser} = useAuth()

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  //const addToFavorites = (movieId) => true 

  return (
    <div>
     {currentUser && <Typography variant="h6">
            Welcome {JSON.stringify(currentUser.email,null,2)}
    </Typography>}
    <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />
        }}
      />
      </div>
  );
};

export default HomePage;