import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "token";
const DARK_MODE = "DARK_MODE";

export const isLoggedInVar = makeVar(false);
export const darkModeVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};
export const logUserOut = (history) => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  history.replace();
  window.location.reload();
};

export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enabled");
  darkModeVar(true);
};
export const disableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "abled");
  darkModeVar(false);
};

export const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://evencafe-backend.herokuapp.com/graphql"
      : "http://localhost:4400/graphql",
  //  ? "http://localhost:4400/graphql"
  // : "https://evencafe-backend.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});
