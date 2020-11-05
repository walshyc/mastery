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
import Spinner from "./layout/Spinner";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import TeamForm from "./TeamForm";

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
  const {
    data,
    addSelections,
    getUser,
    getUsers,
    getScoreData,
    loading,
    loggedInUser,
  } = useContext(GlobalContext);
  const classes = useStyles();

  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutErrorMessage, setCheckoutErrorMessage] = useState("");
  const [teamCount, setTeamCount] = useState(1);
  const [teamOne, setTeamOne] = useState({
    selectionOne: "",
    selectionTwo: "",
    selectionThree: "",
    selectionOneId: "",
    selectionTwoId: "",
    selectionThreeId: "",
  });
  const [teamTwo, setTeamTwo] = useState({
    selectionOne: "",
    selectionTwo: "",
    selectionThree: "",
    selectionOneId: "",
    selectionTwoId: "",
    selectionThreeId: "",
  });
  const [teamThree, setTeamThree] = useState({
    selectionOne: "",
    selectionTwo: "",
    selectionThree: "",
    selectionOneId: "",
    selectionTwoId: "",
    selectionThreeId: "",
  });

  const stripe = useStripe();
  const element = useElements();

  const { currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    getScoreData();
    const getData = async () => {
      await getUsers();
    };
    getData();
    // eslint-disable-next-line
  }, [data.length]);

  let sortedData = [];
  if (data) {
    sortedData = data.results.leaderboard.sort(function (a, b) {
      var nameA = a.last_name.toLowerCase(),
        nameB = b.last_name.toLowerCase();
      if (nameA < nameB)
        //sort string ascending
        return -1;
      if (nameA > nameB) return 1;
      return 0; //default return value (no sorting)
    });
  }

  const handleStripeChange = (e) => {
    if (e.error) {
      return setCheckoutErrorMessage(e.error.message);
    }
    setCheckoutErrorMessage("");
  };
  console.log(teamCount);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let amount;
    if (teamCount === 1) {
      amount = 500;
    } else if (teamCount === 2) {
      amount = 1000;
    } else {
      amount = 1250;
    }
    setIsProcessing(true);
    const cardElement = element.getElement("card");

    const custInfo = { name: loggedInUser.name, email: loggedInUser.email };
    try {
      const paymentIntent = await axios.post("http://localhost:5000/payment", {
        amount: amount,
      });

      // Create payment method object
      const paymentMethodObj = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: custInfo,
      });

      if (paymentMethodObj.error) {
        setCheckoutErrorMessage(paymentMethodObj.error.message);
        setIsProcessing(false);
        return;
      }

      // Confirm the payment
      const confirmPayment = await stripe.confirmCardPayment(
        paymentIntent.data,
        {
          payment_method: paymentMethodObj.paymentMethod.id,
        }
      );

      if (confirmPayment.error) {
        setCheckoutErrorMessage(confirmPayment.error.message);
        setIsProcessing(false);
        return;
      }
    } catch (err) {
      setCheckoutErrorMessage(err.message);
      setIsProcessing(false);
    }

    try {
      if (
        teamOne.selectionOne.length > 0 &&
        teamOne.selectionTwo.length > 0 &&
        teamOne.selectionThree.length > 0
      ) {
        addSelections(
          currentUser.email,
          teamOne.selectionOne,
          teamOne.selectionOneId,
          teamOne.selectionTwo,
          teamOne.selectionTwoId,
          teamOne.selectionThree,
          teamOne.selectionThreeId
        );
      }
      if (
        teamTwo.selectionTwo.length > 0 &&
        teamTwo.selectionTwo.length > 0 &&
        teamTwo.selectionThree.length > 0
      ) {
        addSelections(
          currentUser.email,
          teamTwo.selectionOne,
          teamTwo.selectionOneId,
          teamTwo.selectionTwo,
          teamTwo.selectionTwoId,
          teamTwo.selectionThree,
          teamTwo.selectionThreeId
        );
      }
      if (
        teamThree.selectionThree.length > 0 &&
        teamThree.selectionTwo.length > 0 &&
        teamThree.selectionThree.length > 0
      ) {
        addSelections(
          currentUser.email,
          teamThree.selectionOne,
          teamThree.selectionOneId,
          teamThree.selectionTwo,
          teamThree.selectionTwoId,
          teamThree.selectionThree,
          teamThree.selectionThreeId
        );
      }
    } catch (err) {
      setError("Could not add your team");
      console.log(err);
    }
    const getData = async () => {
      await getUsers().then(getUser(currentUser.email));
      history.push("/account");
    };
    getData();
  };

  const handleChangeTeamOne = (event) => {
    const id = event.currentTarget.getAttribute("playerid");
    const name = event.currentTarget.getAttribute("name");
    const selection = event.currentTarget.getAttribute("selection");
    const selectionid = event.currentTarget.getAttribute("selectionid");
    setTeamOne({
      ...teamOne,
      [selection]: name,
      [selectionid]: id,
    });
  };
  const handleChangeTeamTwo = (event) => {
    const id = event.currentTarget.getAttribute("playerid");
    const name = event.currentTarget.getAttribute("name");
    const selection = event.currentTarget.getAttribute("selection");
    const selectionid = event.currentTarget.getAttribute("selectionid");
    setTeamTwo({
      ...teamTwo,
      [selection]: name,
      [selectionid]: id,
    });
  };
  const handleChangeTeamThree = (event) => {
    const id = event.currentTarget.getAttribute("playerid");
    const name = event.currentTarget.getAttribute("name");
    const selection = event.currentTarget.getAttribute("selection");
    const selectionid = event.currentTarget.getAttribute("selectionid");
    setTeamThree({
      ...teamThree,
      [selection]: name,
      [selectionid]: id,
    });
  };
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "20px",
        "::placeholder": {
          color: "#32325d",
        },
        // width: "100%",
        // height: "100%",
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
    hidePostalCode: true,
  };

  console.log(teamOne);
  console.log(teamTwo);
  console.log(teamThree);

  if (loading) {
    return <Spinner></Spinner>;
  }

  const displayTeams = () => {
    if (teamCount === 1) {
      return (
        <Grid item xs={12}>
          <TeamForm
            selections={teamOne}
            teamCount={teamCount}
            setTeamCount={setTeamCount}
            setSelections={setTeamOne}
            data={sortedData}
            handleChange={handleChangeTeamOne}
          ></TeamForm>
        </Grid>
      );
    } else if (teamCount === 2) {
      return (
        <>
          <Grid item xs={12} sm={6}>
            <TeamForm
              selections={teamOne}
              teamCount={teamCount}
              setTeamCount={setTeamCount}
              setSelections={setTeamOne}
              data={sortedData}
              handleChange={handleChangeTeamOne}
            ></TeamForm>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TeamForm
              selections={teamTwo}
              teamCount={teamCount}
              setTeamCount={setTeamCount}
              setSelections={setTeamTwo}
              data={sortedData}
              handleChange={handleChangeTeamTwo}
            ></TeamForm>
          </Grid>
        </>
      );
    } else {
      return (
        <>
          <Grid item xs={12} sm={4}>
            <TeamForm
              selections={teamOne}
              teamCount={teamCount}
              setTeamCount={setTeamCount}
              setSelections={setTeamOne}
              data={sortedData}
              handleChange={handleChangeTeamOne}
              number={1}
            ></TeamForm>{" "}
          </Grid>
          <Grid item xs={12} sm={4}>
            <TeamForm
              selections={teamTwo}
              teamCount={teamCount}
              setTeamCount={setTeamCount}
              setSelections={setTeamTwo}
              data={sortedData}
              handleChange={handleChangeTeamTwo}
              number={2}
            ></TeamForm>
          </Grid>
          <Grid item xs={12} sm={4}>
            {" "}
            <TeamForm
              selections={teamThree}
              teamCount={teamCount}
              setTeamCount={setTeamCount}
              setSelections={setTeamThree}
              data={sortedData}
              handleChange={handleChangeTeamThree}
              number={3}
            ></TeamForm>
          </Grid>
        </>
      );
    }
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
          {teamCount <= 2 ? (
            <Button
              onClick={() => setTeamCount((teamCount) => teamCount + 1)}
              color="default"
              variant="contained"
            >
              Add another Team
            </Button>
          ) : (
            ""
          )}

          {error && <Alert severity="error">{error}</Alert>}

          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {displayTeams()}

              <Grid item xs={12}>
                <p>{checkoutErrorMessage}</p>
              </Grid>
              <Grid item xs={12}>
                <CardElement
                  id="card-element"
                  options={cardStyle}
                  onChange={handleStripeChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isProcessing}
              className={classes.submit}
            >
              {!isProcessing ? "Pay" : "Processing"}
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};
export default AddTeam;
