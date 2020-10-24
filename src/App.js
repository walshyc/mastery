import { useContext } from "react";
import Navbar from "./components/layout/Navbar";
import ScoreTable from "./components/ScoreTable";
import SignUp from './components/SignUp'
import Login from './components/Login'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Container } from "@material-ui/core";
import { GlobalProvider, GlobalContext } from "./context/GlobalState";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";

function App() {
  const { loading } = useContext(GlobalContext);
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#009B77",
      },
      secondary: {
        main: "#ECFEF6"
      }
    },
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
  }));

  const classes = useStyles();

  return (
    <GlobalProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <Navbar></Navbar>
            <Container maxWidth="md" disableGutters={true}>
              <Switch>
              <Route exact path="/" component={ScoreTable}></Route>
              <Route exact path="/signup" component={SignUp}></Route>
              <Route exact path="/login" component={Login}></Route>
              </Switch>
            </Container>
          </div>
        </Router>
      </ThemeProvider>
    </GlobalProvider>
  );
}

export default App;
