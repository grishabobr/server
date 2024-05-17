const { db } = require("../../db_config");

let calcAvgMarkSem = async (student_id) => {
    dbRes = await db.query(`select
        avg(cast(mark as float)/max_mark)
        from monitoring.monitoring."Marks"
        where student_id = $1`, [student_id]);
    return dbRes.rows[0].avg * 100;
}

let marks2 = async (req, res) => {
        
    res.send({
            worksCompleted: await calcAvgMarkSem(req.body.student_id)
        });
}

module.exports.marks2 = marks2;
