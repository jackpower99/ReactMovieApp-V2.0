import React from "react";
import signInForm from "../components/signInForm";
import { MemoryRouter } from "react-router";
import SignInForm from "../components/signInForm";

export default {
    title: "Sign In Page",
    component: signInForm,
    decorators: [
      (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    ],
  };
  
  export const Basic = () => <SignInForm  />;
  
  Basic.storyName = "Default";