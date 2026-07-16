// to be deleted

const services = require("../models/services");
const testAddServices = async (req, res) => {
  const {
    serviceID,
    serviceName,
    serviceHead,
    serviceDescription,
    serviceIcon,
  } = req.body;
  const newService = new services({
    serviceID,
    serviceName,
    serviceHead,
    serviceDescription,
    serviceIcon,
  });
  await newService.save();
  res.status(201).json(newService);
};

module.exports = testAddServices;
