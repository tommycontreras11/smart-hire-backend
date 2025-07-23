import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyPlatformPropertyToBeEnumOnSocialLinkTable1753297864403 implements MigrationInterface {
    name = 'ModifyPlatformPropertyToBeEnumOnSocialLinkTable1753297864403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        //await queryRunner.query(`DROP INDEX \`REL_209384ea01bce5b6256fa544ff\` ON \`work_experiences\``);
        await queryRunner.query(`ALTER TABLE \`recruitment\` DROP FOREIGN KEY \`FK_e6bd29a7e58a143fa1969ad6080\``);
        await queryRunner.query(`ALTER TABLE \`recruitment\` DROP FOREIGN KEY \`FK_6f68e87931e0f5e9b4c87b8061a\``);
        await queryRunner.query(`ALTER TABLE \`recruitment\` DROP FOREIGN KEY \`FK_92c0261b96a9e22a9490bb92e6d\``);
        await queryRunner.query(`ALTER TABLE \`recruitment\` CHANGE \`request_id\` \`request_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`recruitment\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`recruitment\` ADD PRIMARY KEY (\`recruiter_id\`, \`candidate_id\`, \`request_id\`)`);
        await queryRunner.query(`ALTER TABLE \`recruitment\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`recruitment\` ADD PRIMARY KEY (\`candidate_id\`, \`request_id\`)`);
        await queryRunner.query(`ALTER TABLE \`recruitment\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`recruitment\` ADD PRIMARY KEY (\`request_id\`)`);
        await queryRunner.query(`ALTER TABLE \`social_links\` DROP COLUMN \`platform\``);
        await queryRunner.query(`ALTER TABLE \`social_links\` ADD \`platform\` enum ('GITHUB', 'PORTFOLIO') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`recruitment\` ADD CONSTRAINT \`FK_6f68e87931e0f5e9b4c87b8061a\` FOREIGN KEY (\`recruiter_id\`) REFERENCES \`recruiters\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recruitment\` ADD CONSTRAINT \`FK_e6bd29a7e58a143fa1969ad6080\` FOREIGN KEY (\`request_id\`) REFERENCES \`requests\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recruitment\` ADD CONSTRAINT \`FK_92c0261b96a9e22a9490bb92e6d\` FOREIGN KEY (\`candidate_id\`) REFERENCES \`candidates\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`recruitment\` DROP FOREIGN KEY \`FK_92c0261b96a9e22a9490bb92e6d\``);
        await queryRunner.query(`ALTER TABLE \`recruitment\` DROP FOREIGN KEY \`FK_e6bd29a7e58a143fa1969ad6080\``);
        await queryRunner.query(`ALTER TABLE \`recruitment\` DROP FOREIGN KEY \`FK_6f68e87931e0f5e9b4c87b8061a\``);
        await queryRunner.query(`ALTER TABLE \`social_links\` DROP COLUMN \`platform\``);
        await queryRunner.query(`ALTER TABLE \`social_links\` ADD \`platform\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`recruitment\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`recruitment\` ADD PRIMARY KEY (\`candidate_id\`, \`request_id\`)`);
        await queryRunner.query(`ALTER TABLE \`recruitment\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`recruitment\` ADD PRIMARY KEY (\`recruiter_id\`, \`candidate_id\`, \`request_id\`)`);
        await queryRunner.query(`ALTER TABLE \`recruitment\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`recruitment\` ADD PRIMARY KEY (\`recruiter_id\`, \`candidate_id\`)`);
        await queryRunner.query(`ALTER TABLE \`recruitment\` CHANGE \`request_id\` \`request_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`recruitment\` ADD CONSTRAINT \`FK_92c0261b96a9e22a9490bb92e6d\` FOREIGN KEY (\`candidate_id\`) REFERENCES \`candidates\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recruitment\` ADD CONSTRAINT \`FK_6f68e87931e0f5e9b4c87b8061a\` FOREIGN KEY (\`recruiter_id\`) REFERENCES \`recruiters\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recruitment\` ADD CONSTRAINT \`FK_e6bd29a7e58a143fa1969ad6080\` FOREIGN KEY (\`request_id\`) REFERENCES \`requests\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_209384ea01bce5b6256fa544ff\` ON \`work_experiences\` (\`candidate_id\`)`);
    }

}
