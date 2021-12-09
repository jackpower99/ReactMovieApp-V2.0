const validRegister = {
    email : "testing@test@gmail.com",
    password: "testing",
    confirmPassword: "testing"
}

const invalidUserPasswordsNotMatching = {
    email: "testing@gmail.com",
    password: "testing",
    confirmPassword: "testing123"
}

const invalidUserPasswordTooShort = {
    email: "testing@gmail.com",
    password: "test",
    confirmPassword: "test"
}

const invalidUserEmail = {
    email: "testinggmail.com",
    password: "testing",
    confirmPassword: "testing"
}

const registeredUser = {
    email: "jppower2010@hotmail.com",
    password: "testing"
}

describe("Sign In Page", () => {
   
    beforeEach(() => {
      cy.visit(`/login`);
    });
    describe("Base tests", () => {
      it("should display sign in and register forms", () => {
        cy.get("h1").contains("Sign in");
        cy.get("h1").contains("Register");
      });
    });

    describe("Registering", () => {
        it("should allow users to register with valid details", ()=> {
            cy.get("#email").clear().type(validRegister.email);
            cy.get("#password").clear().type(validRegister.password);
            cy.get("#confirmPassword").clear().type(validRegister.confirmPassword);
            cy.get("#registerButton").click();
            cy.get("#email").should("have.value","");
        });

        it("should not allow users to register with invalid details(Passwords not Matching)", ()=> {
            cy.get("#email").clear().type(invalidUserPasswordsNotMatching.email);
            cy.get("#password").clear().type(invalidUserPasswordsNotMatching.password);
            cy.get("#confirmPassword").clear().type(invalidUserPasswordsNotMatching.confirmPassword);
            cy.get("#registerButton").click();
            cy.get("#email").should("have.value",invalidUserPasswordsNotMatching.email);
         });

        it("should not allow users to register with invalid details(Password too short)", ()=> {
        cy.get("#email").clear().type(invalidUserPasswordTooShort.email);
        cy.get("#password").clear().type(invalidUserPasswordTooShort.password);
        cy.get("#confirmPassword").clear().type(invalidUserPasswordTooShort.confirmPassword);
        cy.get("#registerButton").click();
        cy.get("#email").should("have.value",invalidUserPasswordTooShort.email);
        });

        it("should not allow users to register with invalid details(Email not Valid)", ()=> {
        cy.get("#email").clear().type(invalidUserEmail.email);
        cy.get("#password").clear().type(invalidUserEmail.password);
        cy.get("#confirmPassword").clear().type(invalidUserEmail.confirmPassword);
        cy.get("#registerButton").click();
        cy.get("#email").should("have.value",invalidUserEmail.email);
})
    });

    describe("Signing In", () => {
        it("should allow users to register with valid details", ()=> {
            cy.get("#signInEmail").clear().type(registeredUser.email);
            cy.get("#signInPassword").clear().type(registeredUser.password);
            cy.get("#loginButton").click();
            cy.get("h5").should("have.text","Welcome "+registeredUser.email);
        });
    });
});
//issues here with cypress not finding snackbar
