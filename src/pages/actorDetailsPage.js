import React, {useState} from "react";
import { withRouter } from "react-router-dom";
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import ActorDetails from "../components/actorDetails";
import { getActor, getActorDetailsIMDB, getActorExternalId } from "../api/tmdb-api";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    padding: "50px",
    margin: "20px"
  },
});

const ActorDetailsPage = (props) => {
  const { id } = props.match.params
  const [externalId, setExternalId] = useState("0")
  const [externalKnownFor, setExternalKnownFor] = useState([])

const classes= useStyles();

  const { data: actor, error, isLoading, isError } = useQuery(
    ["actor", { id: id }],
    getActor,{
      enabled: !!id,
    }
  );

  useQuery(
    ["actorExternalId", { id: id }],
    getActorExternalId,{
    onSuccess: (data)=>{
      console.log("getActorExternalId",data);
      setExternalId(data.imdb_id);
      console.log("getActorExternalId",data.imdb_id);

    },
    enabled: !!actor,
  });

  useQuery(
    ["externalDetails", { id: externalId }],
    getActorDetailsIMDB,{
    onSuccess: (data)=>{
      console.log("getActorDetailsIMDB",data);
      setExternalKnownFor(data.person_results[0].known_for);
      console.log("getActorDetailsIMDB",externalKnownFor);
    },
    enabled: externalId!=="0",
  });

  console.log("actorDetails",externalKnownFor);


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
             knownFor={externalKnownFor} />
        </>
      ) : (
        <p>Waiting for actor details</p>
      )}
  
      </Grid>
    </>
  );
};

export default withRouter(ActorDetailsPage);