import React from 'react';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '90%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
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

  const classes = useStyles();

  const handleDeleteClick = (e) => {
    e.preventDefault();
    setTeamCount((teamCount) => teamCount - 1);
    setSelections({
      selectionOne: '',
      selectionTwo: '',
      selectionThree: '',
      selectionFour: '',
      selectionOneId: '',
      selectionTwoId: '',
      selectionThreeId: '',
      selectionFourId: '',
    });
  };
  let oneIndex = selections.selections.findIndex((s) => {
    return s.no === 'selectionOne';
  });
  let twoIndex = selections.selections.findIndex((s) => {
    return s.no === 'selectionTwo';
  });
  let threeIndex = selections.selections.findIndex((s) => {
    return s.no === 'selectionThree';
  });
  let fourIndex = selections.selections.findIndex((s) => {
    return s.no === 'selectionFour';
  });

  return (
    <>
      <Grid item xs={12}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="golferOne">Selection 1</InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selections.selections[oneIndex].selection}
            onChange={handleChange}
            inputProps={{
              name: 'selectionOne',
              id: 'age-native-simple',
            }}
          >
            {data &&
              data
                .filter((player) => {
                  let n = `${player.first_name} ${player.last_name}`;
                  return (
                    n !== selections.selections[twoIndex].selection &&
                    n !== selections.selections[threeIndex].selection &&
                    n !== selections.selections[fourIndex].selection
                  );
                })
                .map((p) => {
                  const name = `${p.first_name} ${p.last_name}`;
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
            value={selections.selections[twoIndex].selection}
            onChange={handleChange}
            inputProps={{
              name: 'selectionTwo',
              id: 'age-native-simple',
            }}
          >
            {data
              .filter((player) => {
                let n = `${player.first_name} ${player.last_name}`;
                return (
                  n !== selections.selections[oneIndex].selection &&
                  n !== selections.selections[threeIndex].selection &&
                  n !== selections.selections[fourIndex].selection
                );
              })
              .map((p) => {
                const name = `${p.first_name} ${p.last_name}`;
                return (
                  <MenuItem
                    value={name}
                    name={name}
                    key={p.player_id}
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
            value={selections.selections[threeIndex].selection}
            onChange={handleChange}
            inputProps={{
              name: 'selectionThree',
              id: 'age-native-simple',
            }}
          >
            {data
              .filter((player) => {
                let n = `${player.first_name} ${player.last_name}`;
                return (
                  n !== selections.selections[twoIndex].selection &&
                  n !== selections.selections[oneIndex].selection &&
                  n !== selections.selections[fourIndex].selection
                );
              })
              .map((p) => {
                const name = `${p.first_name} ${p.last_name}`;
                return (
                  <MenuItem
                    value={name}
                    name={name}
                    key={p.player_id}
                    playerid={p.player_id}
                    selection="selectionThree"
                    selectionid="selectionThreeId"
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
          <InputLabel htmlFor="golferFour">Selection 4</InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selections.selections[fourIndex].selection}
            onChange={handleChange}
            inputProps={{
              name: 'selectionFour',
              id: 'age-native-simple',
            }}
          >
            <MenuItem></MenuItem>
            {data
              .filter((player) => {
                let n = `${player.first_name} ${player.last_name}`;
                return (
                  n !== selections.selections[twoIndex].selection &&
                  n !== selections.selections[threeIndex].selection &&
                  n !== selections.selections[oneIndex].selection
                );
              })
              .map((p) => {
                const name = `${p.first_name} ${p.last_name}`;
                return (
                  <MenuItem
                    value={name}
                    name={name}
                    playerid={p.player_id}
                    key={p.player_id}
                    selection="selectionFour"
                    selectionid="selectionFourId"
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
              style={{ marginTop: 20 }}
            >
              Delete Team
            </Button>
          ) : (
            ''
          )}
        </FormControl>
      </Grid>
    </>
  );
};

export default TeamForm;
