import PageTemplate from '../components/templateMovieListPage'
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import React from "react";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getMovies} from '../api/tmdb-api'

const UpcomingMoviesPage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('discover', getMovies)
  //const [movies, setMovies] = useState([]);
  // const favorites = movies.filter(m => m.favorite)
  // localStorage.setItem('favorites', JSON.stringify(favorites))

  // const addToFavorites = (movieId) => {
  //   const updatedMovies = movies.map((m) =>
  //     m.id === movieId ? { ...m, favorite: true } : m
  //   );
  //   setMovies(updatedMovies);
  // };

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  // useEffect(() => {
  //   getUpcomingMovies().then(movies => {
  //     setMovies(movies);
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie}/>
      }}
    />
  );
};
export default UpcomingMoviesPage;