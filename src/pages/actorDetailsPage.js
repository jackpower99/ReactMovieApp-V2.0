import React, {useState} from "react";
import { withRouter } from "react-router-dom";
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import ActorDetails from "../components/actorDetails";
import { getActor, getActorDetailsIMDB, getActorExternalId, getActorKnownFor, getActorKnownForMovies } from "../api/tmdb-api";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();

const useStyles = makeStyles({
  root: {
    padding: "50px",
    margin: "20px"
  },
});

const ActorDetailsPage = (props) => {
  const { id } = props.match.params
  const [knownForMovieIds, setKnownForMovieIds] = useState([])
  const [knownForMovies, setKnownForMovies] = useState([])
  const [idsLoaded, setIdsLoaded] = useState(false)
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
  

const classes= useStyles();

  const { data: actor, error, isLoading, isError } = useQuery(
    ["actor", { id: id }, token],
    getActor,{
      enabled: !!id,
    }
  );

  useQuery(
    ["actorsKnownFor", { id: id }, token],
    getActorKnownFor,{
    onSuccess: (data)=>{
      console.log(data.known_for)
      IdStateExtraction(data.known_for);
    },
    enabled: !!actor,
  });

  useQuery(
    ["actorMovies", knownForMovieIds, token],
    getActorKnownForMovies,{
    onSuccess: (data)=>{
      setKnownForMovies(data);
    },
    enabled: !!idsLoaded,
  });

  function IdStateExtraction(arr){
    var newState =[];
    arr.forEach( m => newState.push(m.movie_id))
  
    setKnownForMovieIds(newState);
    setIdsLoaded(true);
    console.log(newState);
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
    <Grid container className={classes.root}>
      {actor ? (
        <>
            <ActorDetails actor={actor}
            action={(movie) => {
              return <AddToFavoritesIcon movie={movie} />
            }}
             knownFor={knownForMovies}
               //externalKnownFor
                />
        </>
      ) : (
        <p>Waiting for actor details</p>
      )}
  
      </Grid>
    </>
  );
};

export default withRouter(ActorDetailsPage);