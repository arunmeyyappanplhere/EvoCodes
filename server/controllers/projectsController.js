const projects = require("../models/projects");

const projectsController = async(req,res) =>{
    try{
       const projectsAvailable = await projects.find();
       if (projectsAvailable.length == 0){
        res.status(400).json({ message : "No Projects Found !!"});
       }
       else{
        res.status(200).json(projectsAvailable);
       }
    } catch {
        res.status(500).json({ error : "Internal Server Error"});
    }
};

module.exports = projectsController;