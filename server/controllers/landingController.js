const services = require("../models/services");

const landingController = async (req, res) => {
  try {
    const allService = await services.find();
    console.log(allService);
    res.status(200).json({ allService });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = landingController;
