const { db } = require("../../db_config");


 

db.connect();

let get_week_attendance = (student_id) => {
    return 75;
}

let get_sem_attendance = (student_id) => {
    return 80;
}

let get_avg_mark = async (student_id) => {
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
        console.log(dbRes.rows[0].avg)
    return dbRes.rows[0].avg ;
}

let get_avg_mark_sem = async (student_id) => {
    dbRes = await db.query(`select
        avg(cast(mark as float)/max_mark)
        from monitoring.monitoring."Marks"
        where student_id = $1`, [student_id]);
    return dbRes.rows[0].avg * 100;
}

let get_debts = (student_id) => {
    return 2;
}

let get_penalties = (student_id) => {
    return 0;
}

let get_activity = (student_id) => {
    return 0;
}


let calculateRating = async (student_id) => {
    let week_attendance = get_week_attendance(student_id);
    let sem_attendance = get_sem_attendance(student_id);
    let avg_mark = await get_avg_mark(student_id);
    let avg_mark_sem = await get_avg_mark_sem(student_id);
    let debts = get_debts(student_id);
    let penalties = get_penalties(student_id);
    let activity = get_activity(student_id);
    let rating = (0.15 * week_attendance
    + 0.2 * sem_attendance
    + 20 * (avg_mark - 3)
    + 0.2 * avg_mark_sem
    - 20 * debts / 3
    - 50 * penalties /3
    + activity);
    return Math.round(rating);
}

let main1 = async (req, res) => {
        
    res.send({
        rating: await calculateRating(req.body.student_id)
    });
}

module.exports.main1 = main1;
