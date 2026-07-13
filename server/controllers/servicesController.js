const services = require("../models/services");

const servicesController = async (req, res) => {
  try {
    const servicesAvailable = await services.find({serviceName:'Frontend Development'});
    console.log(servicesAvailable[0].serviceDescription);
  } catch {
    console.log("ERR");
  }
};

module.exports = servicesController;
