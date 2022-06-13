import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import NotFound from "./screens/NotFound";
import { isLoggedInVar, darkModeVar, client } from "./apollo";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme, GlobalStyles } from "./GlobalStyles";
import routes from "./routes";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import SearchShop from "./screens/SearchShop";
import Profile from "./screens/Profile";
import CreateCoffeeShop from "./screens/CreateCoffeeShop";
import Shop from "./screens/Shop";
import Categories from "./screens/Categories";
import EditProfile from "./screens/EditProfile";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Switch>
              <Route path={routes.home} exact>
                <Layout>
                  <Home />
                </Layout>
              </Route>
              <Route path={routes.login} exact>
                {isLoggedIn ? (
                  <Layout>
                    <Home />
                  </Layout>
                ) : (
                  <Login />
                )}
              </Route>
              {!isLoggedIn ? (
                <Route path={routes.signUp} exact>
                  <Signup />
                </Route>
              ) : null}
              <Route exact path={routes.profile}>
                <Layout>
                  <Profile />
                </Layout>
              </Route>
              <Route exact path={routes.editProfile}>
                <Layout>
                  <EditProfile />
                </Layout>
              </Route>
              <Route exact path={routes.createCoffeeShop}>
                {isLoggedIn ? (
                  <Layout>
                    <CreateCoffeeShop />
                  </Layout>
                ) : (
                  <Login />
                )}
              </Route>
              <Route exact path={routes.searchShop}>
                <Layout>
                  <SearchShop />
                </Layout>
              </Route>
              <Route exact path={routes.categories}>
                <Layout>
                  <Categories />
                </Layout>
              </Route>
              <Route exact path={routes.shop}>
                <Layout>
                  <Shop />
                </Layout>
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
