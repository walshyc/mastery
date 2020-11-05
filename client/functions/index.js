const functions = require("firebase-functions");
const express = require("express");
const Stripe = require("stripe");
const keys = require("./config/dev");
const cors = require("cors");

const stripe = new Stripe(keys.stripeSecret);
const app = express();

app.use(express.json());
app.use(cors());

app.post("/payment", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
    });

    res.status(200).send(paymentIntent.client_secret);
  } catch (error) {
    res.json({ message: error.message });
    console.log("error");
  }
});

app.get('/time', (req, res) => {
  res.send(`${Date.now()}`)
})
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app);

