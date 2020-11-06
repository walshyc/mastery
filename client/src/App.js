import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import ScoreContent from "./components/Scores/ScoreContent";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import Account from "./components/Account";
import Hero from "./components/Hero";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import { Container } from "@material-ui/core";
import { GlobalProvider } from "./context/GlobalState";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import AddTeam from "./components/AddTeam";
import "fontsource-poppins";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#009B77",
      },
      secondary: {
        main: "#ECFEF6",
      },
      third: {
        main: "#033a22",
      },
    },
    typography: {
      fontFamily: `"Poppins", "Helvetica", "Arial", sans-serif`,
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
  });

  // const useStyles = makeStyles((theme) => ({
  //   root: {
  //     display: "flex",
  //   },
  // }));

  // const classes = useStyles();

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY_PUB);

  return (
    <GlobalProvider>
      <Elements stripe={stripePromise}>
        <ThemeProvider theme={theme}>
          <Router>
            <AuthProvider>
              <div className="App">
                <Navbar></Navbar>
                <Container maxWidth="md" disableGutters={true}>
                  <Switch>
                    <Route exact path="/" component={Hero}></Route>
                    <PrivateRoute
                      exact
                      path="/account"
                      component={Account}
                    ></PrivateRoute>
                    <PrivateRoute
                      exact
                      path="/add-team"
                      component={AddTeam}
                    ></PrivateRoute>
                    <Route
                      exact
                      path="/scores"
                      component={ScoreContent}
                    ></Route>
                    <Route exact path="/signup" component={SignUp}></Route>
                    <Route exact path="/login" component={Login}></Route>
                    <Route
                      exact
                      path="/forgot-password"
                      component={ForgotPassword}
                    ></Route>
                  </Switch>
                </Container>
              </div>
            </AuthProvider>
          </Router>
        </ThemeProvider>
      </Elements>
    </GlobalProvider>
  );
}

export default App;
