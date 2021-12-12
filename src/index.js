import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage"; 
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import SignInPage from "./pages/signInPage";
import AuthContextProvider from "./contexts/authContext";
import ActorPage from "./pages/actorDetailsPage";
import ErrorBoundary from "./components/errorBoundary"
import { auth } from './firebase-config'
import {

  onAuthStateChanged,
} from 'firebase/auth'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  onAuthStateChanged(auth, user => {
    setIsLoggedIn(!!user);
  });

  return (
    <ErrorBoundary>
    <AuthContextProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <MoviesContextProvider>
            {" "}
           {isLoggedIn && <SiteHeader />}
          <Switch>
          <Route exact path="/reviews/form" component={AddMovieReviewPage} />
          {/* <Route exact path="/movies/upcoming" component={UpcomingMoviesPage} /> */}
         <Route path="/reviews/:id" component={MovieReviewPage} />
        <Route exact path="/movies/favorites" component={FavoriteMoviesPage} />
        <Route path="/movies/:id" component={MoviePage} />
        <Route path="/actors/:id" component={ActorPage} />
        <Route exact path="/" component={SignInPage} />
        <Route exact path="/home" component={HomePage} />
        <Redirect from="*" to="/" />
      </Switch>
      </MoviesContextProvider>
    </BrowserRouter>
  <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  </AuthContextProvider>
  </ErrorBoundary>
  );
};


ReactDOM.render(<App />, document.getElementById("root"));