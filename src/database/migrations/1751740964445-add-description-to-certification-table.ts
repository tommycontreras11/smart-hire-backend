import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionToCertificationTable1751740964445 implements MigrationInterface {
    name = 'AddDescriptionToCertificationTable1751740964445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`certifications\` ADD \`description\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`certifications\` DROP COLUMN \`description\``);
    }

}
