import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCandidateRelatedTables1751048433600 implements MigrationInterface {
    name = 'AddCandidateRelatedTables1751048433600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`candidate_social_links\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`url\` varchar(255) NOT NULL, \`platform\` varchar(255) NOT NULL, \`candidate_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`certifications\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`expedition_date\` date NULL, \`expiration_date\` date NULL, \`credential_id\` varchar(255) NULL, \`credential_link\` varchar(255) NULL, \`candidate_id\` int NOT NULL, \`institution_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`academic_disciplines\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`educations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`title\` varchar(255) NULL, \`grade\` int NULL, \`description\` varchar(1000) NULL, \`start_date\` date NULL, \`end_date\` date NULL, \`candidate_id\` int NOT NULL, \`institution_id\` int NOT NULL, \`academic_discipline_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`certification_competencies\` (\`certification_id\` int NOT NULL, \`competency_id\` int NOT NULL, INDEX \`IDX_b69e615ff4430ad4bb8944b039\` (\`certification_id\`), INDEX \`IDX_90077c76841680315801b82c19\` (\`competency_id\`), PRIMARY KEY (\`certification_id\`, \`competency_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`education_competencies\` (\`education_id\` int NOT NULL, \`competency_id\` int NOT NULL, INDEX \`IDX_905f88b91a0d67a8ebcddab6d0\` (\`education_id\`), INDEX \`IDX_40f4d1389001d9c529a958f3e6\` (\`competency_id\`), PRIMARY KEY (\`education_id\`, \`competency_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`candidates\` ADD \`bio\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`candidates\` ADD \`location\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`candidates\` ADD \`phone\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`candidate_social_links\` ADD CONSTRAINT \`FK_7fffa1a31167a30ea24dc0dd2d2\` FOREIGN KEY (\`candidate_id\`) REFERENCES \`candidates\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`certifications\` ADD CONSTRAINT \`FK_887e7737728c67ca79b79625ab2\` FOREIGN KEY (\`candidate_id\`) REFERENCES \`candidates\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`certifications\` ADD CONSTRAINT \`FK_e11d5b41a211a937f74d37e003d\` FOREIGN KEY (\`institution_id\`) REFERENCES \`institutions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`educations\` ADD CONSTRAINT \`FK_7be3038b94f0416ead817dfcd47\` FOREIGN KEY (\`candidate_id\`) REFERENCES \`candidates\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`educations\` ADD CONSTRAINT \`FK_2ef9cd3a176166eda693fe83f5a\` FOREIGN KEY (\`institution_id\`) REFERENCES \`institutions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`educations\` ADD CONSTRAINT \`FK_9dbe5a7670a37f2bccc6b17de78\` FOREIGN KEY (\`academic_discipline_id\`) REFERENCES \`academic_disciplines\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`certification_competencies\` ADD CONSTRAINT \`FK_b69e615ff4430ad4bb8944b039a\` FOREIGN KEY (\`certification_id\`) REFERENCES \`certifications\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`certification_competencies\` ADD CONSTRAINT \`FK_90077c76841680315801b82c190\` FOREIGN KEY (\`competency_id\`) REFERENCES \`competencies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`education_competencies\` ADD CONSTRAINT \`FK_905f88b91a0d67a8ebcddab6d09\` FOREIGN KEY (\`education_id\`) REFERENCES \`educations\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`education_competencies\` ADD CONSTRAINT \`FK_40f4d1389001d9c529a958f3e67\` FOREIGN KEY (\`competency_id\`) REFERENCES \`competencies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`education_competencies\` DROP FOREIGN KEY \`FK_40f4d1389001d9c529a958f3e67\``);
        await queryRunner.query(`ALTER TABLE \`education_competencies\` DROP FOREIGN KEY \`FK_905f88b91a0d67a8ebcddab6d09\``);
        await queryRunner.query(`ALTER TABLE \`certification_competencies\` DROP FOREIGN KEY \`FK_90077c76841680315801b82c190\``);
        await queryRunner.query(`ALTER TABLE \`certification_competencies\` DROP FOREIGN KEY \`FK_b69e615ff4430ad4bb8944b039a\``);
        await queryRunner.query(`ALTER TABLE \`educations\` DROP FOREIGN KEY \`FK_9dbe5a7670a37f2bccc6b17de78\``);
        await queryRunner.query(`ALTER TABLE \`educations\` DROP FOREIGN KEY \`FK_2ef9cd3a176166eda693fe83f5a\``);
        await queryRunner.query(`ALTER TABLE \`educations\` DROP FOREIGN KEY \`FK_7be3038b94f0416ead817dfcd47\``);
        await queryRunner.query(`ALTER TABLE \`certifications\` DROP FOREIGN KEY \`FK_e11d5b41a211a937f74d37e003d\``);
        await queryRunner.query(`ALTER TABLE \`certifications\` DROP FOREIGN KEY \`FK_887e7737728c67ca79b79625ab2\``);
        await queryRunner.query(`ALTER TABLE \`candidate_social_links\` DROP FOREIGN KEY \`FK_7fffa1a31167a30ea24dc0dd2d2\``);
        await queryRunner.query(`ALTER TABLE \`candidates\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`candidates\` DROP COLUMN \`location\``);
        await queryRunner.query(`ALTER TABLE \`candidates\` DROP COLUMN \`bio\``);
        await queryRunner.query(`DROP INDEX \`IDX_40f4d1389001d9c529a958f3e6\` ON \`education_competencies\``);
        await queryRunner.query(`DROP INDEX \`IDX_905f88b91a0d67a8ebcddab6d0\` ON \`education_competencies\``);
        await queryRunner.query(`DROP TABLE \`education_competencies\``);
        await queryRunner.query(`DROP INDEX \`IDX_90077c76841680315801b82c19\` ON \`certification_competencies\``);
        await queryRunner.query(`DROP INDEX \`IDX_b69e615ff4430ad4bb8944b039\` ON \`certification_competencies\``);
        await queryRunner.query(`DROP TABLE \`certification_competencies\``);
        await queryRunner.query(`DROP TABLE \`educations\``);
        await queryRunner.query(`DROP TABLE \`academic_disciplines\``);
        await queryRunner.query(`DROP TABLE \`certifications\``);
        await queryRunner.query(`DROP TABLE \`candidate_social_links\``);
    }

}
