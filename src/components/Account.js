import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
    button: {
      color: "#ECFEF6",
    },
}));

const Account = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory()
  const handleLogout = async (e) => {
      setError('')
      try {
          await logout()
          history.push('/login')
      } catch (error) {
          setError('Failed to Logout')
      }
  };

  const classes = useStyles();
  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <strong>Email: </strong>
      {currentUser.email}
      <Button
        onClick={handleLogout}
        className={classes.button}
        component={RouterLink}
        to="/login"
      >
        Logout
      </Button>
    </div>
  );
};

export default Account;
