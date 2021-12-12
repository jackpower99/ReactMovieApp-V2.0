let movies;    // List of movies from TMDB
let categoryMovies;


// Utility functions
const filterByTitle = (movieList, string) =>
  movieList.filter((m) => m.title.toLowerCase().search(string) !== -1);

const filterByGenre = (movieList, genreId) =>
  movieList.filter((m) => m.genre_ids.includes(genreId));


describe("Home Page ", () => {
  before(() => {
    // Get movies from TMDB and store in movies variable.
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")    // Take the body of HTTP response from TMDB
      .then((response) => {
        movies = response.results
      });
  });
  beforeEach(() => {
    cy.visit("/home")
  });

  describe("Home Page", () => {
    beforeEach(() => {
      cy.visit("/home");
    });
  
    describe("Base test", () => {
      it("displays page header", () => {
        cy.get("h3").contains("Discover Movies");
        cy.get("h1").contains("Filter the movies");
      });
    });
  })

  describe("Filtering", () => {
    describe("By movie title", () => {
     it("should only display movies with m in the title", () => {
       let searchString = "m";
       let matchingMovies = filterByTitle(movies, searchString);
       cy.get("#filled-search").clear().type(searchString); // Enter m in text box
       cy.get(".MuiCardHeader-content").should(
         "have.length",
         matchingMovies.length
       );
       cy.get(".MuiCardHeader-content").each(($card, index) => {
         cy.wrap($card).find("p").contains(matchingMovies[index].title);
       });
     })
     it("should only display movies with o in the title", () => {
       let searchString = "o";
       let matchingMovies = filterByTitle(movies, searchString);
       cy.get("#filled-search").clear().type(searchString); // Enter m in text box
       cy.get(".MuiCardHeader-content").should(
         "have.length",
         matchingMovies.length
       );
       cy.get(".MuiCardHeader-content").each(($card, index) => {
         cy.wrap($card).find("p").contains(matchingMovies[index].title);
       });
     })
     it("should display no movies if a match for the search string cannot be found. e.g 'xyz' ", () => {
         let searchString = "xyz";
         cy.get("#filled-search").clear().type(searchString)
         cy.get(".MuiCardHeader-content").should(
            "have.length",
            0
        );
     })
   })
   describe("By movie genre", () => {
    it("should display movies with the specified genre only", () => {
       const selectedGenreId = 35;
       const selectedGenreText = "Comedy";
       const matchingMovies = filterByGenre(movies, selectedGenreId);
       cy.get("#genre-select").click();
       cy.get("li").contains(selectedGenreText).click();
       cy.get(".MuiCardHeader-content").should(
         "have.length",
         matchingMovies.length
       );
       cy.get(".MuiCardHeader-content").each(($card, index) => {
         cy.wrap($card).find("p").contains(matchingMovies[index].title);
       });
     });
   });
   
   describe("By movie category", () => {
     
    it("should display movies with the specified category only", () => {
      cy.request(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&page=1`
      )
        .its("body")    // Take the body of HTTP response from TMDB
        .then((res) => {
          categoryMovies = res.results
        });
       const selectedCategoryText = "Top Rated";
       cy.get('#category-select').click();
       cy.get("li").contains(selectedCategoryText).click();
       cy.get(".MuiCardHeader-content").first().contains("Dilwale Dulhania Le Jayenge")
       });
     });
   });

   describe("Selecting a favorite movie", () => {
       it("Display favorited avatar at top of card and add to favorites page.", () => {
        cy.get("button[aria-label='add to favorites']").eq(1).click();
        cy.get(".MuiCardHeader-avatar").should("have.length", 1);

        cy.get("header").find(".MuiToolbar-root").find("button").eq(1).click();
        cy.url().should("include", `/favorites`);
        cy.get("h3").contains("Favorite Movies");
        cy.get(".MuiCardHeader-content").should(
            "have.length",
            1
          );

       }); 
   });
   describe("The next page & previous page", () => {
    it("should change the page of movies displayed when button pressed", () => {

      const firstPageFirstMovie =  cy.get(".MuiCardHeader-content").first();
      cy.get("#next-button").click();
      cy.get(".MuiCardHeader-content").first().should("not.contain", firstPageFirstMovie);

      const secondPageFirstMovie =  cy.get(".MuiCardHeader-content").first();
      cy.get("#previous-button").click();
      cy.get(".MuiCardHeader-content").first().should("not.contain", secondPageFirstMovie);

    });
  });
 });

//MuiCardHeader-avatar 