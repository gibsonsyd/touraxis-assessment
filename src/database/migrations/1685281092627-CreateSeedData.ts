import { TableNames } from "./../../constants/TableNames"
import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateSeedData1685281092627 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
                INSERT IGNORE INTO ${TableNames.USERS} (id, username, first_name, last_name) 
                VALUES
                (1, 'johnno', 'John', ' Doe'),
                (2, 'Jaay', 'Jane', 'Doe')
            `
          );
      
          await queryRunner.query(
            `
                INSERT IGNORE INTO ${TableNames.TASKS} (id, name, description, execute_on, userId) 
                VALUES
                (1, 'Brunch appointment', 'You have a brunch appointment with your father!', DATE_ADD(NOW(), INTERVAL 1 MINUTE), 1),
                (2, 'Walk the dog', 'Jess needs some exercise!', DATE_ADD(NOW(), INTERVAL 4 MINUTE), 2)
            `
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`DELETE FROM ${TableNames.TASKS}`);
        await queryRunner.query(`DELETE FROM ${TableNames.USERS}`);

    }

}
