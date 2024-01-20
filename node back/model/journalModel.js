const mongoose = require("mongoose");

const journalSchema = mongoose.Schema({
  amount: {
    type: Number,
    required: [true, "Amount is required"],
  },
  type: { type: String, enum: ["Debit Cash", "Credit Revenue", "Credit Payable", ""], default: "" },
  shipment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shipment",
    required: [true, "Shipment id is required"],
  },
});

const journalModel = mongoose.model("journal", journalSchema);
module.exports = journalModel;
