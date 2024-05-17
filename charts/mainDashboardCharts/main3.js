const { db } = require("../../db_config");
Date.prototype.addHours = function (h) {
    this.setHours(this.getHours() + h);
    return this;
}


let toDate = (mark) => {
    let markDate = new Date(mark.date).addHours(3)
    const year = markDate.getFullYear();
    const month = String(markDate.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11, so add 1
    const day = String(markDate.getDate()).padStart(2, '0');

    const formattedDate = `${day}.${month}.${year}`;
    mark.date = formattedDate
    return mark
}

let getMarks = async (student_id) => {
    dbRes = await db.query(`select deadline_date as date, course_name as course, assignment_name as work, mark, max_mark
        from monitoring.monitoring."Marks" m
        left join monitoring.monitoring."Assignments" a
        on a.assignment_id = m.assignment_id 
        left join monitoring.monitoring."Courses" c 
        on c.course_id = a.course_id 
        where student_id = $1
        and deadline_date  <= '2024-04-07'
        order by deadline_date desc
        limit 5`, [student_id]);

    
    let marks = dbRes.rows

    marks = marks.map((mark) => toDate(mark))

    return marks;
}

let main3 = async (req, res) => {
        
    res.send({
            marks: await getMarks(req.body.student_id)
        });
}

module.exports.main3 = main3;
