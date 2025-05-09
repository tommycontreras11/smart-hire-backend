import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeStatePropertyToStatusOnCategoryTable1746826272334 implements MigrationInterface {
    name = 'ChangeStatePropertyToStatusOnCategoryTable1746826272334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`state\` \`status\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE'`);
        await queryRunner.query(`ALTER TABLE \`training\` CHANGE \`level\` \`level\` enum ('BACHELOR''S DEGREE', 'POSTGRADUATE', 'MASTER’S DEGREE', 'DOCTORATE', 'TECHNICAL', 'MANAGEMENT') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`training\` CHANGE \`level\` \`level\` enum ('BACHELOR''''S DEGREE', 'POSTGRADUATE', 'MASTER’S DEGREE', 'DOCTORATE', 'TECHNICAL', 'MANAGEMENT') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`status\` \`state\` enum ('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE'`);
    }

}
