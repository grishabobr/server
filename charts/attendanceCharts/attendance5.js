const { db } = require("../../db_config");

let calcAttendance = async (student_id) => {
    dbRes = await db.query(`select
        json_build_object(
            'course', course_name,
            'lectures', case when sum(case when class_type = 'Лекционные' then 1 else 0 end) = 0 then -1 else cast(sum(case when class_type = 'Лекционные' and attendance then 1 else 0 end) as float) / sum(case when class_type = 'Лекционные' then 1 else 0 end)*100 end,
            'practical', case when sum(case when class_type = 'Практические' then 1 else 0 end) = 0 then -1 else cast(sum(case when class_type = 'Практические' and attendance then 1 else 0 end) as float) / sum(case when class_type = 'Практические' then 1 else 0 end)*100 end,
            'labs', case when sum(case when class_type = 'Лабораторные' then 1 else 0 end) = 0 then -1 else cast(sum(case when class_type = 'Лабораторные' and attendance then 1 else 0 end) as float) / sum(case when class_type = 'Лабораторные' then 1 else 0 end)*100 end,
            'total', cast(sum(case when attendance then 1 else 0 end) as float) / count(attendance)*100
        ) as agg
        from monitoring.monitoring."Attendance" a 
        left join monitoring.monitoring."Schedule" s
        on s.schedule_id =a.schedule_id
        left join monitoring.monitoring."Courses" c 
        on c.course_id = s.course_id 
        where a.student_id = $1
        group by course_name`, [student_id]);

    let attendance = dbRes.rows;
    attendance = attendance.map((att) => att.agg);
    console.log(attendance)
    return attendance;
}

let attendance5 = async (req, res) => {
        
    res.send({
            attendance: await calcAttendance(req.body.student_id)
        });
}

module.exports.attendance5 = attendance5;
