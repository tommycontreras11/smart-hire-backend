import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPropertiesOnWorkExperienceTable1747272850875 implements MigrationInterface {
    name = 'AddPropertiesOnWorkExperienceTable1747272850875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`candidates\` DROP FOREIGN KEY \`FK_ca9d1dd52fad326557f48fd151c\``);
        await queryRunner.query(`DROP INDEX \`IDX_ca9d1dd52fad326557f48fd151\` ON \`candidates\``);
        await queryRunner.query(`DROP INDEX \`REL_ca9d1dd52fad326557f48fd151\` ON \`candidates\``);
        await queryRunner.query(`ALTER TABLE \`candidates\` DROP COLUMN \`recommend_by\``);
        await queryRunner.query(`ALTER TABLE \`candidates\` DROP COLUMN \`work_experience_id\``);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` ADD \`recommend_by\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` ADD \`candidate_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` ADD UNIQUE INDEX \`IDX_209384ea01bce5b6256fa544ff\` (\`candidate_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_209384ea01bce5b6256fa544ff\` ON \`work_experiences\` (\`candidate_id\`)`);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` ADD CONSTRAINT \`FK_209384ea01bce5b6256fa544ff2\` FOREIGN KEY (\`candidate_id\`) REFERENCES \`candidates\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`work_experiences\` DROP FOREIGN KEY \`FK_209384ea01bce5b6256fa544ff2\``);
        await queryRunner.query(`DROP INDEX \`REL_209384ea01bce5b6256fa544ff\` ON \`work_experiences\``);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` DROP INDEX \`IDX_209384ea01bce5b6256fa544ff\``);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` DROP COLUMN \`candidate_id\``);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` DROP COLUMN \`recommend_by\``);
        await queryRunner.query(`ALTER TABLE \`candidates\` ADD \`work_experience_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`candidates\` ADD \`recommend_by\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_ca9d1dd52fad326557f48fd151\` ON \`candidates\` (\`work_experience_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_ca9d1dd52fad326557f48fd151\` ON \`candidates\` (\`work_experience_id\`)`);
        await queryRunner.query(`ALTER TABLE \`candidates\` ADD CONSTRAINT \`FK_ca9d1dd52fad326557f48fd151c\` FOREIGN KEY (\`work_experience_id\`) REFERENCES \`work_experiences\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
