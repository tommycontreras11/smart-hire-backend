import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDueDateToJobPositionTable1747763392962 implements MigrationInterface {
    name = 'AddDueDateToJobPositionTable1747763392962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_positions\` ADD \`due_date\` date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_positions\` DROP COLUMN \`due_date\``);
    }

}
