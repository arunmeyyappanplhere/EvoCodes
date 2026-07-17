const testimonials = require("../models/testimonials");

const testimonialsController = async (req, res) => {
  try {
    const testimonoilsAvailable = await testimonials.find();
    if (testimonoilsAvailable.length == 0) {
      res.status(400).json({ message: "No testimonials found" });
    } else {
      res.status(200).json(testimonialsAvailable);
    }
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = testimonialsController;
