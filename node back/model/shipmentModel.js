const mongoose = require("mongoose");

const shipmentSchema = mongoose.Schema({
  code: {
    type: String,
    unique: true,
    required: [true, "Code is required"],
  },
  shipper: {
    type: String,
    required: [true, "Shipper is required"],
  },
  weight: {
    type: Number,
    min: 1,
    required: [true, "Weight is required"],
  },
  shipment_image: {
    type: String,
    default: "http://localhost:5000/images/default-image.jpg",
  },
  status: { type: String, enum: ["progress", "pending", "done"], default: "progress" },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "User id is required"],
  },
  price: { type: Number, default: 0 },
});

const shipmentModel = mongoose.model("shipment", shipmentSchema);
module.exports = shipmentModel;
