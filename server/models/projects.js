const mongoose = require("mongoose");

const projectModel = new mongoose.Schema({
    projectID : {
        type : String,
        require : true
    },
    projectName : {
        type : String,
        require : true
    },
    projectCoverImg : {
        type : String,
        require : true,
    },
    projectDesc : {
        type : String,
        require : true
    },
    projectSectors : {
        type : Array,
        require : true
    },
    projectSiteLink : {
        type : String,
        require : true
    },
});

module.exports = mongoose.model("projects" , projectModel);