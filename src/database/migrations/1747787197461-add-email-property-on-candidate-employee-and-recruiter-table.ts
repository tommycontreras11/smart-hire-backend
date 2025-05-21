import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailPropertyOnCandidateEmployeeAndRecruiterTable1747787197461 implements MigrationInterface {
    name = 'AddEmailPropertyOnCandidateEmployeeAndRecruiterTable1747787197461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`recruiters\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`recruiters\` ADD UNIQUE INDEX \`IDX_67a547d9a83ee186a56393bee9\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`employees\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`employees\` ADD UNIQUE INDEX \`IDX_765bc1ac8967533a04c74a9f6a\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`candidates\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`candidates\` ADD UNIQUE INDEX \`IDX_c0de76a18c2a505ceb01674682\` (\`email\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`candidates\` DROP INDEX \`IDX_c0de76a18c2a505ceb01674682\``);
        await queryRunner.query(`ALTER TABLE \`candidates\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`employees\` DROP INDEX \`IDX_765bc1ac8967533a04c74a9f6a\``);
        await queryRunner.query(`ALTER TABLE \`employees\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`recruiters\` DROP INDEX \`IDX_67a547d9a83ee186a56393bee9\``);
        await queryRunner.query(`ALTER TABLE \`recruiters\` DROP COLUMN \`email\``);
    }

}
