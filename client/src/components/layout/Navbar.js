import React, {useContext, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import GolfCourseSharpIcon from "@material-ui/icons/GolfCourseSharp";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {GlobalContext} from '../../context/GlobalState'
import AccountBoxRoundedIcon from "@material-ui/icons/AccountBoxRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //marginBottom: "25px",
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
  const {removeUser, getUsers, getScoreData, getWorldRankings} = useContext(GlobalContext)
  const classes = useStyles();
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const handleLogout = async (e) => {
    try {
      await logout();
      removeUser()
      history.push("/login");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
     getScoreData()
     getUsers();
     getWorldRankings()
    console.log('loaded from nav')
    // if (currentUser) {
    //   getUser(currentUser.email);
    // }
    // eslint-disable-next-line
  }, []);
  
  return (
    <>
      <AppBar className={classes.root} position="static" color="primary">
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
              <Button
                onClick={handleLogout}
                component={RouterLink}
                to="/"
                color="default"
                variant="contained"
              >
                Logout
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
