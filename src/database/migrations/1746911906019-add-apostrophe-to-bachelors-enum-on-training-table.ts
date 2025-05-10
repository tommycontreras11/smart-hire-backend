import { MigrationInterface, QueryRunner } from "typeorm";

export class AddApostropheToBachelorsEnumOnTrainingTable1746911906019 implements MigrationInterface {
    name = 'AddApostropheToBachelorsEnumOnTrainingTable1746911906019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`training\` CHANGE \`level\` \`level\` enum ('BACHELOR’S DEGREE', 'POSTGRADUATE', 'MASTER’S DEGREE', 'DOCTORATE', 'TECHNICAL', 'MANAGEMENT') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`training\` CHANGE \`level\` \`level\` enum ('BACHELOR''''S DEGREE', 'POSTGRADUATE', 'MASTER’S DEGREE', 'DOCTORATE', 'TECHNICAL', 'MANAGEMENT') NOT NULL`);
    }

}
