export const getMovies = async (args) => {
  const pageNum = args.queryKey[1];
  const token = args.queryKey[2];
  return fetch(
    `/api/movies/?page=${pageNum}`,{
      headers: {
        'Authorization': `Bearer ${token}`,
      },
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
// });
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
  const token = args.queryKey[2];
  const { id } = idPart;
  return fetch(
    `/api/movies/${id}`,{
      headers: {
        'Authorization': `Bearer ${token}`,
      },
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
  const token = args.queryKey[2];
  return fetch(
    `/api/actors/${id}`,{
      headers: {
        'Authorization': `Bearer ${token}`,
      },
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

export const getActorKnownFor = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  console.log(args.queryKey[2])
  const token = args.queryKey[2];
  console.log(token)
  return fetch(
    `/api/actors/${id}/known_for`,{
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
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
  const token = args.queryKey[2];
  console.log(args);

  console.log(`/api/movies/known_for/${argsPassed}`)
  return fetch(
    `/api/movies/known_for/${argsPassed}`,{
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }
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
  
  export const getGenres = async (args) => {
    const token = args.queryKey[1];
    return fetch(
        `/api/genres`,{
          headers: {
            'Authorization': `Bearer ${token}`,
          },
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
    console.log(queryKey);
    const [, idPart] = queryKey;
    const { id } = idPart;
    const token = queryKey[2];
    return fetch( `/api/movies/${id}/images`,{
      headers: {
        'Authorization': `Bearer ${token}`,
      },
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