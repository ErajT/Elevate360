const Qexecution = require("./query");

exports.generateLeaderboard = async (req, res) => {
    try {       
        res.status(200).send({
            status: "success",
            message: "Leaderboards generated for all trainings.",
        });
    } catch (err) {
        console.error("Error generating leaderboards:", err.message);
        res.status(500).send({
            status: "fail",
            message: "Error generating leaderboards.",
            error: err.message,
        });
    }
};
