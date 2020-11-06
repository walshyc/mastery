import React, { useState, useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
// import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import TeamCard from "./TeamCard";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Typography from "@material-ui/core/Typography";
import { GlobalContext } from "../context/GlobalState";
import Spinner from "./layout/Spinner";
import Grid from "@material-ui/core/Grid";

// const useStyles = makeStyles((theme) => ({
//   button: {},
// }));

const Account = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const {
    loggedInUser,
    loading,
    removeUser,
    getUser,
    getUsers,
    users,
  } = useContext(GlobalContext);

  const handleLogout = async (e) => {
    setError("");
    try {
      await logout();
      removeUser();
      history.push("/login");
    } catch (err) {
      setError("Failed to Logout");
    }
  };

  let arrayIndex = 0;
  const currentIndex = users.filter((u, index) => {
    if (u.email === currentUser.email) {
      arrayIndex = index;
      return index;
    }
  });

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


  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}

      <Typography variant="h4" gutterBottom>
        Hey {loggedInUser.name && loggedInUser.name.split(" ", 1)}!
      </Typography>
      <Typography variant="h6" gutterBottom>
        Here are your teams:
      </Typography>
      <Grid container spacing={2}>
        {loggedInUser &&
          loggedInUser.selections &&
          loggedInUser.selections.map((s) => {
            return (
              <Grid key={s.golferTwo} item xs={12} sm={6} md={4}>
                <TeamCard selections={s}></TeamCard>
              </Grid>
            );
          })}
      </Grid>
      <Button
        onClick={handleLogout}
        component={RouterLink}
        to="/login"
        color="default"
        variant="contained"
      >
        Logout
      </Button>
      <Button
        component={RouterLink}
        to="/add-team"
        color="primary"
        variant="contained"
      >
        Add Team
      </Button>
    </div>
  );
};

export default Account;
