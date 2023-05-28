import { TableNames } from "./../../constants/TableNames"
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTasksTable1685280706090 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: TableNames.TASKS,
            columns: [
              {
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
              },
              {
                name: "created_on",
                type: "datetime",
                default: "now()",
                isNullable: true,
              },
              {
                name: "updated_on",
                type: "datetime",
                default: "now()",
                isNullable: true,
              },

              {
                name: "execute_on",
                type: "datetime",
                default: "now()",
                isNullable: true,
              },
              {
                name: "userId",
                type: "int",
                isNullable: false,
              },
              {
                name: "name",
                type: "varchar",
                length: "50",
                isNullable: false,
              },
              {
                name: "description",
                type: "varchar",
                length: "255",
                isNullable: false,
              },
              
            ],
          }),
          true
        );

        const foreignKey = new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: TableNames.USERS,
            onDelete: "CASCADE",
          });
      
          await queryRunner.createForeignKey(TableNames.TASKS, foreignKey);
    }
        
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(TableNames.TASKS)
    }

}
