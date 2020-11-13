import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import "fontsource-bree-serif";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListIcon from "@material-ui/icons/List";
import MastersScoreboard from "../Scores/MastersScoreboard";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import MenuIcon from "@material-ui/icons/Menu";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { GlobalContext } from "../../context/GlobalState";
import GroupIcon from "@material-ui/icons/Group";
import ScoreContent from "../../components/Scores/ScoreContent";
import SignUp from "../Auth/SignUp";
import InfoIcon from "@material-ui/icons/Info";
import ForgotPassword from "../Auth/ForgotPassword";
import Account from "../../components/Account";
import Hero from "../../components/Hero";
import About from "../../components/About";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Login from "../Auth/Login";
import PrivateRoute from "../../components/PrivateRoute";
import { Route, Switch } from "react-router-dom";
import AddTeam from "../../components/AddTeam";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    background: theme.palette.primary.main,
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  list: {
    color: theme.palette.primary.light,
  },
  appBar: {
    flexGrow: 1,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  typographyBar: {
    flexGrow: 1,
    textAlign: "center",
    textDecoration: "none",
    color: "#ECFEF6",
    fontFamily: "Bree Serif",
    fontSize: "2rem",
  },

  footer: {
    padding: 15,
    background: "#ECFEF6",
    display: "flex",
    height: 50,
    position: "fixed",
    bottom: 0,
    width: "100%",
  },
  footerText: {
    color: "black",
    fontFamily: "Bree Serif",
    margin: 15,
    textDecoration: "none",
    flex: 1,
  },
  menuButton: {
    //marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundImage: "linear-gradient(to top, #3cba92 0%, #0ba360 100%)",
  },
  email: { fontSize: "0.4rem" },
  content: {
    flexGrow: 1,
    //padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const {
    removeUser,
    getUsers,
    getScoreData,
    getWorldRankings,
    getEntries,
  } = useContext(GlobalContext);
  const classes = useStyles();
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const handleLogout = async (e) => {
    try {
      removeUser();
      await logout();
      history.push("/login");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getScoreData();
    getUsers();
    getWorldRankings();
    getEntries();
    // if (currentUser) {
    //   getUser(currentUser.email);
    // }
    // eslint-disable-next-line
  }, []);
  const { window } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <List className={classes.list}>
          {currentUser ? (
            <ListItem button component={RouterLink} to="/account">
              <ListItemText className={classes.email} />
              {`${currentUser.email}`}
            </ListItem>
          ) : (
            ""
          )}
        </List>
      </div>

      <Divider />
      <List className={classes.list}>
        {currentUser ? (
          <>
            <ListItem  button component={RouterLink} to="/scores">
              <ListItemIcon className={classes.list}>
                <FormatListNumberedIcon />
              </ListItemIcon>
              <ListItemText primary="Scores" />
            </ListItem>
            <ListItem button component={RouterLink} to="/account">
              <ListItemIcon className={classes.list}>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Your Teams" />
            </ListItem>
            <ListItem button component={RouterLink} to="/about">
              <ListItemIcon className={classes.list}>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="FAQ" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon className={classes.list}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button component={RouterLink} to="/signup">
              <ListItemIcon className={classes.list}>
                <HowToRegIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Up" />
            </ListItem>
            <ListItem button component={RouterLink} to="/login">
              <ListItemIcon className={classes.list}>
                <OpenInNewIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={RouterLink} to="/about">
              <ListItemIcon className={classes.list}>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="FAQ" />
            </ListItem>
          </>
        )}
        <Divider></Divider>
        <ListItem>
          <ListItemIcon className={classes.list}>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="Leaderboard" />
        </ListItem>

        <MastersScoreboard></MastersScoreboard>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar className={classes.appBar} position="fixed" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            className={classes.typographyBar}
            component={RouterLink}
            to="/"
            align="center"
          >
            Mastery
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="js">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="js">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div style={{ height: "100vh" }}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/" component={ScoreContent}></Route>
            <PrivateRoute
              exact
              path="/account"
              component={Account}
            ></PrivateRoute>
            <PrivateRoute
              exact
              path="/add-team"
              component={ScoreContent}
            ></PrivateRoute>
            <Route exact path="/scores" component={ScoreContent}></Route>
            <Route exact path="/signup" component={SignUp}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/about" component={About}></Route>
            <Route path="/" component={ScoreContent}></Route>
            <Route
              exact
              path="/forgot-password"
              component={ForgotPassword}
            ></Route>
          </Switch>
        </div>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
