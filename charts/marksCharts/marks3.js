const { db } = require("../../db_config");

let calcDaysToExams = () => {
    return 19
}

let marks3 = async (req, res) => {
        
    res.send({
            daysToExams: calcDaysToExams()
        });
}

module.exports.marks3 = marks3;
