const mongoose = require("mongoose");

const testimonialModel = new mongoose.Schema({
    testimonialName : {
        type : String,
        require : true
    },
    testimonialRole : {
        type : String,
        require : true
    },
    testimonialQuote : {
        type : String,
        require : true,
    },
    testimonialRating : {
        type : String,
        require : true
    },
});

module.exports = mongoose.model("testimonials" , testimonialModel);