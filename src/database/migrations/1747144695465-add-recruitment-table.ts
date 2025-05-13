import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRecruitmentTable1747144695465 implements MigrationInterface {
    name = 'AddRecruitmentTable1747144695465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`recruitment\` (\`recruiter_id\` int NOT NULL, \`candidate_id\` int NOT NULL, PRIMARY KEY (\`recruiter_id\`, \`candidate_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`recruiters\` DROP FOREIGN KEY \`FK_2459df42f9f51caf01e4f5a125a\``);
        await queryRunner.query(`ALTER TABLE \`recruiters\` CHANGE \`institution_id\` \`institution_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`recruitment\` ADD CONSTRAINT \`FK_6f68e87931e0f5e9b4c87b8061a\` FOREIGN KEY (\`recruiter_id\`) REFERENCES \`recruiters\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recruitment\` ADD CONSTRAINT \`FK_92c0261b96a9e22a9490bb92e6d\` FOREIGN KEY (\`candidate_id\`) REFERENCES \`candidates\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recruiters\` ADD CONSTRAINT \`FK_2459df42f9f51caf01e4f5a125a\` FOREIGN KEY (\`institution_id\`) REFERENCES \`institutions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`recruiters\` DROP FOREIGN KEY \`FK_2459df42f9f51caf01e4f5a125a\``);
        await queryRunner.query(`ALTER TABLE \`recruitment\` DROP FOREIGN KEY \`FK_92c0261b96a9e22a9490bb92e6d\``);
        await queryRunner.query(`ALTER TABLE \`recruitment\` DROP FOREIGN KEY \`FK_6f68e87931e0f5e9b4c87b8061a\``);
        await queryRunner.query(`ALTER TABLE \`recruiters\` CHANGE \`institution_id\` \`institution_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`recruiters\` ADD CONSTRAINT \`FK_2459df42f9f51caf01e4f5a125a\` FOREIGN KEY (\`institution_id\`) REFERENCES \`institutions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE \`recruitment\``);
    }

}
