import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPhotoPropertyToCandidateRecruiterAndEmployeeTable1751117772758 implements MigrationInterface {
    name = 'AddPhotoPropertyToCandidateRecruiterAndEmployeeTable1751117772758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`recruiters\` CHANGE \`file_name\` \`photo\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`employees\` ADD \`photo\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`candidates\` ADD \`photo\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`recruiters\` DROP COLUMN \`photo\``);
        await queryRunner.query(`ALTER TABLE \`recruiters\` ADD \`photo\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`recruiters\` DROP COLUMN \`photo\``);
        await queryRunner.query(`ALTER TABLE \`recruiters\` ADD \`photo\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`candidates\` DROP COLUMN \`photo\``);
        await queryRunner.query(`ALTER TABLE \`employees\` DROP COLUMN \`photo\``);
        await queryRunner.query(`ALTER TABLE \`recruiters\` CHANGE \`photo\` \`file_name\` varchar(255) NOT NULL`);
    }

}
