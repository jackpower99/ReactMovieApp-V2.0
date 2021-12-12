import React from "react";
import Cast from "../castCard";
import Grid from "@material-ui/core/Grid";

const CastList = ( {cast}) => {
    console.log(cast)
  let castCards = cast.map((c) => (
    <Grid key={c.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Cast key={c.id} cast={c} />
    </Grid>
  ));
  return castCards;
};

export default CastList;