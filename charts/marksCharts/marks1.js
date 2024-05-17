const { db } = require("../../db_config");

let calcAvgMark = async (student_id) => {
    dbRes = await db.query(`select
        cast(sum(
        case
            when mark = 'отлично' then 5
            when mark = 'хорошо' then 4
            when mark = 'удовл.' then 3
        end
        ) as float)/count(mark) as avg
        from monitoring.monitoring."Attestation"
        where 
        mark in ('отлично', 'хорошо', 'удовл.')
        and student_id = $1`, [student_id]);
    return dbRes.rows[0].avg;
}

let marks1 = async (req, res) => {
        
    res.send({
            avgMark: await calcAvgMark(req.body.student_id)
        });
}

module.exports.marks1 = marks1;
