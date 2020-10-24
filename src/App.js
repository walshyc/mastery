import { useContext } from "react";
import Navbar from "./components/layout/Navbar";
import ScoreTable from "./components/ScoreTable";
import "./App.css";
import { Container } from "@material-ui/core";
import { GlobalProvider, GlobalContext } from "./context/GlobalState";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Spinner from "./components/layout/Spinner";

function App() {
  const { loading } = useContext(GlobalContext);
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#009B77",
      },
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
        <div className="App">
          <Navbar></Navbar>
          <Container maxWidth="md" disableGutters={true}>
            <ScoreTable></ScoreTable>
          </Container>
        </div>
      </ThemeProvider>
    </GlobalProvider>
  );
}

export default App;
