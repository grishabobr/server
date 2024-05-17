const { db } = require("../../db_config");

let toDate = (mark) => {
    let markDate = new Date(mark.date).addHours(3)
    const year = markDate.getFullYear();
    const month = String(markDate.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11, so add 1
    const day = String(markDate.getDate()).padStart(2, '0');

    const formattedDate = `${day}.${month}.${year}`;
    mark.date = formattedDate
    return mark
}

let calcDebts = async (student_id) => {
    dbRes = await db.query(`select course_name as course, period as semestr, attempt, next_date as date, info_link as requirements
        from monitoring.monitoring."Debts" d 
        left join monitoring.monitoring."Courses" c 
        on c.course_id = d.course_id 
        left join monitoring.monitoring."Retakes" r 
        on r.retake_id = d.retake_id 
        where d.student_id=$1
        `, [student_id]);

    let debts = dbRes.rows;
    debts = debts.map((mark) => toDate(mark));
    return debts;
}

let debts2 = async (req, res) => {
        
    res.send({
            debts: await calcDebts(req.body.student_id)
        });
}

module.exports.debts2 = debts2;
