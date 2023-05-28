import { TableNames } from "./../../constants/TableNames"
import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsersTable1685279914540 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableNames.USERS,
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
            name: "username",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "first_name",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "last_name",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
        ],
      }),
      true
    );
  }
    
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TableNames.USERS)
  }

}
