import React, { useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TeamCard from "./TeamCard";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Typography from "@material-ui/core/Typography";
import { GlobalContext } from "../context/GlobalState";
import Spinner from "./layout/Spinner";
import Grid from "@material-ui/core/Grid";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

// const useStyles = makeStyles((theme) => ({
//   button: {},
// }));

const Account = () => {
  const { currentUser } = useAuth();
  const { loggedInUser, loading, getUser, getUsers, users } = useContext(
    GlobalContext
  );

  let arrayIndex = 0;
  const currentIndex = users.filter((u, index) => {
    if (u.email === currentUser.email) {
      arrayIndex = index;
      return index;
    }
    return ;
  });
  if (currentIndex) {
  }

  useEffect(() => {
    const getData = async () => {
      await getUsers();
      if (currentUser) {
        await getUser(currentUser.email);
      }
    };
    getData();
    // eslint-disable-next-line
  }, [
    users[arrayIndex] &&
      users[arrayIndex].selections &&
      users[arrayIndex].selections.length,
  ]);

  if (loading || !loggedInUser) {
    return <Spinner></Spinner>;
  }
  const showTeams = () => {
    if (loggedInUser && loggedInUser.selections) {
      switch (loggedInUser.selections.length) {
        case 0:
          return <>You have no teams yet!</>;
        case 1:
          return "Your team";
        default:
          return "Your team's";
      }
    } else {
      return (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              You have no teams yet!
            </Grid>
            <Grid item xs={12} style={{ marginTop: 15 }}></Grid>
          </Grid>
        </>
      );
    }
  };

  return (
    <div>
      <Grid container spacing={2} style={{ marginTop: 15 }}>
        <Grid item xs={12} sm={8}>
          <Typography variant="h4" gutterBottom align="center">
            {loggedInUser && showTeams()}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            startIcon={<PlaylistAddIcon />}
            component={RouterLink}
            to="/add-team"
            color="primary"
            variant="contained"
            fullwidth
          >
            Add Team
          </Button>
        </Grid>
      </Grid>

      <Grid container>
        <Grid container item>
          <Grid item></Grid>
        </Grid>
        {loggedInUser &&
          loggedInUser.selections &&
          loggedInUser.selections.map((s) => {
            return (
              <Grid
                key={
                  s.golferOne.player_id +
                  s.golferTwo.player_id +
                  s.golferThree.player_id +
                  s.golferFour.player_id
                }
                item
                xs={11}
                sm={5}
                style={{ margin: 15 }}
              >
                <TeamCard selections={s}></TeamCard>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default Account;
