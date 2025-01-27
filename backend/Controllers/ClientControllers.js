const Qexecution = require("./query");

exports.getProjectsByClientID = async (req, res) => {
    const SQL = `
        SELECT 
            projectID, 
            name, 
            description, 
            cost, 
            type, 
            schedule, 
            status
        FROM 
            project
        WHERE 
            clientID = ?
        ORDER BY 
            status ASC
    `;

    try {
        const { clientID } = req.params; // Get clientID from request params

        // Execute the query
        const projects = await Qexecution.queryExecute(SQL, [clientID]);

        // Separate projects based on status
        const newProjects = projects.filter(project => project.status === 'new');
        const inProcessProjects = projects.filter(project => project.status === 'in process');
        const completedProjects = projects.filter(project => project.status === 'completed');

        // Success response with categorized project details
        res.status(200).send({
            status: "success",
            message: "Projects fetched successfully",
            data: {
                new: newProjects,
                inProcess: inProcessProjects,
                completed: completedProjects
            }
        });
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error fetching projects",
            error: err.message,
        });
    }
};

exports.getSprintsByProjectID = async (req, res) => {
    const SQL = `
        SELECT 
            sprintDetails, 
            cost, 
            type, 
            schedule
        FROM 
            sprint
        WHERE 
            projectID = ?
    `;

    try {
        const { projectID } = req.params; // Get projectID from request params

        // Execute the query
        const sprints = await Qexecution.queryExecute(SQL, [projectID]);

        // Success response with sprint details
        res.status(200).send({
            status: "success",
            message: "Sprints fetched successfully",
            data: sprints
        });
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error fetching sprints",
            error: err.message,
        });
    }
};

exports.getScopeFileBySprintID = async (req, res) => {
    const SQL = `
        SELECT 
            scopeFile
        FROM 
            sprint
        WHERE 
            sprintID = ?
    `;

    try {
        const { sprintID } = req.params; // Get sprintID from request params

        // Execute the query
        const scopeFile = await Qexecution.queryExecute(SQL, [sprintID]);

        // Success response with scope file details
        res.status(200).send({
            status: "success",
            message: "Scope file fetched successfully",
            data: scopeFile[0]
        });
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error fetching scope file",
            error: err.message,
        });
    }
};

exports.insertScopeFile = async (req, res) => {
    const SQL = `
        UPDATE sprint
        SET scopeFile = ?
        WHERE sprintID = ?
    `;

    try {
        const { sprintID } = req.params;
        const { scopeFile } = req.body;

        // Execute the query
        await Qexecution.queryExecute(SQL, [scopeFile, sprintID]);

        // Success response
        res.status(200).send({
            status: "success",
            message: "Scope file updated successfully"
        });
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error updating scope file",
            error: err.message,
        });
    }
};