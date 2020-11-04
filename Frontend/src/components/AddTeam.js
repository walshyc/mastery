import React, { useState, useContext, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useHistory, withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useAuth } from "../context/AuthContext";
import Alert from "@material-ui/lab/Alert";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { GlobalContext } from "../context/GlobalState";
import CheckoutForm from "./Stripe/CheckoutForm";

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

const AddTeam = () => {
  const { data, addSelections, getUser, getUsers, getScoreData } = useContext(
    GlobalContext
  );
  const classes = useStyles();
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
  console.log(currentUser.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      addSelections(
        currentUser.email,
        state.selectionOne,
        state.selectionOneId,
        state.selectionTwo,
        state.selectionTwoId,
        state.selectionThree,
        state.selectionThreeId
      );
      const getData = async () => {
        await getUsers().then(getUser(currentUser.email));
        history.push("/account");
      };
      getData();
    } catch (err) {
      setError("Could not add your team");
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
    <>

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
                          key={p.player_id}
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
        {/* <CheckoutForm></CheckoutForm> */}
      </Container>
    </>
  );
};
export default AddTeam;
