const Qexecution = require("./query");

exports.getProjectsByPmID = async (req, res) => {
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
            pmID = ?
        ORDER BY 
            status ASC
    `;

    try {
        const { pmID } = req.params; // Get clientID from request params

        // Execute the query
        const projects = await Qexecution.queryExecute(SQL, [pmID]);

        // Separate projects based on status
        const newProjects = projects.filter(project => project.status === 'new');
        const inProcessProjects = projects.filter(project => project.status === 'in process');
        const completedProjects = projects.filter(project => project.status === 'completed');

        // Success response with categorized project details
        res.status(200).send({
            status: "success",
            message: "Projects fetched successfully",
            data: {
                new: {
                    projects: newProjects,
                    total_count: newProjects.length
                },
                inProcess: {
                    projects: inProcessProjects,
                    total_count: inProcessProjects.length
                },
                completed: {
                    projects: completedProjects,
                    total_count: completedProjects.length
                }
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
