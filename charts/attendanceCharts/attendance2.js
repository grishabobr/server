const { db } = require("../../db_config");

let calcMonthAttendance = async (student_id) => {
    dbRes = await db.query(`select
        cast(sum(CASE WHEN attendance  THEN 1 END) as float) / count(attendance_id) as perc
        from monitoring.monitoring."Attendance"
        where date between (date '2024-04-07'- 30) and '2024-04-07'
        and student_id = $1`, [student_id]);
    return Math.round(dbRes.rows[0].perc * 100)-7;
}

let attendance2 = async (req, res) => {
        
    res.send({
            monthAttendance: await calcMonthAttendance(req.body.student_id)
        });
}

module.exports.attendance2 = attendance2;
