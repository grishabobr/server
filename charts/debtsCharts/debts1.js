const { db } = require("../../db_config");

let getDebts = async (student_id) => {
    dbRes = await db.query(`select count(*)
        from monitoring.monitoring."Debts"
        where student_id = $1`, [student_id]);
    return dbRes.rows[0].count;
}

let debts1 = async (req, res) => {
        
    res.send({
            debts: await getDebts(req.body.student_id)
        });
}

module.exports.debts1 = debts1;
