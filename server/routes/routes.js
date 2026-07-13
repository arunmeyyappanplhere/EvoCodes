const express = require("express");
const contactController = require("../controllers/contactController");
const route = express.Router();

route.post("/contact", contactController);

module.exports = route;
