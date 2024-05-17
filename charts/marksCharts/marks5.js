const { db } = require("../../db_config");

let getAbbreviation = (str) => {
    return str.split(" ").map(e => {
        return e[0].toUpperCase();
    }).join("");
}


let correctMark = (mark) => {

    let markDate = new Date(mark.date)
    const year = markDate.getFullYear();
    const month = String(markDate.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11, so add 1
    const day = String(markDate.getDate()).padStart(2, '0');

    const formattedDate = `${day}.${month}.${year}`;
    mark.date = formattedDate

    if (mark.work.length > 10) {
        mark.work = getAbbreviation(mark.work);
    }

    return mark
}


let correctData = (data) => {
    data.marks = data.marks.map((mark) => correctMark(mark))
    return data
}

let getCourses = async (student_id) => {
    dbRes = await db.query(`select
        course_name as course,
        json_agg(
            json_build_object(
                'date', deadline_date,
                'work', assignment_name,
                'mark', mark,
                'max_mark', max_mark
            )
        ) as marks
        from monitoring.monitoring."Marks" m
        left join monitoring.monitoring."Assignments" a
        on m.assignment_id = a.assignment_id
        left join monitoring.monitoring."Courses" c 
        on c.course_id = a.course_id 
        where m.student_id = $1
        group by course_name`, [student_id]);

    let courses = dbRes.rows

    courses = courses.map((course) => correctData(course))


    return courses;
}

let marks5 = async (req, res) => {
        
    res.send({
            courses: await getCourses(req.body.student_id)
        });
}

module.exports.marks5 = marks5;
