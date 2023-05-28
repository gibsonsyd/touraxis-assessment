import { Task } from "@/database/entities/Task";
import { AppDataSource } from "./../database/Data-Source";
import { TaskStatuses } from "@/constants/TaskStatuses";

export class TaskLooper {

    log: any;
    constructor() {
        this.log = console.log;
    }

    async completeExpiredTasks() {

        const currentDate = new Date(); // let's define now

        const taskRepository = AppDataSource.getRepository(Task); 

        const tasks = await taskRepository                                  // find tasks where status is pending and expired
        .createQueryBuilder('task')
        .where('task.execute_on < :currentDate', { currentDate })
        .andWhere('task.status = :status', { status: TaskStatuses.PENDING })
        .getMany();         

        if (tasks.length == 0) {                    // If we have nothing to do, return
            this.log('No expired tasks found!');
            return;
        }

        this.log(`We have ${tasks.length} tasks to update!`);
        
        const updatedTasks = tasks.map((task) => {  // Update the status of tasks to 'Done'
            task.status = TaskStatuses.DONE;
            return task;
        });

        
        await taskRepository.save(updatedTasks);    // Save the updated tasks

        this.log('Tasks updated successfully');

        
    }
}