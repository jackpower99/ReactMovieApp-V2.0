import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getMovies} from '../api/tmdb-api'
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import {useAuth} from "../contexts/authContext";
import Typography from "@material-ui/core/Typography";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();


const HomePage = (props) => {

  const [page, setPage] = React.useState(1)
  const [token, setToken] = React.useState("")
  const {currentUser} = useAuth()

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

  const {  data, error, isLoading, isError,  isFetching }  = useQuery(['discover',page, token], getMovies,
  {
    keepPreviousData: true,
  });

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;


  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  

  return (
    <div>
     {currentUser && <Typography variant="h5">
            Welcome {JSON.stringify(currentUser.email,null,2).toString().slice(1,-1)}
    </Typography>}

    <PageTemplate
        title="Discover Movies"
        movies={movies}
        page={page}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />
        }}
      />
      <span>Current Page: {page} of {data.total_pages}</span>
      <button id="previous-button"
         onClick={() => setPage(old => Math.max(old - 1, 0))}
         disabled={page === 0}
       >
         Previous Page
       </button>{' '}
       <button id="next-button"
         onClick={() => {
            if ( data.total_pages>page) {
             setPage(old => old + 1)
           }
         }}
       >
         Next Page
       </button>
       {isFetching ? <span> Loading...</span> : null}{' '}
      </div>
  );
};

export default HomePage;