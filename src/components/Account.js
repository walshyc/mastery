import React, { useState } from "react";
import Button from "@material-ui/core/Button";
// import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// const useStyles = makeStyles((theme) => ({
//   button: {},
// }));

const Account = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const handleLogout = async (e) => {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch (err) {
      setError("Failed to Logout");
    }
  };

  // const classes = useStyles();
  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <strong>Email: </strong>
      {currentUser.email}
      <br/>
      
      <Button
        onClick={handleLogout}
        component={RouterLink}
        to="/login"
        color="danger"
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
