const
    AddClassSchedule = require('../Add class to schedule/schedule.addClass');
    InitSchedule = require(`../Initalize User's Schedule/user.schedule.init`);

function ConstructSchedule(UserSchedule,Class,Starting_Date){
    if(UserSchedule.length===0)  return InitSchedule(UserSchedule,Class,Starting_Date);  
    return AddClassSchedule(UserSchedule,Class);
}

module.exports = ConstructSchedule;