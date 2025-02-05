const Qexecution = require("./query");

exports.getProjectsByBaID = async (req, res) => {
    const SQL = `
        SELECT 
            projectID, 
            name, 
            description, 
            cost, 
            type, 
            schedule, 
            status,
            baID
        FROM 
            project
        WHERE 
            baID = ? OR baID IS NULL
        ORDER BY 
            status ASC
    `;

    try {
        const { baID } = req.params; // Get baID from request params

        // Execute the query
        const projects = await Qexecution.queryExecute(SQL, [baID]);

        // Separate projects based on status and count them
        const newProjects = projects.filter(project => project.status === 'new' && project.baID !== null);
        const inProcessProjects = projects.filter(project => project.status === 'in process' && project.baID !== null);
        const completedProjects = projects.filter(project => project.status === 'completed' && project.baID !== null);
        const unassignedProjects = projects.filter(project => project.baID === null); // Unassigned projects

        // Success response with categorized project details and counts
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
                },
                unassigned: {
                    projects: unassignedProjects,
                    total_count: unassignedProjects.length
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

exports.assignProjectToBA = async (req, res) => {
    const { baID, projectID } = req.body;

    // Validate input
    if (!baID || !projectID) {
        return res.status(400).send({
            status: "fail",
            message: "baID and projectID are required",
        });
    }

    // SQL query to update the project assignment
    const SQL = `
        UPDATE project 
        SET baID = ?, status = 'new'
        WHERE projectID = ? AND baID IS NULL
    `;

    try {
        // Execute the query
        const result = await Qexecution.queryExecute(SQL, [baID, projectID]);

        // Check if the project was actually assigned
        if (result.affectedRows === 0) {
            return res.status(400).send({
                status: "fail",
                message: "Project is already assigned or does not exist",
            });
        }

        // Success response
        res.status(200).send({
            status: "success",
            message: "Project assigned successfully",
            data: {
                projectID,
                baID,
                status: "new"
            }
        });
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error assigning project",
            error: err.message,
        });
    }
};