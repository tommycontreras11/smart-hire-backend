import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyWorkExperienceRelationToBeOneToOneOnCandidateTable1747269512988 implements MigrationInterface {
    name = 'ModifyWorkExperienceRelationToBeOneToOneOnCandidateTable1747269512988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`candidates\` DROP FOREIGN KEY \`FK_ca9d1dd52fad326557f48fd151c\``);
        await queryRunner.query(`ALTER TABLE \`candidates\` ADD UNIQUE INDEX \`IDX_ca9d1dd52fad326557f48fd151\` (\`work_experience_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_ca9d1dd52fad326557f48fd151\` ON \`candidates\` (\`work_experience_id\`)`);
        await queryRunner.query(`ALTER TABLE \`candidates\` ADD CONSTRAINT \`FK_ca9d1dd52fad326557f48fd151c\` FOREIGN KEY (\`work_experience_id\`) REFERENCES \`work_experiences\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`candidates\` DROP FOREIGN KEY \`FK_ca9d1dd52fad326557f48fd151c\``);
        await queryRunner.query(`DROP INDEX \`REL_ca9d1dd52fad326557f48fd151\` ON \`candidates\``);
        await queryRunner.query(`ALTER TABLE \`candidates\` DROP INDEX \`IDX_ca9d1dd52fad326557f48fd151\``);
        await queryRunner.query(`ALTER TABLE \`candidates\` ADD CONSTRAINT \`FK_ca9d1dd52fad326557f48fd151c\` FOREIGN KEY (\`work_experience_id\`) REFERENCES \`work_experiences\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
