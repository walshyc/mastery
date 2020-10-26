import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    background: `linear-gradient(rgba(236, 254, 246,.6), rgba(236, 254, 246,.7)), url(${"https://images.unsplash.com/photo-1576220258822-153014832245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2128&q=80"})`,
    padding: theme.spacing(8, 0, 6),
    backgroundSize: "cover",
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
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
  const classes = useStyles();
  return (
    <div className={classes.heroContent}>
      <Container className={classes.container} maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Headline
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Something short and leading about the collection below—its contents,
          the creator, etc. Make it short and sweet, but not too short so folks
          don&apos;t simply skip over it entirely.
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                component={RouterLink}
                to="/signup"
              >
                Create a Team
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
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
  );
};

export default Hero;
