import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRequestRelationToRecruitmentTable1748722300946 implements MigrationInterface {
    name = 'AddRequestRelationToRecruitmentTable1748722300946'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`recruitment\` ADD \`request_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`request_histories\` CHANGE \`status\` \`status\` enum ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'INTERVIEW', 'EVALUATED', 'REJECTED', 'HIRED', 'CANCELLED') NOT NULL DEFAULT 'DRAFT'`);
        await queryRunner.query(`ALTER TABLE \`requests\` CHANGE \`status\` \`status\` enum ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'INTERVIEW', 'EVALUATED', 'REJECTED', 'HIRED', 'CANCELLED') NOT NULL DEFAULT 'DRAFT'`);
        await queryRunner.query(`ALTER TABLE \`recruitment\` ADD CONSTRAINT \`FK_e6bd29a7e58a143fa1969ad6080\` FOREIGN KEY (\`request_id\`) REFERENCES \`requests\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`recruitment\` DROP FOREIGN KEY \`FK_e6bd29a7e58a143fa1969ad6080\``);
        await queryRunner.query(`ALTER TABLE \`requests\` CHANGE \`status\` \`status\` enum ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'INTERVIEW', 'EVALUATED', 'APPROVED', 'REJECTED', 'HIRED', 'CANCELLED') NOT NULL DEFAULT 'DRAFT'`);
        await queryRunner.query(`ALTER TABLE \`request_histories\` CHANGE \`status\` \`status\` enum ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'INTERVIEW', 'EVALUATED', 'APPROVED', 'REJECTED', 'HIRED', 'CANCELLED') NOT NULL DEFAULT 'DRAFT'`);
        await queryRunner.query(`ALTER TABLE \`recruitment\` DROP COLUMN \`request_id\``);
    }

}
