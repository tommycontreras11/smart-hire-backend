import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveCurriculumPropertyFromRequestTable1752153757715 implements MigrationInterface {
    name = 'RemoveCurriculumPropertyFromRequestTable1752153757715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`requests\` DROP COLUMN \`curriculum\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`requests\` ADD \`curriculum\` varchar(255) NOT NULL`);
    }

}
