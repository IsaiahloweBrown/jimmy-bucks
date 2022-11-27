const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  style: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  completedBy: {
    type: String
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
