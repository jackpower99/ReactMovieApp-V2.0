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
import { auth } from './firebase-config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
  confirmPasswordReset,
} from 'firebase/auth'

import {useAuth} from "./contexts/authContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

// const DefaultRoutes=()=>(
//   <div>
//     <SiteHeader />     {/* New Header  */}
//           <Route exact path="/reviews/form" component={AddMovieReviewPage} />
//           <Route exact path="/movies/upcoming" component={UpcomingMoviesPage} />
//          <Route path="/reviews/:id" component={MovieReviewPage} />
//         <Route exact path="/movies/favorites" component={FavoriteMoviesPage} />
//         <Route path="/movies/:id" component={MoviePage} />
//         <Route exact path="/" component={HomePage} />
//         <Route exact path="/logout" component={HomePage} />
//         <Redirect from="*" to="/" />
//   </div>
// )

const App = () => {
  // const {currentUser} = useAuth();
  // console.log(currentUser);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  onAuthStateChanged(auth, user => {
    setIsLoggedIn(!!user);
  });

  console.log(isLoggedIn);

  // console.log(window.location.pathname)

  // const currentPage = window.location.pathname;

  return (
    <AuthContextProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <MoviesContextProvider>
            {" "}
           {isLoggedIn && <SiteHeader />}
          <Switch>
          <Route exact path="/reviews/form" component={AddMovieReviewPage} />
          <Route exact path="/movies/upcoming" component={UpcomingMoviesPage} />
         <Route path="/reviews/:id" component={MovieReviewPage} />
        <Route exact path="/movies/favorites" component={FavoriteMoviesPage} />
        <Route path="/movies/:id" component={MoviePage} />
        <Route path="/actors/:id" component={ActorPage} />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/logout" component={HomePage} />
        <Route exact path="/login" component={SignInPage} />
        <Redirect from="*" to="/" />
      </Switch>
      </MoviesContextProvider>
    </BrowserRouter>
  <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  </AuthContextProvider>
  );
};


ReactDOM.render(<App />, document.getElementById("root"));