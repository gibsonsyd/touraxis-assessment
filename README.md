# TourAxis Node Assessment
This project demostrates a NodeJS web api that manages users and tasks for individual users.

## Author
Pieter Theron 2023-05-28

## Some things to consider
### Docker compose
I've created this assessment to run in docker compose.
Here are the commands to run, test and clear your pc of the self contained project.
Please make sure you are running a recent version of Docker. Docker desktop is a very handy tool to interact with Docker images/containers.

1. run: 'docker-compose up --build -d' - this will create docker images, mount and run them 
2. run: 'docker ps' to get a list of running docker containers.
3. run: 'docker exec -it [container_id] /bin/sh' where [container_id] is the id from the list of containers where container image name is 'touraxis-assessment_app'
4. run: 'yarn typeorm migration:run' in the docker container bash to run the created migrations before running the project.
5. run: 'yarn dev' to start the development server in docker. When started you can browse to 'http://localhost:3000/api/users' to interact with the web api.

### How To Test
Use the attached postman json collection ['assessment.postman_collection.json'] to call the api .Docker will expose port 3000.

### The project implements no security best practices:
I did not implement any security checks against users calling the api endpoints. This is clearly a shortcoming that can and should be addressed in production environments.
The .env file is checked into source control for your convenience, this should be avoided in production environments. 

### Database entity referencing best practices:
Database ids are integers. In practice use some other means to navigate to the entity. I use short 10 character MD5 hashes built from a combination of fields(among them the id). This provides enough randomness for a unique reference to the entity without the predictability of guessing how to access the next entity. for an example: /users/1/task/1 vs /users/aw2210caxa/tasks/oqiezaw01a

### No unit testing
I did not implement any unit testing. I do believe the provided postman.collection objects are sufficient to test this assessment's requirement vs outcome.

### ExpressJS
I decided to use ExpressJS as it is a widely adopted and very popular web api framework for NodeJS.

### Typescript
I used typescript to provide strong typing and a clean way to implement inheritance. See EntityBase -> Task|User entities.

### MySql and typeORM
Database migrations and persistence through MySQL and typeORM. I'm sure there are better alternatives to typeORM, but I found it functional and easy to implement migrations with.

### Seed data
When you run the migrations for the first time I add 2 rows to the users table and 2 rows to the tasks table as seed data.

### Pagination
I included paginated views to limit data being returned from the database.

### Result format
Results are returned in a JSON object that looks as follows:

{
    "success": true | false,
    "message": "some descriptor",
    "data": [],
    "paginationInfo": {...}
}

### Bonus Task
I used node-cron to create a cron service that fires every minute looking for expired tasks to mark complete. I took the liberty of renaming your variable from next_execute_date_time to execute_on in my database. Please see /src/cron for more detail on this task


## Resources used while researching a solution

https://expressjs.com/en/starter/examples.html

https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786

https://www.freecodecamp.org/news/schedule-a-job-in-node-with-nodecron/

https://www.npmjs.com/package/mysql

https://www.npmjs.com/package/mysql-migrations

https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-1