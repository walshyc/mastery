import React, { useState, useContext, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useAuth } from "../context/AuthContext";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import { GlobalContext } from "../context/GlobalState";
import GolfCourseIcon from "@material-ui/icons/GolfCourse";
import { Link } from "react-router-dom";
import Spinner from "./layout/Spinner";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import TeamForm from "./TeamForm";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EuroIcon from "@material-ui/icons/Euro";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import ListItemText from "@material-ui/core/ListItemText";
import additional from "../static/data/additionalPlayers.json";

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
    background: "#fff",
    color: "#0AA360",
    "&:hover": {
      background: "#d4d4d4",
    },
  },
  formRow: {
    //display: "flex",
    alignItems: "center",
    //marginLeft: "15px",
    padding: 15,
    border: "1px solid #0AA360",
    background: "#fff",
  },
  stripe: {
    padding: 30,
    background: "#0AA360",
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    marginBottom: 20,
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
    entries,
    worldRankings,
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
    selectionFour: "",
    selectionOneId: "",
    selectionTwoId: "",
    selectionThreeId: "",
    selectionFourId: "",
  });
  const [teamTwo, setTeamTwo] = useState({
    selectionOne: "",
    selectionTwo: "",
    selectionThree: "",
    selectionFour: "",
    selectionOneId: "",
    selectionTwoId: "",
    selectionThreeId: "",
    selectionFourId: "",
  });
  const [teamThree, setTeamThree] = useState({
    selectionOne: "",
    selectionTwo: "",
    selectionThree: "",
    selectionFour: "",
    selectionOneId: "",
    selectionTwoId: "",
    selectionThreeId: "",
    selectionFourId: "",
  });

  const stripe = useStripe();
  const element = useElements();

  const { currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    getScoreData();
    getUser(currentUser.email);
    const getData = async () => {
      await getUsers();
    };
    getData();
    // eslint-disable-next-line
  }, [data.length]);
  const wr = worldRankings.results.rankings;
  const compPlayers = entries;

  const playersArray = wr.filter((a) =>
    compPlayers.some((b) => a.player_id === b.player_id)
  );

  additional.map((p) => {
    playersArray.push(p);
  });

  let enableButton;
  if (teamCount === 1) {
    enableButton = !(
      teamOne.selectionOne &&
      teamOne.selectionTwo &&
      teamOne.selectionThree &&
      teamOne.selectionFour
    );
  } else if (teamCount === 2) {
    enableButton = !(
      teamOne.selectionOne &&
      teamOne.selectionTwo &&
      teamOne.selectionThree &&
      teamOne.selectionFour &&
      teamTwo.selectionOne &&
      teamTwo.selectionTwo &&
      teamTwo.selectionThree &&
      teamTwo.selectionFour
    );
  } else {
    enableButton = !(
      teamOne.selectionOne &&
      teamOne.selectionTwo &&
      teamOne.selectionThree &&
      teamOne.selectionFour &&
      teamTwo.selectionOne &&
      teamTwo.selectionTwo &&
      teamTwo.selectionThree &&
      teamTwo.selectionFour &&
      teamThree.selectionOne &&
      teamThree.selectionTwo &&
      teamThree.selectionThree &&
      teamThree.selectionFour
    );
  }

  const handleStripeChange = (e) => {
    if (e.error) {
      return setCheckoutErrorMessage(e.error.message);
    }
    setCheckoutErrorMessage("");
  };

  let amount;
  if (teamCount === 1) {
    amount = 500;
  } else if (teamCount === 2) {
    amount = 1000;
  } else {
    amount = 1250;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsProcessing(true);
    const cardElement = element.getElement("card");

    const custInfo = {
      name: loggedInUser ? loggedInUser.name : "unkown",
      email: loggedInUser ? loggedInUser.email : currentUser.email,
    };
    try {
      const paymentIntent = await axios.post(
        "https://stormy-hamlet-50511.herokuapp.com/payment",
        {
          amount: amount,
        }
      );

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
      console.log(err.message);
    }

    try {
      if (
        teamOne.selectionOne.length > 0 &&
        teamOne.selectionTwo.length > 0 &&
        teamOne.selectionThree.length > 0 &&
        teamOne.selectionFour.length > 0
      ) {
        addSelections(
          currentUser.email,
          teamOne.selectionOne,
          teamOne.selectionOneId,
          teamOne.selectionTwo,
          teamOne.selectionTwoId,
          teamOne.selectionThree,
          teamOne.selectionThreeId,
          teamOne.selectionFour,
          teamOne.selectionFourId
        );
      }
      if (
        teamTwo.selectionTwo.length > 0 &&
        teamTwo.selectionTwo.length > 0 &&
        teamTwo.selectionThree.length > 0 &&
        teamTwo.selectionFour.length > 0
      ) {
        addSelections(
          currentUser.email,
          teamTwo.selectionOne,
          teamTwo.selectionOneId,
          teamTwo.selectionTwo,
          teamTwo.selectionTwoId,
          teamTwo.selectionThree,
          teamTwo.selectionThreeId,
          teamTwo.selectionFour,
          teamTwo.selectionFourId
        );
      }
      if (
        teamThree.selectionThree.length > 0 &&
        teamThree.selectionTwo.length > 0 &&
        teamThree.selectionThree.length > 0 &&
        teamThree.selectionFour.length > 0
      ) {
        addSelections(
          currentUser.email,
          teamThree.selectionOne,
          teamThree.selectionOneId,
          teamThree.selectionTwo,
          teamThree.selectionTwoId,
          teamThree.selectionThree,
          teamThree.selectionThreeId,
          teamThree.selectionFour,
          teamThree.selectionFourId
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
        color: "#111",
        background: "#0ba360",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        padding: 50,
        border: "10px",
        "::placeholder": {
          color: "#000",
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
            data={playersArray}
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
              data={playersArray}
              handleChange={handleChangeTeamOne}
            ></TeamForm>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TeamForm
              selections={teamTwo}
              teamCount={teamCount}
              setTeamCount={setTeamCount}
              setSelections={setTeamTwo}
              data={playersArray}
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
              data={playersArray}
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
              data={playersArray}
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
              data={playersArray}
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
            <GolfCourseIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Team
          </Typography>

          <Grid item xs={12}>
            <div className={classes.demo}>
              <List dense>
                <ListItem style={{ fontSize: "2em" }}>
                  <ListItemAvatar style={{ color: "#0ea463" }}>
                    <Avatar style={{ background: "#0ea463" }}>
                      <GroupAddIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body1">
                        4 Golfer's per entry. Selections are restricted by World
                        Rankings. Full entry details{" "}
                        <Link to="/about">here</Link>.
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.demo}>
              <List dense>
                <ListItem style={{ fontSize: "2em" }}>
                  <ListItemAvatar style={{ color: "#0ea463" }}>
                    <Avatar style={{ background: "#0ea463" }}>
                      <EuroIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body1">
                        €5 per entry / €12.50 for 3 entries
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </div>
          </Grid>

          {error && <Alert severity="error">{error}</Alert>}

          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {displayTeams()}
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
                <p>{checkoutErrorMessage}</p>
              </Grid>
              <Grid item xs={12} style={{ marginTop: 5, marginBottom: 20 }}>
                <Alert
                  icon={<CreditCardIcon></CreditCardIcon>}
                  severity="success"
                >
                  <AlertTitle>
                    <b> Total Cost €{(amount / 100).toFixed(2)}</b>
                  </AlertTitle>
                </Alert>
              </Grid>
            </Grid>
            <Grid container className={classes.stripe}>
              <Grid item xs={12}>
                <div className={classes.formRow}>
                  <CardElement
                    id="card-element"
                    options={cardStyle}
                    onChange={handleStripeChange}
                  />
                </div>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isProcessing || enableButton}
                className={classes.submit}
              >
                {!isProcessing
                  ? `Pay €${(amount / 100).toFixed(2)}`
                  : "Processing"}
              </Button>
              <Grid item xs={12}>
                <Typography
                  align="right"
                  style={{ color: "#a5d9c2", fontSize: "0.7rem" }}
                >
                  Powered by Stripe
                </Typography>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};
export default AddTeam;
