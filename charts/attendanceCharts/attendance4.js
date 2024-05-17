const { db } = require("../../db_config");

let calcPenalties = async (student_id) => {
    dbRes = await db.query(`select count(*)
        from monitoring.monitoring."Penalties"
        where student_id = $1`, [student_id]);
    return dbRes.rows[0].count;
}

let attendance4 = async (req, res) => {
        
    res.send({
            penalties: await calcPenalties(req.body.student_id)
        });
}

module.exports.attendance4 = attendance4;
