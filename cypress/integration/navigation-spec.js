let movies;
const movieId =  335983; // The movie Venom id
let reviews;
const registeredUser = {
  email: "jppower2010@hotmail.com",
  password: "testing"
}

describe("Navigation", () => {
  before(() => {
    cy.visit(`/`);
    cy.get("#signInEmail").clear().type(registeredUser.email);
            cy.get("#signInPassword").clear().type(registeredUser.password);
            cy.get("#loginButton").click();
            cy.get("h5").should("have.text","Welcome "+registeredUser.email);
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")
      .then((response) => {
        movies = response.results;
      });
    // Get movie reviews
    cy.request(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${Cypress.env(
        "TMDB_KEY"
      )}`
    )
      .its("body")
      .then((response) => {
        // console.log(response);
        reviews = response.results;
      });
  });
  beforeEach(() => {
    cy.visit(`/`);
    cy.get("#signInEmail").clear().type(registeredUser.email);
            cy.get("#signInPassword").clear().type(registeredUser.password);
            cy.get("#loginButton").click();
            cy.get("h5").should("have.text","Welcome "+registeredUser.email);;
  });  
  describe("From the home page", () => {
    it("should navigate to the movie details page and change browser URL", () => {
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
      cy.url().should("include", `/movies/${movies[0].id}`);
      cy.get("h3").contains(movies[0].title);
    });
  });
  describe("The site header", () => {
    describe("when the viewport is desktop scale", () => {
      it("should allow navigation to the Favourites page from the link", () => {
        cy.get("header").find(".MuiToolbar-root").find("button").eq(1).click();
        cy.url().should("include", `/favorites`);
        cy.get("h3").contains("Favorite Movies");
      });
      it("should allow user to logout and navigate back to login page", () => {
        cy.get("header").find(".MuiToolbar-root").find("button").eq(2).click();
        cy.url().should("include", `/`);
    });
    describe(
      "when the viewport is a mobile",
      {
        viewportHeight: 896,
        viewportWidth: 414,
      },
      () => {
        it("should allow navigation to the Favourites page from the dropdown menu", () => {
          cy.get("header").find("button").click();
          cy.get("li").eq(1).click();
          cy.url().should("include", `/favorites`);
          cy.get("h3").contains("Favorite Movies");
        });
        it("should allow user to logout from the dropdown menu", () => {
          cy.get("header").find("button").click();
          cy.get("li").eq(2).click();
          cy.url().should("include", `/`);
        }); 
    });
  });

describe("From the Favorites page", () => {
    beforeEach(() => {
      cy.get("button[aria-label='add to favorites']").eq(0).click();
      cy.get("button[aria-label='add to favorites']").eq(1).click();
      cy.get("header").find(".MuiToolbar-root").find("button").eq(1).click();
    });
    it("should navigate to the movies detail page and change the browser URL", () => {
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
      cy.url().should("include", `/movies/${movies[0].id}`);
      cy.get("h3").contains(movies[0].title);
    });
  });
  describe("The forward/backward links", () => {
    beforeEach(() => {
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
    });
    it("should navigate backward and forward between the movies detail page and the Discover page.", () => {
      cy.get("button[aria-label='go back'").click();
      cy.get("h3").contains("Discover Movies");
      cy.url().should("not.include", `/movies/${movies[0].id}`);
      cy.get("button[aria-label='go forward'").click();
      cy.url().should("include", `/movies/${movies[0].id}`);
      cy.get("h3").contains(movies[0].title);
    });
  });

  describe("The forward/backward links", () => {
    beforeEach(() => {
      cy.get("button[aria-label='add to favorites']").eq(0).click();
      //cy.get("button[aria-label='add to favorites']").eq(1).click();
      cy.get("header").find(".MuiToolbar-root").find("button").eq(1).click();
      cy.url().should("include", `/favorites`);
      //cy.visit("/movies/favorites")
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
    });
    it("should navigate backward and forward between the favorites page and the movie details page.", () => {
        //cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
      cy.get("button[aria-label='go back'").click();
      cy.get("h3").contains("Favorite Movies");
      cy.get("button[aria-label='go forward'").click();
      cy.get("h3").contains(movies[0].title);
    });
  });
});
});