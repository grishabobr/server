const { db } = require("../../db_config");


let getExamMarks = async (student_id) => {
    dbRes = await db.query(`select course_name as course,mark, period as semestr
        from monitoring.monitoring."Attestation" a 
        left join monitoring.monitoring."Courses" c 
        on c.course_id = a.course_id 
        where a.student_id = $1`, [student_id]);

    let marks = dbRes.rows

    return marks;
}

let marks6 = async (req, res) => {
        
    res.send({
            marks: await getExamMarks(req.body.student_id)
        });
}

module.exports.marks6 = marks6;
