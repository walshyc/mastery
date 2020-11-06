import React from "react";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

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

const TeamForm = (props) => {
  const {
    selections,
    setSelections,
    data,
    handleChange,
    teamCount,
    setTeamCount,
  } = props;

  console.log();

  const classes = useStyles();

  const handleDeleteClick = (e) => {
    e.preventDefault();
    setTeamCount((teamCount) => teamCount - 1);
    setSelections({
      selectionOne: "",
      selectionTwo: "",
      selectionThree: "",
      selectionOneId: "",
      selectionTwoId: "",
      selectionThreeId: "",
    });
  };
  return (
    <>
      <Grid item xs={12}>
        <Typography component="h1" variant="h5">
          New Team
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="golferOne">Selection 1</InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selections.selectionOne}
            onChange={handleChange}
            inputProps={{
              name: "selectionOne",
              id: "age-native-simple",
            }}
          >
            <MenuItem></MenuItem>
            {data &&
              data.map((p) => {
                const name = `${p.player_name}`;
                return (
                  <MenuItem
                    value={name}
                    name={name}
                    key={p.player_id}
                    playerid={p.player_id}
                    selection="selectionOne"
                    selectionid="selectionOneId"
                  >
                    {name}
                  </MenuItem>
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
            value={selections.selectionTwo}
            onChange={handleChange}
            inputProps={{
              name: "selectionTwo",
              id: "age-native-simple",
            }}
          >
            <MenuItem></MenuItem>
            {data.slice(Math.round((data.length + 1) / 3)).map((p) => {
              const name = `${p.player_name}`;
              return (
                <MenuItem
                  value={name}
                  name={name}
                  playerid={p.player_id}
                  selection="selectionTwo"
                  selectionid="selectionTwoId"
                >
                  {name}
                </MenuItem>
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
            value={selections.selectionThree}
            onChange={handleChange}
            inputProps={{
              name: "selectionThree",
              id: "age-native-simple",
            }}
          >
            <MenuItem></MenuItem>
            {data.slice(Math.round(((data.length + 1) * 2) / 3)).map((p) => {
              const name = `${p.player_name}`;
              return (
                <MenuItem
                  value={name}
                  name={name}
                  playerid={p.player_id}
                  selection="selectionThree"
                  selectionid="selectionThreeId"
                >
                  {name}
                </MenuItem>
              );
            })}
          </Select>
          {teamCount >= 2 ? (
            <Button
              onClick={handleDeleteClick}
              color="default"
              variant="contained"
            >
              Delete Team
            </Button>
          ) : (
            ""
          )}
        </FormControl>
      </Grid>
    </>
  );
};

export default TeamForm;
