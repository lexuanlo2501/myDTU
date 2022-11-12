const systemSchedule_router = require('express').Router();
const {scheduleClass} = require('../../../controllers/system/ system.controller');

systemSchedule_router.patch('/scheduleClasses',scheduleClass);

module.exports  = systemSchedule_router;
