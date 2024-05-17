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

let calcDeadlines = async (student_id) => {
    dbRes = await db.query(`select date, coalesce(course_name, '') as course, coalesce(assignment_name, '') as work,
        date = '2024-04-07' as today,
        deadline_date is not null as deadline,
        pass_date <= deadline_date and pass_date is not null as passed,
        ((pass_date > deadline_date and pass_date is not null) or (pass_date is null and deadline_date <'2024-04-07')) and deadline_date is not null as failed,
        deadline_date > '2024-04-07' and deadline_date is not null as future
        from 
        (select (generate_series(date_trunc('week', date '2024-04-07' - 7), 
        date_trunc('week', date '2024-04-07' - 7) + INTERVAL '34 DAY', '1 day'::interval))::date as date) as d
        left join
        (
        select * from monitoring.monitoring."Assignments" a
        left join monitoring.monitoring."Courses" c 
        on c.course_id = a.course_id 
        left join monitoring.monitoring."Marks" m
        on m.assignment_id = a.assignment_id
        where a.group_id = (select group_id from monitoring.monitoring."Students" where student_id = $1)
        and (m.student_id = $1 or m.student_id is null)
        ) d2 on d.date = d2.deadline_date`, [student_id]);

    let deadlines = dbRes.rows

    deadlines.map((deadline) => toDate(deadline))
    return deadlines;
}

let marks4 = async (req, res) => {
        
    res.send({
            days: await calcDeadlines(req.body.student_id)
        });
}

module.exports.marks4 = marks4;
