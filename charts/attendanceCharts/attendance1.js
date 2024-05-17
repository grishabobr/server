const { db } = require("../../db_config");

let calcSemAttendance = async (student_id) => {
    return 80;
}

let attendance1 = async (req, res) => {
        
    res.send({
            semAttendance: await calcSemAttendance(req.body.student_id)
        });
}

module.exports.attendance1 = attendance1;
