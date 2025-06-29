import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeSocialLinkNameTable1751224718212 implements MigrationInterface {
    name = 'ChangeSocialLinkNameTable1751224718212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`social_links\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`url\` varchar(255) NOT NULL, \`platform\` varchar(255) NOT NULL, \`candidate_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`educations\` CHANGE \`grade\` \`grade\` float(5,2) NULL`);
        await queryRunner.query(`ALTER TABLE \`social_links\` ADD CONSTRAINT \`FK_4e9b3261a54764dfc4bba381b0d\` FOREIGN KEY (\`candidate_id\`) REFERENCES \`candidates\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`social_links\` DROP FOREIGN KEY \`FK_4e9b3261a54764dfc4bba381b0d\``);
        await queryRunner.query(`ALTER TABLE \`educations\` CHANGE \`grade\` \`grade\` float(10,2) NULL`);
        await queryRunner.query(`DROP TABLE \`social_links\``);
    }

}
