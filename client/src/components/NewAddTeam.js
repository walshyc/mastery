import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { GlobalContext } from '../context/GlobalState';
import Spinner from './layout/Spinner';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import NewTeamForm from './NewTeamForm';

const useStyles = makeStyles((theme) => ({
  formRow: {
    //display: "flex",
    alignItems: 'center',
    //marginLeft: "15px",
    padding: 15,
    border: '1px solid #0AA360',
    background: '#fff',
  },
  stripe: {
    padding: '1rem',
    background: '#064e3b',
    marginBottom: 20,
    width: '100%',
  },
}));

const AddNewTeam = () => {
  const { addSelections, loading, entries } = useContext(GlobalContext);
  const classes = useStyles();

  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutErrorMessage, setCheckoutErrorMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
  });

  const stripe = useStripe();
  const element = useElements();

  const history = useHistory();

  // useEffect(() => {
  //   getScoreData();
  //   const getData = async () => {
  //     await getUsers();
  //   };
  //   getData();
  //   // eslint-disable-next-line
  // }, [data.length]);

  let enableButton;
  if (teamCount === 1) {
    enableButton = !(
      teamOne.selections[0].id.length > 0 &&
      teamOne.selections[1].id.length > 0 &&
      teamOne.selections[2].id.length > 0 &&
      teamOne.selections[3].id.length > 0 &&
      teamOne.selections[4].id.length > 0 &&
      teamOne.selections[5].id.length > 0 &&
      teamOne.entryName.length > 0
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
      teamTwo.selections[5].id.length > 0 &&
      teamOne.entryName.length > 0 &&
      teamTwo.entryName.length > 0
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
      teamThree.selections[5].id.length > 0 &&
      teamOne.entryName.length > 0 &&
      teamTwo.entryName.length > 0 &&
      teamThree.entryName.length > 0
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
        'https://stormy-hamlet-50511.herokuapp.com/payment',
        //'http://localhost:5000/payment',
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
    console.log(name);

    try {
      if (
        teamOne.selections[0].id.length > 0 &&
        teamOne.selections[1].id.length > 0 &&
        teamOne.selections[2].id.length > 0 &&
        teamOne.selections[3].id.length > 0 &&
        teamOne.selections[4].id.length > 0 &&
        teamOne.selections[5].id.length > 0 &&
        teamOne.entryName.length > 0
      ) {
        await addSelections(
          name,
          email,
          teamOne.selections[0].id,
          teamOne.selections[1].id,
          teamOne.selections[2].id,
          teamOne.selections[3].id,
          teamOne.selections[4].id,
          teamOne.selections[5].id,
          teamOne.entryName
        );
      }
      if (
        teamTwo.selections[0].id.length > 0 &&
        teamTwo.selections[1].id.length > 0 &&
        teamTwo.selections[2].id.length > 0 &&
        teamTwo.selections[3].id.length > 0 &&
        teamTwo.selections[4].id.length > 0 &&
        teamTwo.selections[5].id.length > 0 &&
        teamTwo.entryName.length > 0
      ) {
        await addSelections(
          name,
          email,
          teamTwo.selections[0].id,
          teamTwo.selections[1].id,
          teamTwo.selections[2].id,
          teamTwo.selections[3].id,
          teamTwo.selections[4].id,
          teamTwo.selections[5].id,
          teamTwo.entryName
        );
      }
      if (
        teamThree.selections[0].id.length > 0 &&
        teamThree.selections[1].id.length > 0 &&
        teamThree.selections[2].id.length > 0 &&
        teamThree.selections[3].id.length > 0 &&
        teamThree.selections[4].id.length > 0 &&
        teamThree.selections[5].id.length > 0 &&
        teamThree.entryName.length > 0
      ) {
        await addSelections(
          name,
          email,
          teamThree.selections[0].id,
          teamThree.selections[1].id,
          teamThree.selections[2].id,
          teamThree.selections[3].id,
          teamThree.selections[4].id,
          teamThree.selections[5].id,
          teamThree.entryName
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
      const id = event.currentTarget[event.target.selectedIndex].getAttribute(
        'playerid'
      );
      const name = event.currentTarget[event.target.selectedIndex].getAttribute(
        'name'
      );
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
      <div className="bg-green-900">
        <div className=" bg-gray-900 px-4 xl:px-0 py-4 lg:pt-0">
          <div className="mx-auto container">
            <div className="mb-4 lg:mb-20">
              <h1 className="text-center text-2xl lg:text-5xl font-bold text-gray-200 tracking-1px">
                Choose your Golfers
              </h1>
            </div>
            <div className="flex flex-wrap justify-center">
              <div className="flex flex-col items-center w-full sm:w-5/12 lg:w-3/12 m-4 bg-white rounded-3xl text-green-800 shadow-md py-6 px-12">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="flag-usa"
                  class="svg-inline--fa fa-flag-usa fa-w-16 w-16 h-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M32 0C14.3 0 0 14.3 0 32v464c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V32C64 14.3 49.7 0 32 0zm267.9 303.6c-57.2-15.1-111.7-28.8-203.9 11.1V384c185.7-92.2 221.7 53.3 397.5-23.1 11.4-5 18.5-16.5 18.5-28.8v-36c-43.6 17.3-80.2 24.1-112.1 24.1-37.4-.1-68.9-8.4-100-16.6zm0-96c-57.2-15.1-111.7-28.8-203.9 11.1v61.5c94.8-37.6 154.6-22.7 212.1-7.6 57.2 15.1 111.7 28.8 203.9-11.1V200c-43.6 17.3-80.2 24.1-112.1 24.1-37.4 0-68.9-8.3-100-16.5zm9.5-125.9c51.8 15.6 97.4 29 202.6-20.1V30.8c0-25.1-26.8-38.1-49.4-26.6C291.3 91.5 305.4-62.2 96 32.4v151.9c94.8-37.5 154.6-22.7 212.1-7.6 57.2 15 111.7 28.7 203.9-11.1V96.7c-53.6 23.5-93.3 31.4-126.1 31.4s-59-7.8-85.7-15.9c-4-1.2-8.1-2.4-12.1-3.5V75.5c7.2 2 14.3 4.1 21.3 6.2zM160 128.1c-8.8 0-16-7.1-16-16 0-8.8 7.2-16 16-16s16 7.1 16 16-7.2 16-16 16zm0-55.8c-8.8 0-16-7.1-16-16 0-8.8 7.2-16 16-16s16 7.1 16 16c0 8.8-7.2 16-16 16zm64 47.9c-8.8 0-16-7.1-16-16 0-8.8 7.2-16 16-16s16 7.1 16 16c0 8.8-7.2 16-16 16zm0-55.9c-8.8 0-16-7.1-16-16 0-8.8 7.2-16 16-16s16 7.1 16 16c0 8.8-7.2 16-16 16z"
                  ></path>
                </svg>
                <div className="pt-5">
                  <h1 className="text-xl font-semibold tracking-wider text-gray-900">
                    Choose 2 USA
                  </h1>
                </div>
              </div>
              <div className="flex flex-col items-center w-full sm:w-5/12 lg:w-3/12 m-4 bg-white  text-green-800 rounded-3xl shadow-md py-6 px-12">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="globe-europe"
                  class="svg-inline--fa fa-globe-europe fa-w-16 w-16 h-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                >
                  <path
                    fill="currentColor"
                    d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm200 248c0 22.5-3.9 44.2-10.8 64.4h-20.3c-4.3 0-8.4-1.7-11.4-4.8l-32-32.6c-4.5-4.6-4.5-12.1.1-16.7l12.5-12.5v-8.7c0-3-1.2-5.9-3.3-8l-9.4-9.4c-2.1-2.1-5-3.3-8-3.3h-16c-6.2 0-11.3-5.1-11.3-11.3 0-3 1.2-5.9 3.3-8l9.4-9.4c2.1-2.1 5-3.3 8-3.3h32c6.2 0 11.3-5.1 11.3-11.3v-9.4c0-6.2-5.1-11.3-11.3-11.3h-36.7c-8.8 0-16 7.2-16 16v4.5c0 6.9-4.4 13-10.9 15.2l-31.6 10.5c-3.3 1.1-5.5 4.1-5.5 7.6v2.2c0 4.4-3.6 8-8 8h-16c-4.4 0-8-3.6-8-8s-3.6-8-8-8H247c-3 0-5.8 1.7-7.2 4.4l-9.4 18.7c-2.7 5.4-8.2 8.8-14.3 8.8H194c-8.8 0-16-7.2-16-16V199c0-4.2 1.7-8.3 4.7-11.3l20.1-20.1c4.6-4.6 7.2-10.9 7.2-17.5 0-3.4 2.2-6.5 5.5-7.6l40-13.3c1.7-.6 3.2-1.5 4.4-2.7l26.8-26.8c2.1-2.1 3.3-5 3.3-8 0-6.2-5.1-11.3-11.3-11.3H258l-16 16v8c0 4.4-3.6 8-8 8h-16c-4.4 0-8-3.6-8-8v-20c0-2.5 1.2-4.9 3.2-6.4l28.9-21.7c1.9-.1 3.8-.3 5.7-.3C358.3 56 448 145.7 448 256zM130.1 149.1c0-3 1.2-5.9 3.3-8l25.4-25.4c2.1-2.1 5-3.3 8-3.3 6.2 0 11.3 5.1 11.3 11.3v16c0 3-1.2 5.9-3.3 8l-9.4 9.4c-2.1 2.1-5 3.3-8 3.3h-16c-6.2 0-11.3-5.1-11.3-11.3zm128 306.4v-7.1c0-8.8-7.2-16-16-16h-20.2c-10.8 0-26.7-5.3-35.4-11.8l-22.2-16.7c-11.5-8.6-18.2-22.1-18.2-36.4v-23.9c0-16 8.4-30.8 22.1-39l42.9-25.7c7.1-4.2 15.2-6.5 23.4-6.5h31.2c10.9 0 21.4 3.9 29.6 10.9l43.2 37.1h18.3c8.5 0 16.6 3.4 22.6 9.4l17.3 17.3c3.4 3.4 8.1 5.3 12.9 5.3H423c-32.4 58.9-93.8 99.5-164.9 103.1z"
                  ></path>
                </svg>
                <div className="pt-5">
                  <h1 className="text-xl font-semibold tracking-wider text-gray-900">
                    Choose 2 European's
                  </h1>
                </div>
              </div>
              <div className="flex flex-col items-center w-full sm:w-5/12 lg:w-3/12 m-4 bg-white  text-green-800 rounded-3xl shadow-md py-6 px-12">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="globe"
                  class="svg-inline--fa fa-globe fa-w-16 h-16 w-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                >
                  <path
                    fill="currentColor"
                    d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"
                  ></path>
                </svg>
                <div className="pt-5">
                  <h1 className="text-xl font-semibold tracking-wider text-gray-900">
                    Choose 2 from the Rest!
                  </h1>
                </div>
              </div>
              <div className="flex flex-col items-center w-full sm:w-5/12 lg:w-3/12 m-4 bg-white  text-green-800 rounded-3xl shadow-md py-6 px-12">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="euro-sign"
                  class="svg-inline--fa fa-euro-sign fa-w-10 w-16 h-16"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path
                    fill="currentColor"
                    d="M310.706 413.765c-1.314-6.63-7.835-10.872-14.424-9.369-10.692 2.439-27.422 5.413-45.426 5.413-56.763 0-101.929-34.79-121.461-85.449h113.689a12 12 0 0 0 11.708-9.369l6.373-28.36c1.686-7.502-4.019-14.631-11.708-14.631H115.22c-1.21-14.328-1.414-28.287.137-42.245H261.95a12 12 0 0 0 11.723-9.434l6.512-29.755c1.638-7.484-4.061-14.566-11.723-14.566H130.184c20.633-44.991 62.69-75.03 117.619-75.03 14.486 0 28.564 2.25 37.851 4.145 6.216 1.268 12.347-2.498 14.002-8.623l11.991-44.368c1.822-6.741-2.465-13.616-9.326-14.917C290.217 34.912 270.71 32 249.635 32 152.451 32 74.03 92.252 45.075 176H12c-6.627 0-12 5.373-12 12v29.755c0 6.627 5.373 12 12 12h21.569c-1.009 13.607-1.181 29.287-.181 42.245H12c-6.627 0-12 5.373-12 12v28.36c0 6.627 5.373 12 12 12h30.114C67.139 414.692 145.264 480 249.635 480c26.301 0 48.562-4.544 61.101-7.788 6.167-1.595 10.027-7.708 8.788-13.957l-8.818-44.49z"
                  ></path>
                </svg>
                <div className="pt-5">
                  <h1 className="text-xl font-semibold tracking-wider text-gray-900">
                    €5 per team <br></br> 3 teams for €12.50
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex container mx-auto">
          <form
            className="w-full pt-8 shadow bg-green-900"
            onSubmit={handleSubmit}
          >
            <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5">
              <div className="flex items-center w-11/12 mx-auto">
                <p className="text-lg text-gray-200 dark:text-gray-100 font-bold">
                  Enter Here
                </p>
              </div>
            </div>
            <div className="xl:w-full w-full border-b  border-gray-300 dark:border-gray-700 py-5">
              <div className="flex items-center w-11/12 mx-auto">
                <div className="xl:flex lg:flex md:flex flex-wrap justify-between w-full">
                  <div className="flex flex-col w-full md:w-2/5">
                    <label
                      htmlFor="email"
                      className="text-gray-200 text-left text-sm font-bold leading-tight tracking-normal mb-2"
                    >
                      First Name
                    </label>
                    <input
                      id="email"
                      onChange={({ target }) => setFirstName(target.value)}
                      className="text-gray-900 focus:outline-none focus:border focus:border-green-700 bg-white font-normal  h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
                      placeholder=" Joe"
                    />
                  </div>
                  <div className="flex flex-col w-full mt-2 md:w-2/5 md:mt-0">
                    <label
                      htmlFor="lastName"
                      className="text-gray-200 text-left text-sm font-bold leading-tight tracking-normal mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      onChange={({ target }) => setLastName(target.value)}
                      className="text-gray-900 focus:outline-none focus:border focus:border-green-700 bg-white font-normal   h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
                      placeholder="Bloggs"
                    />
                  </div>
                  <div className="flex flex-col w-full mt-2">
                    <label
                      htmlFor="email"
                      className="text-gray-200 text-left text-sm font-bold leading-tight tracking-normal mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      onChange={({ target }) => setEmail(target.value)}
                      className="text-gray-900 focus:outline-none focus:border focus:border-green-700 bg-white font-normal   h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
                      placeholder="email@email.com"
                    />
                  </div>

                  {/* <div className=" flex flex-col mb-6 border-2 border-gray-900 md:hidden"></div> */}
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
                className="bg-gray-900 transition duration-150 ease-in-out hover:bg-gray-600 rounded font-bold text-white px-8 py-2 w-11/12 text-sm focus:outline-none"
              >
                Add another Team
              </button>
            ) : (
              ''
            )}
            <p>{checkoutErrorMessage}</p>
            <div className="flex items-center justify-center px-4 lg:px-0 py-8">
              <div
                id="alert"
                className="lg:w-11/12 mx-auto py-3 px-4 w-full dark:bg-gray-800 bg-white md:flex items-center justify-between shadow rounded"
              >
                <div className="flex items-end mx-auto">
                  <div className="mr-2 text-green-900  flex ">
                    <svg
                      className="w-6 h-6 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="pl-2 text-lg lg:text-base text-green-900 ">
                      <b> Total Cost €{(amount / 100).toFixed(2)}</b>{' '}
                    </p>
                  </div>
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

              <button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isProcessing || enableButton}
                className="bg-white text-center mt-2 font-bold w-full px-4 py-2 disabled:opacity-50 disabled:text-gray-300 "
              >
                {!isProcessing
                  ? `Pay €${(amount / 100).toFixed(2)}`
                  : 'Processing'}
              </button>
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
      </div>
    </>
  );
};
export default AddNewTeam;
