const services = require("../models/services");
const projects = require("../models/projects");

const landingController = async (req, res) => {
  try {
    const allService = await services.find();
    const allProject = await projects.find();
    console.log(allService);
    console.log(allProject);
    res.status(200).json({ allService, allProject });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = landingController;
