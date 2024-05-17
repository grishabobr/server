const { db } = require("../../db_config");

let calcWeekAttendance = async (student_id) => {
    dbRes = await db.query(`select
        cast(sum(CASE WHEN attendance  THEN 1 END) as float) / count(attendance_id) as perc
        from monitoring.monitoring."Attendance"
        where date between (date '2024-04-07'- 6) and '2024-04-07'
        and student_id = $1`, [student_id]);
    return Math.round(dbRes.rows[0].perc * 100);
}

let attendance3 = async (req, res) => {
        
    res.send({
            weekAttendance: await calcWeekAttendance(req.body.student_id)
        });
}

module.exports.attendance3 = attendance3;
