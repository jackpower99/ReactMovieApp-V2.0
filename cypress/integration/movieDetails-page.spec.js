let movieId = 580489; // The movie Venom
let movie;
let numberOfImages;
let reviews;

describe("Movie Details Page", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${Cypress.env(
        "TMDB_KEY"
      )}`
    )
      .its("body")
      .then((movieDetails) => {
        movie = movieDetails;
        return movieDetails.id;
      });
      cy.request(
        `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${Cypress.env(
            "TMDB_KEY"
          )}`
      )
        .its("body")
        .then((imagesFound) => {
          numberOfImages = imagesFound.posters.length;
          console.log(numberOfImages)
        });
  });
  beforeEach(() => {
    cy.visit(`/movies/${movie.id}`);
    cy.wait(1000);
  });
  describe("Base tests", () => {
    it("should display movie title in the page header", () => {
      cy.get("h3").contains(movie.title);
    });
  });

  it("should display the movie's details", () => {
    cy.get("h3").contains("Overview");
    cy.get("h3").next().contains(movie.overview);
    cy.get("ul")
      .eq(1)
      .within(() => {
        const genreChips = movie.genres.map((g) => g.name);
        genreChips.unshift("Genres");
        cy.get("span").each(($card, index) => {
          cy.wrap($card).contains(genreChips[index]);
        });
      });
  });
  it("should display the correct images", () =>{
      cy.get(".MuiGridListTile-root").should('have.length',numberOfImages)
  });
  it("should navigate to the actors details page when image clicked", () => {
    cy.get("img[alt='Avatar Tom Hardy']").click();
    cy.url().should("include", `/actors/2524`);
      });
});