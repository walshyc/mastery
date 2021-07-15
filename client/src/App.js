import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { GlobalProvider } from './context/GlobalState';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import 'fontsource-poppins';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import NewAddTeam from './components/NewAddTeam';
import Landing from './components/Landing';
import FAQ from './components/FAQ';
import ScoreTable from './components/Scores/ScoreTable';
import ScoreTable2 from './components/Scores/ScoreTable2';
import NewFooter from './components/layout/NewFooter';
import NewNavTwo from './components/layout/NewNavTwo';
import Tiebreaker from './components/Tiebreaker';
import FAQOpen from './components/FAQOpen';
import AddOffline from './components/AddOffline';

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#0ba360',
        light: '#ffffff',
      },
      secondary: {
        main: '#202020',
      },
      third: {
        main: '#ffffff',
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
  // const stripePromise = loadStripe(
  //   'pk_test_51HjBmkEjMQzPzA4cHelZNtijjsNwO4DZFbjxqvFtXZocrRkLjMha6S3hyi3VntJFwJTpvx7rwpYKFXs4JcZKdbJl00aWJw9Ibt'
  // );

  return (
    <GlobalProvider>
      <Elements stripe={stripePromise}>
        <ThemeProvider theme={theme}>
          <Router>
            <AuthProvider>
              <div className="App w-full min-h-screen bg-green-400">
                {/* <NewNav></NewNav> */}
                <NewNavTwo></NewNavTwo>
                <Switch>
                  <Route exact path="/scores" component={ScoreTable}></Route>
                  <Route exact path="/lads" component={ScoreTable2}></Route>
                  {/* <Route exact path="/new-entry" component={NewAddTeam}></Route> */}
                  <Route exact path="/enter" component={NewAddTeam}></Route>
                  <Route
                    exact
                    path="/enter-offline"
                    component={AddOffline}
                  ></Route>
                  <Route exact path="/faq" component={FAQOpen}></Route>
                  <Route
                    exact
                    path="/tiebreaker"
                    component={Tiebreaker}
                  ></Route>
                  {/* <Route path="/" component={ScoreTable}></Route> */}
                  <Route path="/" component={Landing}></Route>
                </Switch>
                <NewFooter></NewFooter>
                {/* <ScoreTable></ScoreTable> */}
                {/* <NewTable></NewTable> */}
                {/* <Drawer></Drawer> */}
              </div>
            </AuthProvider>
          </Router>
        </ThemeProvider>
      </Elements>
    </GlobalProvider>
  );
}

export default App;
