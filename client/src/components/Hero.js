import React, { useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { GlobalContext } from "../context/GlobalState";
import { useAuth } from "../context/AuthContext";
import masters from "../static/images/masters1.png";
import Scoreboards from "./Scores/Scoreboards";
import "fontsource-bree-serif";
import Footer from "./layout/Footer";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    background: `linear-gradient(rgba(236, 254, 246,.3), rgba(236, 254, 246,.4)), url(${masters})`,
    padding: theme.spacing(8, 0, 6),
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  // heroSecondaryBTN: {
  //   backgroundColor: theme.palette.third.main,
  //   color: "#f0f0f0",
  // },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  container: {
    opacity: "1",
  },
}));

const Hero = () => {
  const { getUser, getWorldRankings, } = useContext(GlobalContext);
  const { currentUser } = useAuth();
  useEffect(() => {
    // getScoreData();
    // getUsers();

    getWorldRankings();
    if (currentUser) {
      getUser(currentUser.email);
    }
    // eslint-disable-next-line
  }, []);
  const classes = useStyles();
  return (
    <>
      <div className={classes.heroContent}>
        <Container className={classes.container} maxWidth="sm">
          {/* <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Mastery
          </Typography> */}
          <Typography
            variant="h4"
            align="center"
            style={{
              fontWeight: "100",
              color: "#111111",
              fontFamily: "Bree Serif",
            }}
            paragraph
          >
            A tradition unlike any other...
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  component={RouterLink}
                  to="/account"
                >
                  Create a Team
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  className={`${classes.button} ${classes.heroSecondaryBTN}`}
                  component={RouterLink}
                  to="/scores"
                >
                  View Standings
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <Grid container>
        <Grid item xs={12}>
          <Scoreboards></Scoreboards>
        </Grid>
      </Grid>
      <Footer></Footer>
    </>
  );
};

export default Hero;
