// export const getMovies = (args) => {
//   const page = args.queryKey[1];
//   return fetch(
//     `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
//   ).then((response) => {
//     if (!response.ok) {
//       throw new Error(response.json().message);
//     }
//     return response.json();
//   })
//   .catch((error) => {
//      throw error
//   });
// };

import { GetApp } from "@material-ui/icons";

export const getMovies = (args) => {
  const pageNum = args.queryKey[1];
  return fetch(
    `/api/movies/?page=${pageNum}`,{
    }
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
     throw error
  });
};

export const getCast = (cast) => {
  const id = cast.queryKey[1];
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
  ).then( (response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};
  
export const getMovie = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `/api/movies/${id}`,{
    }
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

export const getActor = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `/api/actors/${id}`
    //`https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

export const getActorKnownFor = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  console.log(id);
  return fetch(
    `/api/actors/${id}/known_for`
    //`https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    //console.log(response.json())
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

export const getActorKnownForMovies = (args) => {
  const argsPassed = args.queryKey[1];
  console.log(argsPassed);

  console.log(`/api/movies/known_for/${argsPassed}`)
  return fetch(
    `/api/movies/known_for/${argsPassed}`
    //`https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    //console.log(response.json())
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

export const getActorExternalId = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `
    https://api.themoviedb.org/3/person/${id}/external_ids?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

export const getActorDetailsIMDB = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/find/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&external_source=imdb_id`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

  export const getFilteredMovies = (args) => {
    const type = args.queryKey[1];
    const page = args.queryKey[2];
    
    return fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`
    ).then( (response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const filterMovies = () => {
    return fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
    ).then(res => res.json())
    .then(json => json.results);
  };
  
  export const getGenres = async () => {
    return fetch(
        `/api/genres`,{
        }
    ).then( (response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  
  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    console.log(1,id);
    return fetch( `/api/movies/${id}/images`,{
    }
      // `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      //console.log(response.json());
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };


  export const getMovieReviews = (id) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.results);
        return json.results;
      });
  };