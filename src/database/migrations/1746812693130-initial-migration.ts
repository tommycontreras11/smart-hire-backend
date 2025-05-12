import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1746812693130 implements MigrationInterface {
    name = 'InitialMigration1746812693130'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`state\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`evaluation_methods\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`work_experiences\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`company\` varchar(255) NOT NULL, \`date_from\` date NOT NULL, \`date_to\` date NOT NULL, \`salary\` float(10,2) NOT NULL, \`position_id\` int NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`position_types\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`competencies\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`category_id\` int NOT NULL, \`evaluation_method_id\` int NOT NULL, \`level\` enum ('BEGINNER', 'INTERMEDIATE', 'ADVANCED') NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`departments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employees\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`identification\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`monthly_salary\` float(10,2) NOT NULL, \`entry_date\` datetime NOT NULL, \`department_id\` int NOT NULL, \`job_position_id\` int NOT NULL, \`file_name\` varchar(255) NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', UNIQUE INDEX \`IDX_dc7c376d754e52717d602e2e20\` (\`identification\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`countries\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`languages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`job_positions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`minimum_salary\` float(10,2) NOT NULL, \`maximum_salary\` float(10,2) NOT NULL, \`risk_level\` enum ('LOW', 'MEDIUM', 'HIGH') NOT NULL, \`contract_type\` enum ('FULL_TIME', 'PART_TIME', 'CONTRACT') NOT NULL, \`country_id\` int NOT NULL, \`language_id\` int NOT NULL, \`recruiter_id\` int NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`recruiters\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`identification\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`file_name\` varchar(255) NOT NULL, \`institution_id\` int NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', UNIQUE INDEX \`IDX_6cbc29b38c27f1a5070dc0dfe6\` (\`identification\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`institutions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`training\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`level\` enum ('BACHELOR''S DEGREE', 'POSTGRADUATE', 'MASTER’S DEGREE', 'DOCTORATE', 'TECHNICAL', 'MANAGEMENT') NOT NULL, \`date_from\` date NOT NULL, \`date_to\` date NOT NULL, \`institution_id\` int NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`candidates\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`identification\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`desired_salary\` float(10,2) NOT NULL, \`desired_position_id\` int NOT NULL, \`department_id\` int NOT NULL, \`work_experience_id\` int NOT NULL, \`recommend_by\` varchar(255) NOT NULL, \`file_name\` varchar(255) NOT NULL, \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE', UNIQUE INDEX \`IDX_eff0dff5da961d3c178a09fb2c\` (\`identification\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`request_histories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`request_id\` int NOT NULL, \`status\` enum ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'INTERVIEW', 'EVALUATED', 'APPROVED', 'REJECTED', 'HIRED', 'CANCELLED') NOT NULL DEFAULT 'DRAFT', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`requests\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`status\` enum ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'INTERVIEW', 'EVALUATED', 'APPROVED', 'REJECTED', 'HIRED', 'CANCELLED') NOT NULL DEFAULT 'DRAFT', \`candidate_id\` int NOT NULL, \`job_position_id\` int NOT NULL, \`recruiter_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`competency_evaluation_methods\` (\`competency_id\` int NOT NULL, \`evaluation_method_id\` int NOT NULL, INDEX \`IDX_6b09aae3b26a90185c54641abd\` (\`competency_id\`), INDEX \`IDX_946b1669d50b05f44c54d0948d\` (\`evaluation_method_id\`), PRIMARY KEY (\`competency_id\`, \`evaluation_method_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`competency_position_types\` (\`competency_id\` int NOT NULL, \`position_type_id\` int NOT NULL, INDEX \`IDX_103fb73c35372491375e132ffa\` (\`competency_id\`), INDEX \`IDX_676060ba1d9812d5b64e6f7186\` (\`position_type_id\`), PRIMARY KEY (\`competency_id\`, \`position_type_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`candidate_competencies\` (\`candidate_id\` int NOT NULL, \`competency_id\` int NOT NULL, INDEX \`IDX_b9e19206b29d7d01d77d9c1f04\` (\`candidate_id\`), INDEX \`IDX_f5220ecd9c4801225eb12c882b\` (\`competency_id\`), PRIMARY KEY (\`candidate_id\`, \`competency_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`candidate_trainings\` (\`candidate_id\` int NOT NULL, \`training_id\` int NOT NULL, INDEX \`IDX_b50fe17fd1ab84b80e8e4476f2\` (\`candidate_id\`), INDEX \`IDX_1571554a93851636e1721c59ce\` (\`training_id\`), PRIMARY KEY (\`candidate_id\`, \`training_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` ADD CONSTRAINT \`FK_715e30a31702db2e6427d28ba82\` FOREIGN KEY (\`position_id\`) REFERENCES \`position_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`competencies\` ADD CONSTRAINT \`FK_4fec2f5a55136a396b2fecb1b19\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employees\` ADD CONSTRAINT \`FK_678a3540f843823784b0fe4a4f2\` FOREIGN KEY (\`department_id\`) REFERENCES \`departments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employees\` ADD CONSTRAINT \`FK_caf14aed7ed1a41280f9e903a10\` FOREIGN KEY (\`job_position_id\`) REFERENCES \`job_positions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`job_positions\` ADD CONSTRAINT \`FK_b94d352c1880c44810101db06d8\` FOREIGN KEY (\`country_id\`) REFERENCES \`countries\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`job_positions\` ADD CONSTRAINT \`FK_73183ee8b78652e4f15fa1177b3\` FOREIGN KEY (\`language_id\`) REFERENCES \`languages\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`job_positions\` ADD CONSTRAINT \`FK_2b140c943ab213f5ed2d151b331\` FOREIGN KEY (\`recruiter_id\`) REFERENCES \`recruiters\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recruiters\` ADD CONSTRAINT \`FK_2459df42f9f51caf01e4f5a125a\` FOREIGN KEY (\`institution_id\`) REFERENCES \`institutions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`training\` ADD CONSTRAINT \`FK_ebc6bd145947f6d300e13fc8bf6\` FOREIGN KEY (\`institution_id\`) REFERENCES \`institutions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`candidates\` ADD CONSTRAINT \`FK_58dae0a7ca49a873c4ff1b078d3\` FOREIGN KEY (\`desired_position_id\`) REFERENCES \`position_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`candidates\` ADD CONSTRAINT \`FK_450145723ed4e51e23189833d52\` FOREIGN KEY (\`department_id\`) REFERENCES \`departments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`candidates\` ADD CONSTRAINT \`FK_ca9d1dd52fad326557f48fd151c\` FOREIGN KEY (\`work_experience_id\`) REFERENCES \`work_experiences\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`request_histories\` ADD CONSTRAINT \`FK_c617f2d1cd8c35b7537e45ad7f0\` FOREIGN KEY (\`request_id\`) REFERENCES \`requests\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`requests\` ADD CONSTRAINT \`FK_3fca5014e984a52f1c8172ffa61\` FOREIGN KEY (\`job_position_id\`) REFERENCES \`job_positions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`requests\` ADD CONSTRAINT \`FK_e502ecf396e01791e3a35509309\` FOREIGN KEY (\`candidate_id\`) REFERENCES \`candidates\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`requests\` ADD CONSTRAINT \`FK_1b5b69b725c7f9a999914057ee5\` FOREIGN KEY (\`recruiter_id\`) REFERENCES \`recruiters\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`competency_evaluation_methods\` ADD CONSTRAINT \`FK_6b09aae3b26a90185c54641abda\` FOREIGN KEY (\`competency_id\`) REFERENCES \`competencies\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`competency_evaluation_methods\` ADD CONSTRAINT \`FK_946b1669d50b05f44c54d0948d9\` FOREIGN KEY (\`evaluation_method_id\`) REFERENCES \`evaluation_methods\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`competency_position_types\` ADD CONSTRAINT \`FK_103fb73c35372491375e132ffaf\` FOREIGN KEY (\`competency_id\`) REFERENCES \`competencies\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`competency_position_types\` ADD CONSTRAINT \`FK_676060ba1d9812d5b64e6f71864\` FOREIGN KEY (\`position_type_id\`) REFERENCES \`position_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`candidate_competencies\` ADD CONSTRAINT \`FK_b9e19206b29d7d01d77d9c1f04b\` FOREIGN KEY (\`candidate_id\`) REFERENCES \`candidates\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`candidate_competencies\` ADD CONSTRAINT \`FK_f5220ecd9c4801225eb12c882bf\` FOREIGN KEY (\`competency_id\`) REFERENCES \`competencies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`candidate_trainings\` ADD CONSTRAINT \`FK_b50fe17fd1ab84b80e8e4476f29\` FOREIGN KEY (\`candidate_id\`) REFERENCES \`candidates\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`candidate_trainings\` ADD CONSTRAINT \`FK_1571554a93851636e1721c59ce4\` FOREIGN KEY (\`training_id\`) REFERENCES \`training\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`candidate_trainings\` DROP FOREIGN KEY \`FK_1571554a93851636e1721c59ce4\``);
        await queryRunner.query(`ALTER TABLE \`candidate_trainings\` DROP FOREIGN KEY \`FK_b50fe17fd1ab84b80e8e4476f29\``);
        await queryRunner.query(`ALTER TABLE \`candidate_competencies\` DROP FOREIGN KEY \`FK_f5220ecd9c4801225eb12c882bf\``);
        await queryRunner.query(`ALTER TABLE \`candidate_competencies\` DROP FOREIGN KEY \`FK_b9e19206b29d7d01d77d9c1f04b\``);
        await queryRunner.query(`ALTER TABLE \`competency_position_types\` DROP FOREIGN KEY \`FK_676060ba1d9812d5b64e6f71864\``);
        await queryRunner.query(`ALTER TABLE \`competency_position_types\` DROP FOREIGN KEY \`FK_103fb73c35372491375e132ffaf\``);
        await queryRunner.query(`ALTER TABLE \`competency_evaluation_methods\` DROP FOREIGN KEY \`FK_946b1669d50b05f44c54d0948d9\``);
        await queryRunner.query(`ALTER TABLE \`competency_evaluation_methods\` DROP FOREIGN KEY \`FK_6b09aae3b26a90185c54641abda\``);
        await queryRunner.query(`ALTER TABLE \`requests\` DROP FOREIGN KEY \`FK_1b5b69b725c7f9a999914057ee5\``);
        await queryRunner.query(`ALTER TABLE \`requests\` DROP FOREIGN KEY \`FK_e502ecf396e01791e3a35509309\``);
        await queryRunner.query(`ALTER TABLE \`requests\` DROP FOREIGN KEY \`FK_3fca5014e984a52f1c8172ffa61\``);
        await queryRunner.query(`ALTER TABLE \`request_histories\` DROP FOREIGN KEY \`FK_c617f2d1cd8c35b7537e45ad7f0\``);
        await queryRunner.query(`ALTER TABLE \`candidates\` DROP FOREIGN KEY \`FK_ca9d1dd52fad326557f48fd151c\``);
        await queryRunner.query(`ALTER TABLE \`candidates\` DROP FOREIGN KEY \`FK_450145723ed4e51e23189833d52\``);
        await queryRunner.query(`ALTER TABLE \`candidates\` DROP FOREIGN KEY \`FK_58dae0a7ca49a873c4ff1b078d3\``);
        await queryRunner.query(`ALTER TABLE \`training\` DROP FOREIGN KEY \`FK_ebc6bd145947f6d300e13fc8bf6\``);
        await queryRunner.query(`ALTER TABLE \`recruiters\` DROP FOREIGN KEY \`FK_2459df42f9f51caf01e4f5a125a\``);
        await queryRunner.query(`ALTER TABLE \`job_positions\` DROP FOREIGN KEY \`FK_2b140c943ab213f5ed2d151b331\``);
        await queryRunner.query(`ALTER TABLE \`job_positions\` DROP FOREIGN KEY \`FK_73183ee8b78652e4f15fa1177b3\``);
        await queryRunner.query(`ALTER TABLE \`job_positions\` DROP FOREIGN KEY \`FK_b94d352c1880c44810101db06d8\``);
        await queryRunner.query(`ALTER TABLE \`employees\` DROP FOREIGN KEY \`FK_caf14aed7ed1a41280f9e903a10\``);
        await queryRunner.query(`ALTER TABLE \`employees\` DROP FOREIGN KEY \`FK_678a3540f843823784b0fe4a4f2\``);
        await queryRunner.query(`ALTER TABLE \`competencies\` DROP FOREIGN KEY \`FK_4fec2f5a55136a396b2fecb1b19\``);
        await queryRunner.query(`ALTER TABLE \`work_experiences\` DROP FOREIGN KEY \`FK_715e30a31702db2e6427d28ba82\``);
        await queryRunner.query(`DROP INDEX \`IDX_1571554a93851636e1721c59ce\` ON \`candidate_trainings\``);
        await queryRunner.query(`DROP INDEX \`IDX_b50fe17fd1ab84b80e8e4476f2\` ON \`candidate_trainings\``);
        await queryRunner.query(`DROP TABLE \`candidate_trainings\``);
        await queryRunner.query(`DROP INDEX \`IDX_f5220ecd9c4801225eb12c882b\` ON \`candidate_competencies\``);
        await queryRunner.query(`DROP INDEX \`IDX_b9e19206b29d7d01d77d9c1f04\` ON \`candidate_competencies\``);
        await queryRunner.query(`DROP TABLE \`candidate_competencies\``);
        await queryRunner.query(`DROP INDEX \`IDX_676060ba1d9812d5b64e6f7186\` ON \`competency_position_types\``);
        await queryRunner.query(`DROP INDEX \`IDX_103fb73c35372491375e132ffa\` ON \`competency_position_types\``);
        await queryRunner.query(`DROP TABLE \`competency_position_types\``);
        await queryRunner.query(`DROP INDEX \`IDX_946b1669d50b05f44c54d0948d\` ON \`competency_evaluation_methods\``);
        await queryRunner.query(`DROP INDEX \`IDX_6b09aae3b26a90185c54641abd\` ON \`competency_evaluation_methods\``);
        await queryRunner.query(`DROP TABLE \`competency_evaluation_methods\``);
        await queryRunner.query(`DROP TABLE \`requests\``);
        await queryRunner.query(`DROP TABLE \`request_histories\``);
        await queryRunner.query(`DROP INDEX \`IDX_eff0dff5da961d3c178a09fb2c\` ON \`candidates\``);
        await queryRunner.query(`DROP TABLE \`candidates\``);
        await queryRunner.query(`DROP TABLE \`training\``);
        await queryRunner.query(`DROP TABLE \`institutions\``);
        await queryRunner.query(`DROP INDEX \`IDX_6cbc29b38c27f1a5070dc0dfe6\` ON \`recruiters\``);
        await queryRunner.query(`DROP TABLE \`recruiters\``);
        await queryRunner.query(`DROP TABLE \`job_positions\``);
        await queryRunner.query(`DROP TABLE \`languages\``);
        await queryRunner.query(`DROP TABLE \`countries\``);
        await queryRunner.query(`DROP INDEX \`IDX_dc7c376d754e52717d602e2e20\` ON \`employees\``);
        await queryRunner.query(`DROP TABLE \`employees\``);
        await queryRunner.query(`DROP TABLE \`departments\``);
        await queryRunner.query(`DROP TABLE \`competencies\``);
        await queryRunner.query(`DROP TABLE \`position_types\``);
        await queryRunner.query(`DROP TABLE \`work_experiences\``);
        await queryRunner.query(`DROP TABLE \`evaluation_methods\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
    }

}
