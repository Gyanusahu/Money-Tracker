const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Define the Transaction schema
const TransactionSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  datetime: { type: Date, required: true },
});

// Define and export the Transaction model
const TransactionModel = model("Transaction", TransactionSchema);
module.exports = TransactionModel;
