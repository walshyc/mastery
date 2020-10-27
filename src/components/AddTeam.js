import React, { useRef, useState, useContext } from "react";
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
import { useAuth } from "../context/AuthContext";
import Alert from "@material-ui/lab/Alert";
import { db } from "../firebase";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import { GlobalContext } from "../context/GlobalState";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <RouterLink color="inherit" to="/">
        Mastery
      </RouterLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "90%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
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

export default function AddTeam() {
  const { data, addUser, addSelections } = useContext(GlobalContext);
  const classes = useStyles();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailFormRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");

  const { currentUser } = useAuth();
  const history = useHistory();
  const sortedData = data.results.leaderboard.sort(function (a, b) {
    var nameA = a.last_name.toLowerCase(),
      nameB = b.last_name.toLowerCase();
    if (nameA < nameB)
      //sort string ascending
      return -1;
    if (nameA > nameB) return 1;
    return 0; //default return value (no sorting)
  });
  console.log(currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      addSelections(
        state.selectionOne,
        state.selectionOneId,
        state.selectionTwo,
        state.selectionTwoId,
        state.selectionThree,
        state.selectionThreeId
      );
      history.push("/account");
    } catch (err) {
      console.log(err);
    }
  };
  const [state, setState] = React.useState({
    selectionOne: "",
    selectionTwo: "",
    selectionThree: "",
    selectionOneId: "",
    selectionTwoId: "",
    selectionThreeId: "",
  });

  const handleChange = (event) => {
    const id = event.currentTarget.getAttribute("playerid");
    const name = event.currentTarget.getAttribute("name");
    const selection = event.currentTarget.getAttribute("selection");
    const selectionid = event.currentTarget.getAttribute("selectionid");
    setState({
      ...state,
      [selection]: name,
      [selectionid]: id,
    });
  };
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Team
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}

        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="golferOne">Selection 1</InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={state.selectionOne}
                  onChange={handleChange}
                  inputProps={{
                    name: "selectionOne",
                    id: "age-native-simple",
                  }}
                >
                  <MenuItem></MenuItem>
                  {sortedData.map((p) => {
                    const name = `${p.first_name} ${p.last_name}`;
                    return (
                      <MenuItem
                        value={name}
                        name={name}
                        playerid={p.player_id}
                        selection="selectionOne"
                        selectionid="selectionOneId"
                      >{`${p.last_name.toUpperCase()}, ${
                        p.first_name
                      }`}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="golferTwo">Selection 2</InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={state.selectionTwo}
                  onChange={handleChange}
                  inputProps={{
                    name: "selectionTwo",
                    id: "age-native-simple",
                  }}
                >
                  <MenuItem></MenuItem>
                  {sortedData.map((p) => {
                    const name = `${p.first_name} ${p.last_name}`;
                    return (
                      <MenuItem
                        value={name}
                        name={name}
                        playerid={p.player_id}
                        selection="selectionTwo"
                        selectionid="selectionTwoId"
                      >{`${p.last_name.toUpperCase()}, ${
                        p.first_name
                      }`}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="golferThree">Selection 3</InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={state.selectionThree}
                  onChange={handleChange}
                  inputProps={{
                    name: "selectionThree",
                    id: "age-native-simple",
                  }}
                >
                  <MenuItem></MenuItem>
                  {sortedData.map((p) => {
                    const name = `${p.first_name} ${p.last_name}`;
                    return (
                      <MenuItem
                        value={name}
                        name={name}
                        playerid={p.player_id}
                        selection="selectionThree"
                        selectionid="selectionThreeId"
                      >{`${p.last_name.toUpperCase()}, ${
                        p.first_name
                      }`}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit Team
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
