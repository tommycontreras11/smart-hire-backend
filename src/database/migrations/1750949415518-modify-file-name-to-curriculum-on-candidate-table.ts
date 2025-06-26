import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyFileNameToCurriculumOnCandidateTable1750949415518 implements MigrationInterface {
    name = 'ModifyFileNameToCurriculumOnCandidateTable1750949415518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`candidates\` CHANGE \`file_name\` \`curriculum\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`candidates\` DROP COLUMN \`curriculum\``);
        await queryRunner.query(`ALTER TABLE \`candidates\` ADD \`curriculum\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`candidates\` DROP COLUMN \`curriculum\``);
        await queryRunner.query(`ALTER TABLE \`candidates\` ADD \`curriculum\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`candidates\` CHANGE \`curriculum\` \`file_name\` varchar(255) NOT NULL`);
    }

}
