import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import GolfCourseSharpIcon from "@material-ui/icons/GolfCourseSharp";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AccountBoxRoundedIcon from "@material-ui/icons/AccountBoxRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "#ECFEF6",
  },
  button: {
    color: "#ECFEF6",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            className={classes.title}
            component={RouterLink}
            to="/"
          >
            <GolfCourseSharpIcon></GolfCourseSharpIcon> Mastery
          </Typography>
          {currentUser ? (
            <>
              <Button
                className={classes.button}
                component={RouterLink}
                to="/account"
              >
                <AccountBoxRoundedIcon></AccountBoxRoundedIcon>
                Account
              </Button>
            </>
          ) : (
            <>
              <Button
                className={classes.button}
                component={RouterLink}
                to="/signup"
              >
                Sign Up
              </Button>
              <Button
                className={classes.button}
                component={RouterLink}
                to="/login"
              >
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
