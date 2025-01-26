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

