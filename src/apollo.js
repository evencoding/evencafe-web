import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { ApolloLink } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

const TOKEN = "token";
const DARK_MODE = "DARK_MODE";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const darkModeVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const showUpdateBtn = makeVar(false);

export const logUserIn = (token) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};
export const logUserOut = (history) => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  // history.replace();
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
export const toggleShopUpdateBtn = () => {
  const cur = showUpdateBtn();
  if (cur) {
    showUpdateBtn(false);
  } else {
    showUpdateBtn(true);
  }
};

// const httpLink = createHttpLink({
//   uri:
//     process.env.NODE_ENV === "production"
//       ? "https://evencafe-backend.herokuapp.com/graphql"
//       : "http://localhost:4400/graphql",
// });
const uploadLink = createUploadLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://evencafe-backend.herokuapp.com/graphql"
      : "http://localhost:4400/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN),
    },
  };
});

export const client = new ApolloClient({
  // link: authLink.concat(httpLink),
  link: ApolloLink.from([authLink, uploadLink]),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: (obj) => `User:${obj.username}`,
      },
    },
  }),
});
