import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCompetenciesToJobPositionTable1747754677170 implements MigrationInterface {
    name = 'AddCompetenciesToJobPositionTable1747754677170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_209384ea01bce5b6256fa544ff\` ON \`work_experiences\``);
        await queryRunner.query(`CREATE TABLE \`job_position_competencies\` (\`job_position_id\` int NOT NULL, \`competency_id\` int NOT NULL, INDEX \`IDX_af7f1062161753f370d90d2a98\` (\`job_position_id\`), INDEX \`IDX_17c22d991d1d264478b897f4bf\` (\`competency_id\`), PRIMARY KEY (\`job_position_id\`, \`competency_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`job_positions\` DROP COLUMN \`risk_level\``);
        await queryRunner.query(`ALTER TABLE \`job_positions\` CHANGE \`contract_type\` \`contract_type\` enum ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`job_position_competencies\` ADD CONSTRAINT \`FK_af7f1062161753f370d90d2a98f\` FOREIGN KEY (\`job_position_id\`) REFERENCES \`job_positions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`job_position_competencies\` ADD CONSTRAINT \`FK_17c22d991d1d264478b897f4bf6\` FOREIGN KEY (\`competency_id\`) REFERENCES \`competencies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_position_competencies\` DROP FOREIGN KEY \`FK_17c22d991d1d264478b897f4bf6\``);
        await queryRunner.query(`ALTER TABLE \`job_position_competencies\` DROP FOREIGN KEY \`FK_af7f1062161753f370d90d2a98f\``);
        await queryRunner.query(`ALTER TABLE \`job_positions\` CHANGE \`contract_type\` \`contract_type\` enum ('FULL_TIME', 'PART_TIME', 'CONTRACT') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`job_positions\` ADD \`risk_level\` enum ('LOW', 'MEDIUM', 'HIGH') NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_17c22d991d1d264478b897f4bf\` ON \`job_position_competencies\``);
        await queryRunner.query(`DROP INDEX \`IDX_af7f1062161753f370d90d2a98\` ON \`job_position_competencies\``);
        await queryRunner.query(`DROP TABLE \`job_position_competencies\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_209384ea01bce5b6256fa544ff\` ON \`work_experiences\` (\`candidate_id\`)`);
    }

}
