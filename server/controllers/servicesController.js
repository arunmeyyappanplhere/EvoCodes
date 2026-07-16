const services = require("../models/services");

const servicesController = async (req, res) => {
  try {
    const servicesAvailable = await services.find();
    if (servicesAvailable.length == 0) {
      res.status(400).json({ message: "No services found" });
    } else {
      res.status(200).json(servicesAvailable);
    }
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = servicesController;
