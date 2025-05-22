import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeDueDateDataTypeOnJobPositionTable1747928808822 implements MigrationInterface {
    name = 'ChangeDueDateDataTypeOnJobPositionTable1747928808822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_positions\` DROP COLUMN \`due_date\``);
        await queryRunner.query(`ALTER TABLE \`job_positions\` ADD \`due_date\` datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_positions\` DROP COLUMN \`due_date\``);
        await queryRunner.query(`ALTER TABLE \`job_positions\` ADD \`due_date\` date NOT NULL`);
    }

}
