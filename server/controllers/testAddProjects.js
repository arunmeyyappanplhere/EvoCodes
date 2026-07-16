const projects = require("../models/projects");
const testAddProjects = async(req,res) =>{
    const {
        projectID,
        projectName,
        projectCoverImg,
        projectDesc,
        projectSectors,
        projectSiteLink,
    } = req.body;
    const newProject = new projects({
        projectID,
        projectName,
        projectCoverImg,
        projectDesc,
        projectSectors,
        projectSiteLink,
    });
    await newProject.save()
    res.status(201).json(newProject);
};
module.exports = testAddProjects;