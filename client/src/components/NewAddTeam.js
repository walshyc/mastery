import React, { useState, useContext, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAuth } from '../context/AuthContext';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { GlobalContext } from '../context/GlobalState';
import GolfCourseIcon from '@material-ui/icons/GolfCourse';
import { Link } from 'react-router-dom';
import Spinner from './layout/Spinner';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import TeamForm from './TeamForm';
import NewTeamForm from './NewTeamForm';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import EuroIcon from '@material-ui/icons/Euro';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ListItemText from '@material-ui/core/ListItemText';
import additional from '../static/data/additionalPlayers.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    background: '#fff',
    color: '#0AA360',
    '&:hover': {
      background: '#d4d4d4',
    },
  },
  formRow: {
    //display: "flex",
    alignItems: 'center',
    //marginLeft: "15px",
    padding: 15,
    border: '1px solid #0AA360',
    background: '#fff',
  },
  stripe: {
    padding: 30,
    background: '#0AA360',
    boxShadow:
      '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    marginBottom: 20,
  },
}));

const AddNewTeam = () => {
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

  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutErrorMessage, setCheckoutErrorMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  //const [entryName, setEntryName] = useState('');
  const [email, setEmail] = useState('');
  const [teamCount, setTeamCount] = useState(1);
  const [teamOne, setTeamOne] = useState({
    entryName: '',
    selections: [
      { selection: '', id: '', no: 'selectionOne' },
      { selection: '', id: '', no: 'selectionTwo' },
      { selection: '', id: '', no: 'selectionThree' },
      { selection: '', id: '', no: 'selectionFour' },
      { selection: '', id: '', no: 'selectionFive' },
      { selection: '', id: '', no: 'selectionSix' },
    ],
    selectionOne: '',
    selectionTwo: '',
    selectionThree: '',
    selectionFour: '',
    selectionOneId: '',
    selectionTwoId: '',
    selectionThreeId: '',
    selectionFourId: '',
  });
  const [teamTwo, setTeamTwo] = useState({
    entryName: '',
    selections: [
      { selection: '', id: '', no: 'selectionOne' },
      { selection: '', id: '', no: 'selectionTwo' },
      { selection: '', id: '', no: 'selectionThree' },
      { selection: '', id: '', no: 'selectionFour' },
      { selection: '', id: '', no: 'selectionFive' },
      { selection: '', id: '', no: 'selectionSix' },
    ],
    selectionOne: '',
    selectionTwo: '',
    selectionThree: '',
    selectionFour: '',
    selectionOneId: '',
    selectionTwoId: '',
    selectionThreeId: '',
    selectionFourId: '',
  });
  const [teamThree, setTeamThree] = useState({
    entryName: '',
    selections: [
      { selection: '', id: '', no: 'selectionOne' },
      { selection: '', id: '', no: 'selectionTwo' },
      { selection: '', id: '', no: 'selectionThree' },
      { selection: '', id: '', no: 'selectionFour' },
      { selection: '', id: '', no: 'selectionFive' },
      { selection: '', id: '', no: 'selectionSix' },
    ],
    selectionOne: '',
    selectionTwo: '',
    selectionThree: '',
    selectionFour: '',
    selectionOneId: '',
    selectionTwoId: '',
    selectionThreeId: '',
    selectionFourId: '',
  });

  const stripe = useStripe();
  const element = useElements();

  const { currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    getScoreData();
    //getUser(currentUser.email);
    const getData = async () => {
      await getUsers();
    };
    getData();
    // eslint-disable-next-line
  }, [data.length]);

  let enableButton;
  if (teamCount === 1) {
    enableButton = !(
      teamOne.selections[0].id.length > 0 &&
      teamOne.selections[1].id.length > 0 &&
      teamOne.selections[2].id.length > 0 &&
      teamOne.selections[3].id.length > 0 &&
      teamOne.selections[4].id.length > 0 &&
      teamOne.selections[5].id.length > 0
    );
  } else if (teamCount === 2) {
    enableButton = !(
      teamOne.selections[0].id.length > 0 &&
      teamOne.selections[1].id.length > 0 &&
      teamOne.selections[2].id.length > 0 &&
      teamOne.selections[3].id.length > 0 &&
      teamOne.selections[4].id.length > 0 &&
      teamOne.selections[5].id.length > 0 &&
      teamTwo.selections[0].id.length > 0 &&
      teamTwo.selections[1].id.length > 0 &&
      teamTwo.selections[2].id.length > 0 &&
      teamTwo.selections[3].id.length > 0 &&
      teamTwo.selections[4].id.length > 0 &&
      teamTwo.selections[5].id.length > 0
    );
  } else {
    enableButton = !(
      teamOne.selections[0].id.length > 0 &&
      teamOne.selections[1].id.length > 0 &&
      teamOne.selections[2].id.length > 0 &&
      teamOne.selections[3].id.length > 0 &&
      teamOne.selections[4].id.length > 0 &&
      teamOne.selections[5].id.length > 0 &&
      teamTwo.selections[0].id.length > 0 &&
      teamTwo.selections[1].id.length > 0 &&
      teamTwo.selections[2].id.length > 0 &&
      teamTwo.selections[3].id.length > 0 &&
      teamTwo.selections[4].id.length > 0 &&
      teamTwo.selections[5].id.length > 0 &&
      teamThree.selections[0].id.length > 0 &&
      teamThree.selections[1].id.length > 0 &&
      teamThree.selections[2].id.length > 0 &&
      teamThree.selections[3].id.length > 0 &&
      teamThree.selections[4].id.length > 0 &&
      teamThree.selections[5].id.length > 0
    );
  }

  const handleStripeChange = (e) => {
    if (e.error) {
      return setCheckoutErrorMessage(e.error.message);
    }
    setCheckoutErrorMessage('');
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
    const name = `${firstName} ${lastName}`;

    setIsProcessing(true);
    const cardElement = element.getElement('card');

    const custInfo = {
      name,
      email,
    };
    try {
      const paymentIntent = await axios.post(
        //'https://stormy-hamlet-50511.herokuapp.com/payment',
        'http://localhost:5000/payment',
        {
          amount: amount,
        }
      );

      // Create payment method object
      const paymentMethodObj = await stripe.createPaymentMethod({
        type: 'card',
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
      console.log(confirmPayment);

      if (confirmPayment.error) {
        setCheckoutErrorMessage(confirmPayment.error.message);
        setIsProcessing(false);
        return;
      }
    } catch (err) {
      setCheckoutErrorMessage(err.message);
      setIsProcessing(false);
      console.log(err);
    }

    try {
      if (
        teamOne.selections[0].id.length > 0 &&
        teamOne.selections[1].id.length > 0 &&
        teamOne.selections[2].id.length > 0 &&
        teamOne.selections[3].id.length > 0 &&
        teamOne.selections[4].id.length > 0 &&
        teamOne.selections[5].id.length > 0
      ) {
        addSelections(
          name,
          email,
          teamOne.selections[0].id,
          teamOne.selections[1].id,
          teamOne.selections[2].id,
          teamOne.selections[3].id,
          teamOne.selections[4].id,
          teamOne.selections[5].id,
          teamOne.entryName.length > 0 ? teamOne.entryName : ' '
        );
      }
      if (
        teamTwo.selections[0].id.length > 0 &&
        teamTwo.selections[1].id.length > 0 &&
        teamTwo.selections[2].id.length > 0 &&
        teamTwo.selections[3].id.length > 0 &&
        teamTwo.selections[4].id.length > 0 &&
        teamTwo.selections[5].id.length > 0
      ) {
        addSelections(
          name,
          email,
          teamTwo.selections[0].id,
          teamTwo.selections[1].id,
          teamTwo.selections[2].id,
          teamTwo.selections[3].id,
          teamTwo.selections[4].id,
          teamTwo.selections[5].id,
          teamTwo.entryName.length > 0 ? teamTwo.entryName : ''
        );
      }
      if (
        teamThree.selections[0].id.length > 0 &&
        teamThree.selections[1].id.length > 0 &&
        teamThree.selections[2].id.length > 0 &&
        teamThree.selections[3].id.length > 0 &&
        teamThree.selections[4].id.length > 0 &&
        teamThree.selections[5].id.length > 0
      ) {
        addSelections(
          name,
          email,
          teamThree.selections[0].id,
          teamThree.selections[1].id,
          teamThree.selections[2].id,
          teamThree.selections[3].id,
          teamThree.selections[4].id,
          teamThree.selections[5].id,
          teamThree.entryName.length > 0 ? teamThree.entryName : ''
        );
      }
    } catch (err) {
      setError('Could not add your team');
      console.log(err);
    }
    const getData = async () => {
      //await getUsers().then(getUser(currentUser.email));
      history.push('/');
    };
    getData();
  };

  const handleChangeTeamOne = (event) => {
    if (event.target.id === 'entryName') {
      setTeamOne({
        ...teamOne,
        entryName: event.target.value,
      });
    } else {
      console.log(event);
      const id = event.currentTarget[event.target.selectedIndex].getAttribute(
        'playerid'
      );
      const name = event.currentTarget[event.target.selectedIndex].getAttribute(
        'name'
      );
      const selection = event.currentTarget[
        event.target.selectedIndex
      ].getAttribute('selection');
      const selectionid = event.currentTarget[
        event.target.selectedIndex
      ].getAttribute('selectionid');
      const index = teamOne.selections.findIndex((s) => {
        return s.no === event.target.name;
      });
      let newSel;
      if (index < 0) {
        newSel = [
          ...teamOne.selections,
          { selection: name, id: id, no: event.target.name },
        ];
      } else {
        newSel = [...teamOne.selections];
        newSel[index] = {
          ...newSel[index],
          selection: name,
          id: id,
          no: event.target.name,
        };
      }

      setTeamOne({
        ...teamOne,
        selections: newSel,
      });
    }
  };
  const handleChangeTeamTwo = (event) => {
    if (event.target.id === 'entryName') {
      setTeamTwo({
        ...teamTwo,
        entryName: event.target.value,
      });
    } else {
      const id = event.currentTarget[event.target.selectedIndex].getAttribute(
        'playerid'
      );
      const name = event.currentTarget[event.target.selectedIndex].getAttribute(
        'name'
      );
      const selection = event.currentTarget[
        event.target.selectedIndex
      ].getAttribute('selection');
      const selectionid = event.currentTarget[
        event.target.selectedIndex
      ].getAttribute('selectionid');
      const index = teamTwo.selections.findIndex((s) => {
        return s.no === event.target.name;
      });
      let newSel;
      if (index < 0) {
        newSel = [
          ...teamTwo.selections,
          { selection: name, id: id, no: event.target.name },
        ];
      } else {
        newSel = [...teamTwo.selections];
        newSel[index] = {
          ...newSel[index],
          selection: name,
          id: id,
          no: event.target.name,
        };
      }

      setTeamTwo({
        ...teamTwo,
        selections: newSel,
        [selection]: name,
        [selectionid]: id,
      });
    }
  };
  const handleChangeTeamThree = (event) => {
    if (event.target.id === 'entryName') {
      setTeamThree({
        ...teamThree,
        entryName: event.target.value,
      });
    } else {
      const id = event.currentTarget[event.target.selectedIndex].getAttribute(
        'playerid'
      );
      const name = event.currentTarget[event.target.selectedIndex].getAttribute(
        'name'
      );
      const selection = event.currentTarget[
        event.target.selectedIndex
      ].getAttribute('selection');
      const selectionid = event.currentTarget[
        event.target.selectedIndex
      ].getAttribute('selectionid');
      const index = teamThree.selections.findIndex((s) => {
        return s.no === event.target.name;
      });
      let newSel;
      if (index < 0) {
        newSel = [
          ...teamThree.selections,
          { selection: name, id: id, no: event.target.name },
        ];
      } else {
        newSel = [...teamThree.selections];
        newSel[index] = {
          ...newSel[index],
          selection: name,
          id: id,
          no: event.target.name,
        };
      }

      setTeamThree({
        ...teamThree,
        selections: newSel,
        [selection]: name,
        [selectionid]: id,
      });
    }
  };
  const cardStyle = {
    style: {
      base: {
        color: '#111',
        background: '#0ba360',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        padding: 50,
        border: '10px',
        '::placeholder': {
          color: '#000',
        },
        // width: "100%",
        // height: "100%",
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
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
        <NewTeamForm
          selections={teamOne}
          teamCount={teamCount}
          setTeamCount={setTeamCount}
          setSelections={setTeamOne}
          data={entries}
          number={1}
          handleChange={handleChangeTeamOne}
        ></NewTeamForm>
      );
    } else if (teamCount === 2) {
      return (
        <>
          <NewTeamForm
            selections={teamOne}
            teamCount={teamCount}
            setTeamCount={setTeamCount}
            setSelections={setTeamOne}
            data={entries}
            number={1}
            handleChange={handleChangeTeamOne}
          ></NewTeamForm>

          <NewTeamForm
            selections={teamTwo}
            teamCount={teamCount}
            setTeamCount={setTeamCount}
            setSelections={setTeamTwo}
            data={entries}
            number={2}
            handleChange={handleChangeTeamTwo}
          ></NewTeamForm>
        </>
      );
    } else {
      return (
        <>
          <NewTeamForm
            selections={teamOne}
            teamCount={teamCount}
            setTeamCount={setTeamCount}
            setSelections={setTeamOne}
            data={entries}
            handleChange={handleChangeTeamOne}
            number={1}
          ></NewTeamForm>{' '}
          <NewTeamForm
            selections={teamTwo}
            teamCount={teamCount}
            setTeamCount={setTeamCount}
            setSelections={setTeamTwo}
            data={entries}
            handleChange={handleChangeTeamTwo}
            number={2}
          ></NewTeamForm>{' '}
          <NewTeamForm
            selections={teamThree}
            teamCount={teamCount}
            setTeamCount={setTeamCount}
            setSelections={setTeamThree}
            data={entries}
            handleChange={handleChangeTeamThree}
            number={3}
          ></NewTeamForm>
        </>
      );
    }
  };
  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <div className="bg-green-400 flex container mx-auto ">
        <div className="bg-yellow-800 w-1/3 hidden lg:block"></div>
        <form
          className="w-full lg:w-2/3 bg-green-400 shadow rounded"
          onSubmit={handleSubmit}
        >
          <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5">
            <div className="flex items-center w-11/12 mx-auto">
              <p className="text-lg text-gray-900 dark:text-gray-100 font-bold">
                Enter Here
              </p>
            </div>
          </div>
          <div className="xl:w-full w-full border-b border-gray-300 dark:border-gray-700 py-5">
            <div className="flex items-center w-11/12 mx-auto">
              <div className="xl:flex lg:flex md:flex flex-wrap justify-between w-full">
                <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                  <label
                    htmlFor="FirstName"
                    className="pb-2 text-lg tracking-wider font-bold text-gray-900"
                  >
                    First Name
                  </label>
                  <input
                    onChange={({ target }) => setFirstName(target.value)}
                    type="text"
                    name="firstName"
                    required
                    id="FirstName"
                    className="border-2 bg-white border-gray-300 dark:border-gray-900 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none bg-transparent focus:border-gray-900 text-gray-900 dark:text-gray-100"
                    placeholder
                  />
                </div>
                <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                  <label
                    htmlFor="LastName"
                    className="pb-2 text-lg tracking-wider font-bold text-gray-900"
                  >
                    Last Name
                  </label>
                  <input
                    onChange={({ target }) => setLastName(target.value)}
                    type="text"
                    name="firstName"
                    required
                    id="FirstName"
                    className="border-2 bg-white border-gray-300 dark:border-gray-900 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none bg-transparent focus:border-gray-900 text-gray-900 dark:text-gray-100"
                    placeholder
                  />
                </div>
                <div className="md:w-full flex flex-col mb-6">
                  <label
                    htmlFor="email"
                    className="pb-2 text-lg tracking-wider font-bold text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    onChange={({ target }) => setEmail(target.value)}
                    type="email"
                    name="email"
                    required
                    id="email"
                    className="border-2 bg-white border-gray-300 dark:border-gray-900 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none bg-transparent focus:border-gray-900 text-gray-900 dark:text-gray-100"
                    placeholder
                  />
                </div>
                <div className=" flex flex-col mb-6 border-2 border-gray-900 md:hidden"></div>
              </div>
            </div>
          </div>
          {displayTeams()}
          {teamCount <= 2 ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                setTeamCount((teamCount) => teamCount + 1);
              }}
              color="default"
              variant="contained"
              className="bg-green-700 transition duration-150 ease-in-out hover:bg-green-600 rounded text-white px-8 py-2 text-sm focus:outline-none"
            >
              Add another Team
            </button>
          ) : (
            ''
          )}
          <p>{checkoutErrorMessage}</p>
          <div className="flex items-center justify-center px-4 lg:px-0 py-12">
            <div
              id="alert"
              className={
                'transition duration-150 ease-in-out lg:w-11/12 mx-auto py-3 px-4  dark:bg-gray-800 bg-white md:flex items-center justify-between shadow rounded'
              }
            >
              <div className="sm:flex sm:items-start lg:items-center">
                <div className="flex items-end">
                  <div className="mr-2 text-green-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={20}
                      height={20}
                      fill="currentColor"
                    >
                      <path
                        className="heroicon-ui"
                        d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"
                      />
                    </svg>
                  </div>
                  <p className="mr-2 text-sm lg:text-base font-bold text-gray-800 dark:text-gray-100">
                    Success
                  </p>
                </div>
                <div className="h-1 w-1 bg-gray-300 dark:bg-gray-700 rounded-full mr-2 hidden xl:block" />
                <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 pt-2 sm:pt-0 pb-2 sm:pb-0">
                  <b> Total Cost €{(amount / 100).toFixed(2)}</b>{' '}
                </p>
              </div>
              <div className="flex items-center justify-end sm:mt-4 md:mt-0 ml-4 md:pl-4 lg:pl-0">
                <button className="focus:outline-none mr-8 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-2 text-xs">
                  View
                </button>
              </div>
            </div>
          </div>

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
                : 'Processing'}
            </Button>
            <Grid item xs={12}>
              <Typography
                align="right"
                style={{ color: '#a5d9c2', fontSize: '0.7rem' }}
              >
                Powered by Stripe
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};
export default AddNewTeam;
