const mongoose = require("mongoose");

const serviceModel = new mongoose.Schema({
  serviceID: {
    type: String,
    required: true,
  },
  serviceName: {
    type: String,
    required: true,
  },
  serviceHead: {
    type: String,
    required: true,
  },
  serviceDescription: {
    type: String,
    required: true,
  },
  serviceIcon: {
    type: String,
    required: true,
  },
  serviceTechStacks: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("services", serviceModel);
