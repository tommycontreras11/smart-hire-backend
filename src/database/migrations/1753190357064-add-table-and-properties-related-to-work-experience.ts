import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTableAndPropertiesRelatedToWorkExperience1753190357064 implements MigrationInterface {
    name = 'AddTableAndPropertiesRelatedToWorkExperience1753190357064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        //await queryRunner.query(`DROP INDEX \`REL_209384ea01bce5b6256fa544ff\` ON \`work_experiences\``);
        await queryRunner.query(`CREATE TABLE \`job_sources\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`work_experience_competencies\` (\`work_experience_id\` int NOT NULL, \`competency_id\` int NOT NULL, INDEX \`IDX_0d63ab44b510b92e4f7c8086e9\` (\`work_experience_id\`), INDEX \`IDX_30138e1be35a1426833ec00621\` (\`competency_id\`), PRIMARY KEY (\`work_experience_id\`, \`competency_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`job_positions\` DROP COLUMN \`contract_type\``);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` DROP COLUMN \`company\``);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` DROP COLUMN \`recommend_by\``);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` DROP COLUMN \`salary\``);
        await queryRunner.query(`ALTER TABLE \`job_positions\` ADD \`work_type\` enum ('FULL_TIME', 'PART_TIME', 'SELF_EMPLOYED', 'FREELANCER', 'TEMPORARY CONTRACT', 'INTERNSHIP CONTRACT', 'TRAINING CONTRACT', 'TEMPORARY') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`job_positions\` ADD \`work_location\` enum ('ON_SITE', 'HYBRID', 'REMOTE') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` ADD \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` ADD \`location\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` ADD \`work_type\` enum ('FULL_TIME', 'PART_TIME', 'SELF_EMPLOYED', 'FREELANCER', 'TEMPORARY CONTRACT', 'INTERNSHIP CONTRACT', 'TRAINING CONTRACT', 'TEMPORARY') NULL`);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` ADD \`work_location\` enum ('ON_SITE', 'HYBRID', 'REMOTE') NULL`);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` ADD \`current_position\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` ADD \`institution_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` ADD \`job_source_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` ADD CONSTRAINT \`FK_75a66b232737298c67b857ec3e5\` FOREIGN KEY (\`institution_id\`) REFERENCES \`institutions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` ADD CONSTRAINT \`FK_4af6d023134b53e85834b025550\` FOREIGN KEY (\`job_source_id\`) REFERENCES \`job_sources\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`work_experience_competencies\` ADD CONSTRAINT \`FK_0d63ab44b510b92e4f7c8086e90\` FOREIGN KEY (\`work_experience_id\`) REFERENCES \`work_experiences\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`work_experience_competencies\` ADD CONSTRAINT \`FK_30138e1be35a1426833ec006218\` FOREIGN KEY (\`competency_id\`) REFERENCES \`competencies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`work_experience_competencies\` DROP FOREIGN KEY \`FK_30138e1be35a1426833ec006218\``);
        await queryRunner.query(`ALTER TABLE \`work_experience_competencies\` DROP FOREIGN KEY \`FK_0d63ab44b510b92e4f7c8086e90\``);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` DROP FOREIGN KEY \`FK_4af6d023134b53e85834b025550\``);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` DROP FOREIGN KEY \`FK_75a66b232737298c67b857ec3e5\``);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` DROP COLUMN \`job_source_id\``);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` DROP COLUMN \`institution_id\``);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` DROP COLUMN \`current_position\``);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` DROP COLUMN \`work_location\``);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` DROP COLUMN \`work_type\``);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` DROP COLUMN \`location\``);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`job_positions\` DROP COLUMN \`work_location\``);
        await queryRunner.query(`ALTER TABLE \`job_positions\` DROP COLUMN \`work_type\``);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` ADD \`salary\` float(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` ADD \`recommend_by\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` ADD \`company\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`job_positions\` ADD \`contract_type\` enum ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN') NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_30138e1be35a1426833ec00621\` ON \`work_experience_competencies\``);
        await queryRunner.query(`DROP INDEX \`IDX_0d63ab44b510b92e4f7c8086e9\` ON \`work_experience_competencies\``);
        await queryRunner.query(`DROP TABLE \`work_experience_competencies\``);
        await queryRunner.query(`DROP TABLE \`job_sources\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_209384ea01bce5b6256fa544ff\` ON \`work_experiences\` (\`candidate_id\`)`);
    }

}
