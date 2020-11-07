import React, { useRef, useEffect, useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link as RouterLink, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useAuth } from "../../context/AuthContext";
import Alert from '@material-ui/lab/Alert';
import { GlobalContext } from "../../context/GlobalState";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const { getScoreData, getUsers, getUser } = useContext(GlobalContext);
  const classes = useStyles();
  const emailFormRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const { login, currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    getScoreData();
    getUsers();

    // eslint-disable-next-line
  }, []);
  // if (currentUser) {
  //   getUser(currentUser.email);
  //   history.push("/account");
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = emailFormRef.current.value;
      getUser(email);
      await login(emailFormRef.current.value, passwordRef.current.value);
      if (currentUser) {
        getUser(currentUser.email);
      }
      history.push("/account");
    } catch (err) {
      if (err.code === "auth/invalid-email") {
        setError("Email address is incorrect!");
        console.log("Email address is incorrect!");
      } else if (err.code === "auth/wrong-password") {
        setError("Password is incorrect!");
      } else {
        setError("Failed to login! Please try again.");
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={emailFormRef}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={passwordRef}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <RouterLink to="/forgot-password" variant="body2">
                Forgot password?
              </RouterLink>
            </Grid>
            <Grid item>
              <RouterLink to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </RouterLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
