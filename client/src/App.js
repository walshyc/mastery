import { AuthProvider } from './context/AuthContext';
import Drawer from './components/layout/Drawer';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { GlobalProvider } from './context/GlobalState';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import 'fontsource-poppins';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import NewNav from './components/layout/NewNav';
import NewTable from './components/Scores/NewTable';
import NewAddTeam from './components/NewAddTeam';
import ScoreTable from './components/Scores/ScoreTable';

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

  //const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY_PUB);
  const stripePromise = loadStripe(
    'pk_test_51HjBmkEjMQzPzA4cHelZNtijjsNwO4DZFbjxqvFtXZocrRkLjMha6S3hyi3VntJFwJTpvx7rwpYKFXs4JcZKdbJl00aWJw9Ibt'
  );

  return (
    <GlobalProvider>
      <Elements stripe={stripePromise}>
        <ThemeProvider theme={theme}>
          <Router>
            <AuthProvider>
              <div className="App w-full bg-green-600">
                <NewNav></NewNav>
                <Switch>
                  <Route exact path="/" component={ScoreTable}></Route>
                  <Route exact path="/scores" component={ScoreTable}></Route>
                  <Route exact path="/new-entry" component={NewAddTeam}></Route>
                </Switch>
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
