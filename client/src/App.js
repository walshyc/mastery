import { AuthProvider } from "./context/AuthContext";
import Drawer from "./components/layout/Drawer";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { GlobalProvider } from "./context/GlobalState";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "fontsource-poppins";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#0ba360",
        light: '#ffffff'
      },
      secondary: {
        main: "#202020",
      },
      third: {
        main: "#ffffff",
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
                <Drawer></Drawer>
              </div>
            </AuthProvider>
          </Router>
        </ThemeProvider>
      </Elements>
    </GlobalProvider>
  );
}

export default App;
