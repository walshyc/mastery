import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import ScoreTable from "./components/ScoreTable";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import Account from "./components/Account";
import Hero from "./components/Hero";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Container } from "@material-ui/core";
import { GlobalProvider } from "./context/GlobalState";
import {
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import AddTeam from "./components/AddTeam";

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
  });

  // const useStyles = makeStyles((theme) => ({
  //   root: {
  //     display: "flex",
  //   },
  // }));

  // const classes = useStyles();

  return (
    <GlobalProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <AuthProvider>
            <div className="App">
              <Navbar></Navbar>
              <Switch>
                <Container maxWidth="md" disableGutters={true}>
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
                  <Route exact path="/scores" component={ScoreTable}></Route>
                  <Route exact path="/signup" component={SignUp}></Route>
                  <Route exact path="/login" component={Login}></Route>
                  <Route
                    exact
                    path="/forgot-password"
                    component={ForgotPassword}
                  ></Route>
                </Container>
              </Switch>
            </div>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </GlobalProvider>
  );
}

export default App;
