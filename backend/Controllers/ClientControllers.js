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

exports.createProjectWithSprint = async (req, res) => {
    // SQL for project insertion
    const projectSQL = `
        INSERT INTO project (
            name, 
            cost, 
            schedule, 
            type, 
            description, 
            clientID,
            status
        ) VALUES (?, ?, ?, ?, ?, ?, 'new')
         RETURNING projectID
    `;

    // SQL for sprint insertion
    const sprintSQL = `
        INSERT INTO sprint (
            projectID,
            sprintDetails,
            cost,
            type,
            schedule,
            scopeFile
        ) VALUES (?, ?, ?, ?, ?, ?)
    `;

    try {
        // Extract project details from request body
        const {
            projectName,
            projectCost,
            projectSchedule,
            projectType,
            projectDescription,
            clientID,
            // Sprint details
            sprintDetails,
            sprintCost,
            sprintType,
            sprintSchedule,
            scopeFile
        } = req.body;

        // Process the base64 scopeFile
        let processedScopeFile = null;
        if (scopeFile) {
            // Convert base64 to Buffer
            const fileBuffer = Buffer.from(scopeFile, 'base64');

            // Here you might want to add compression
            // This is a simple example using zlib
            const zlib = require('zlib');
            processedScopeFile = zlib.gzipSync(fileBuffer);
        }

        // First, insert the project
        const projectResult = await Qexecution.queryExecute(projectSQL, [
            projectName,
            projectCost,
            projectSchedule,
            projectType,
            projectDescription,
            clientID
        ]);

        // Get the inserted project ID
        const projectID = projectResult[0]?.projectID;

        if (!projectID) {
            throw new Error('Failed to get projectID after insertion');
        }

        // Then, insert the sprint with the new project ID
        await Qexecution.queryExecute(sprintSQL, [
            projectID,
            sprintDetails,
            sprintCost,
            sprintType,
            sprintSchedule,
            processedScopeFile
        ]);

        // Success response
        res.status(201).send({
            status: "success",
            message: "Project and sprint created successfully",
            data: {
                projectID: projectID
            }
        });

    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error creating project and sprint",
            error: err.message
        });
    }
};

// ... existing code ...

// Create new sprint for an existing project
exports.createSprint = async (req, res) => {
    // SQL for sprint insertion
    const sprintSQL = `
        INSERT INTO sprint (
            projectID,
            sprintDetails,
            cost,
            type,
            schedule,
            scopeFile
        ) VALUES (?, ?, ?, ?, ?, ?)
    `;

    try {
        // Get project ID from params and sprint details from body
        const {
            sprintDetails,
            cost,
            type,
            schedule,
            scopeFile,
            projectID
        } = req.body;

        // Process and compress scope file
        let processedScopeFile = null;
        if (scopeFile) {
            const fileBuffer = Buffer.from(scopeFile, 'base64');
            const zlib = require('zlib');
            processedScopeFile = zlib.gzipSync(fileBuffer);
        }

        // Insert sprint
        const result = await Qexecution.queryExecute(sprintSQL, [
            projectID,
            sprintDetails,
            cost,
            type,
            schedule,
            processedScopeFile
        ]);

        // Send success response
        res.status(201).send({
            status: "success",
            message: "Sprint created successfully",
            data: {
                sprintID: result.insertId
            }
        });

    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error creating sprint",
            error: err.message
        });
    }
};
