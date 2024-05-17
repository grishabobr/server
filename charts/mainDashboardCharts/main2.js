const { db } = require("../../db_config");

let get_week_attendance = async (student_id) => {
    dbRes = await db.query(`select
        cast(sum(CASE WHEN attendance  THEN 1 END) as float) / count(attendance_id) as perc
        from monitoring.monitoring."Attendance"
        where date between (date '2024-04-07'- 6) and '2024-04-07'
        and student_id = $1`, [student_id]);
    return Math.round(dbRes.rows[0].perc * 100);
}

let toClasses = (_class) => {
    let classes_arr = []
    if (_class.att != null){
        for (let i = 0; i < _class.att.length; i++) {
            classes_arr.push({
                num: _class.number[i],
                attendance: _class.att[i]
            });
        }
    }
    return {
        name: _class.d,
        classes: classes_arr
    };
}




let calculateDays = async (student_id) => {
    dbRes = await db.query(`select d, number, att from unnest(array['Пн','Вт','Ср','Чт','Пт','Сб']) d
        left join
        (select case
            when day_of_week = 1 then 'Пн'
            when day_of_week = 2 then 'Вт'
            when day_of_week = 3 then 'Ср'
            when day_of_week = 4 then 'Чт'
            when day_of_week = 5 then 'Пт'
            when day_of_week = 6 then 'Сб'
            end as day,
        array_agg(s.number) as number,
        array_agg(a.attendance) as att
        from monitoring.monitoring."Attendance" a
        left join monitoring.monitoring."Schedule" s
        on s.schedule_id =a.schedule_id
        where
        student_id = $1
        group by date, day_of_week) at
        on at.day = d`, [student_id]);

    
    let days = dbRes.rows.map((_class) => toClasses(_class))


    

    return days;
}

let main2 = async (req, res) => {
        
    res.send({
            percent: await get_week_attendance(req.body.student_id),
            days: await calculateDays(req.body.student_id)
        });
}

module.exports.main2 = main2;
