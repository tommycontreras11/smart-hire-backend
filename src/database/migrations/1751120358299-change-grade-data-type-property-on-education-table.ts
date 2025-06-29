import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeGradeDataTypePropertyOnEducationTable1751120358299 implements MigrationInterface {
    name = 'ChangeGradeDataTypePropertyOnEducationTable1751120358299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`educations\` DROP COLUMN \`grade\``);
        await queryRunner.query(`ALTER TABLE \`educations\` ADD \`grade\` float(10,2) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`educations\` DROP COLUMN \`grade\``);
        await queryRunner.query(`ALTER TABLE \`educations\` ADD \`grade\` int NULL`);
    }

}
