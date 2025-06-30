import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusToAcademicDisciplineCertificationEducationTables1751315563283 implements MigrationInterface {
    name = 'AddStatusToAcademicDisciplineCertificationEducationTables1751315563283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`certifications\` ADD \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE'`);
        await queryRunner.query(`ALTER TABLE \`academic_disciplines\` ADD \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE'`);
        await queryRunner.query(`ALTER TABLE \`educations\` ADD \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`educations\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`academic_disciplines\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`certifications\` DROP COLUMN \`status\``);
    }

}
