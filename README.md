# Assignment 1 - ReactJS app.

Name: [Jack Power]

## Overview.

Movies App Assignment 1:
From the app created in the labs I've added on a number of features and updates(see list below). These will be improved on again for assignment 2.

Movies App Assignment 2:

### Features.
[ A bullet-point list of the __new features__ you added to the Movies Fan app (and any modifications to existing features) .]
 
+ Firebase Authentication (Email & Password).
+ Added Error boundary.
+ Pagination : added pagination to home page  
+ Added more filter functionality to filter card. 4 different movieDB end-points.
+ Removed upcoming movies page.
+ Added cast to movie details page.
+ Added actor details page.
+ Reusing movieList component in actor details page to display movies actors are know for. These are fetched using external IMDB api and external person ID's.
+ Changed root to be login page instead of home page.

## Setup requirements.



## API endpoints.

[ List the __additional__ TMDB endpoints used, giving the description and pathname for each one.] 

+ getCast - get the cast of movie by movieId.
+ getActor - get actor by personId.
+ getActorExternalId - get actor IMDB id. use movieDB endpoint to get actors IMDB id.
+ getActorDetailsIMDB -  get actors IMDB details. Done this as movieDb dont store movies that actors have starred-in inside actor/person object.
+ getFilteredMovies - call endpoint depending on dropdown selection in movie filter card. now playing, top rated etc. All different end points but structured the same so passed in value of dropdown as parameter. eddited caching time in useQuery for this endpoint call (short term fix).


### Routing.

[ List the __new routes__ supported by your app and state the associated page.]

+ Actor details - actor/:id
+ Login - / 


