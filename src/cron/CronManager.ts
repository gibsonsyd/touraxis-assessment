import cron = require('node-cron');
import { TaskLooper } from './TaskLooper'

export class CronManager {

    log: any;
    constructor() {
        this.log = console.log;
    }

    // per the assessment we are required to check for tasks that are in status pending and past their execute_on date.
    async scheduleTaskCheck() {
        cron.schedule('* * * * *', async now => {
            this.log('running a task every minute');
            if (now instanceof Date) {
                
                var tLooper = new TaskLooper();
                await tLooper.completeExpiredTasks();   //set expired tasks statuses to 'done'.

            }
        });
    }

}
