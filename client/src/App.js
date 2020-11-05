import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import ScoreTable from "./components/ScoreTable";
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
  Redirect,
} from "react-router-dom";
import "./App.css";
import { Container } from "@material-ui/core";
import { GlobalProvider } from "./context/GlobalState";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import AddTeam from "./components/AddTeam";
import "fontsource-poppins";
import Spinner from "./components/layout/Spinner";
import { useContext } from "react";
import { GlobalContext } from "./context/GlobalState";
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

  const { loading } = useContext(GlobalContext);
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY_PUB);
  stripePromise.then((data) => console.log(data));

  return (
    <Elements stripe={stripePromise}>
      <GlobalProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <AuthProvider>
              <div className="App">
                <Navbar></Navbar>
                <Container maxWidth="md" disableGutters={true}>
                  <Switch>
                    <Route exact path="/" component={Hero}></Route>
                    <Route exact path="/account" component={Account}></Route>
                    <Route exact path="/add-team" component={AddTeam}></Route>
                    <Route exact path="/scores" component={ScoreTable}></Route>
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
      </GlobalProvider>
    </Elements>
  );
}

export default App;
