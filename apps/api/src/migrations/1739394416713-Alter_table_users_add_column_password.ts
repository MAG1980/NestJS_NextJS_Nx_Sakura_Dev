import { MigrationInterface, QueryRunner } from 'typeorm'

export class AlterTableUsersAddColumnPassword1739394416713
  implements MigrationInterface
{
  name = 'AlterTableUsersAddColumnPassword1739394416713'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "password" varchar
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "password"
        `)
  }
}
