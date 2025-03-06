const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Function to generate a random number between min and max (inclusive)
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to generate a random flight time (HH:MM format)
const getRandomTime = () => {
  const hours = getRandomNumber(0, 23).toString().padStart(2, "0");
  const minutes = getRandomNumber(0, 59).toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

app.post("/book-flight", (req, res) => {
  try {
    const { from, to, date, adult, children, flightClass } = req.body;

    // Ensure adult & children are numbers
    const numAdults = parseInt(adult) || 0;
    const numChildren = parseInt(children) || 0;

    const passenger = numAdults + numChildren; // Corrected passenger calculation

    const flightPricing = {
      vistara: {
        price: passenger * getRandomNumber(9000, 10000),
        time: getRandomTime(),
      },
      AirIndia: {
        price: passenger * getRandomNumber(6000, 7000),
        time: getRandomTime(),
      },
      Indigo: {
        price: passenger * getRandomNumber(7000, 8000),
        time: getRandomTime(),
      },
      SpiceJet: {
        price: passenger * getRandomNumber(8000, 9000),
        time: getRandomTime(),
      },
    };

    res.status(200).json({ flightPricing });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Unable to process request" });
  }
});

app.listen(5300, () => {
  console.log(`Server running on http://localhost:5300`);
});
