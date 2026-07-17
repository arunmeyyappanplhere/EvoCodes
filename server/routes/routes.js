const express = require("express");
const contactController = require("../controllers/contactController");
const landingController = require("../controllers/landingController");
const servicesController = require("../controllers/servicesController");
const testAddServices = require("../controllers/testAddServices");
const projectsController = require("../controllers/projectsController");
const testimonialsController = require("../controllers/testimonialsController");
const route = express.Router();

route.post("/contact", contactController);
route.get("/", landingController);
route.get("/services", servicesController);
route.get("/projects", projectsController);
route.get("/testimonoals", testimonialsController);

// route.post("/AddTest", testAddServices);


module.exports = route;
