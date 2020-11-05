const express = require("express");
const Stripe = require('stripe')
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
    console.log('error')
  }
});

app.listen(5000, () => console.log("Now listening on Port 5000!"));
