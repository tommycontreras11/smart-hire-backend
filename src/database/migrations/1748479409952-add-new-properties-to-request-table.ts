import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewPropertiesToRequestTable1748479409952 implements MigrationInterface {
    name = 'AddNewPropertiesToRequestTable1748479409952'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`requests\` ADD \`curriculum\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`requests\` ADD \`next_step\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`requests\` ADD \`interview_date\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`requests\` DROP COLUMN \`interview_date\``);
        await queryRunner.query(`ALTER TABLE \`requests\` DROP COLUMN \`next_step\``);
        await queryRunner.query(`ALTER TABLE \`requests\` DROP COLUMN \`curriculum\``);
    }

}
