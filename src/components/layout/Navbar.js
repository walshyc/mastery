import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import GolfCourseSharpIcon from '@material-ui/icons/GolfCourseSharp';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="static" color='primary'>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" className={classes.title}>
          <GolfCourseSharpIcon></GolfCourseSharpIcon> Mastery Fantasy
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
