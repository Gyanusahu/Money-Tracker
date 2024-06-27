const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Transaction = require("./models/Transaction");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json("test ok1");
});

app.post("/api/transaction", async (req, res) => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const { price, name, description, datetime } = req.body;

    // Validate the fields
    if (!price || !name || !description || !datetime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create the transaction
    const transaction = await Transaction.create({
      price,
      name,
      description,
      datetime,
    });

    // Respond with the created transaction
    res.json(transaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    mongoose.connection.close(); // Ensure the connection is closed
  }
});

app.get("/api/transactions", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const transactions = await Transaction.find();
  res.json(transactions);
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
